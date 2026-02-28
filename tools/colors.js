/* ============================================
   Tool: Color Palette Generator
   ============================================ */

function renderColorsTool(container) {
    container.innerHTML = `
        <div class="tool-group">
            <label class="tool-label">${t('colors.base')}</label>
            <div style="display: flex; align-items: center; gap: 12px;">
                <input type="color" id="color-base" value="#6366f1" style="width: 50px; height: 40px; border: none; cursor: pointer; border-radius: 8px;">
                <input type="text" class="tool-input" id="color-hex" value="#6366f1" style="max-width: 140px; font-family: var(--font-mono);">
            </div>
        </div>

        <div class="tool-tabs" style="margin-top: 16px;">
            <button class="tool-tab active" onclick="setColorMode('analogous')" id="tab-analogous">${t('colors.analog')}</button>
            <button class="tool-tab" onclick="setColorMode('complementary')" id="tab-complementary">${t('colors.complementary')}</button>
            <button class="tool-tab" onclick="setColorMode('triadic')" id="tab-triadic">${t('colors.triadic')}</button>
            <button class="tool-tab" onclick="setColorMode('split')" id="tab-split">${t('colors.split')}</button>
            <button class="tool-tab" onclick="setColorMode('mono')" id="tab-mono">${t('colors.mono')}</button>
            <button class="tool-tab" onclick="setColorMode('random')" id="tab-random">${t('colors.random')}</button>
        </div>

        <div id="color-palette" style="margin-top: 20px;"></div>
        <div id="color-details" style="margin-top: 16px;"></div>

        <div class="tool-actions" style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="generatePalette()" id="btn-new-palette">
                <i data-lucide="palette"></i> ${t('colors.newPalette')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="exportCSS()" id="btn-export-css">
                <i data-lucide="download"></i> ${t('colors.exportCSS')}
            </button>
        </div>
    `;

    // Sync color picker with hex input
    document.getElementById('color-base').addEventListener('input', (e) => {
        document.getElementById('color-hex').value = e.target.value;
        generatePalette();
    });

    document.getElementById('color-hex').addEventListener('input', (e) => {
        if (/^#[0-9a-f]{6}$/i.test(e.target.value)) {
            document.getElementById('color-base').value = e.target.value;
            generatePalette();
        }
    });

    window._colorMode = 'analogous';
    generatePalette();
}

function setColorMode(mode) {
    window._colorMode = mode;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + mode)?.classList.add('active');
    generatePalette();
}

function generatePalette() {
    const base = document.getElementById('color-base').value;
    const mode = window._colorMode || 'analogous';
    const hsl = hexToHSL(base);
    let colors = [];

    switch (mode) {
        case 'analogous':
            colors = [-30, -15, 0, 15, 30].map(offset => hslToHex((hsl.h + offset + 360) % 360, hsl.s, hsl.l));
            break;
        case 'complementary':
            colors = [0, 30, 180, 210, 150].map(offset => hslToHex((hsl.h + offset) % 360, hsl.s, hsl.l));
            break;
        case 'triadic':
            colors = [0, 120, 240, 60, 300].map(offset => hslToHex((hsl.h + offset) % 360, hsl.s, hsl.l));
            break;
        case 'split':
            colors = [0, 150, 210, 30, 330].map(offset => hslToHex((hsl.h + offset) % 360, hsl.s, hsl.l));
            break;
        case 'mono':
            colors = [-20, -10, 0, 10, 20].map(offset => hslToHex(hsl.h, hsl.s, Math.max(10, Math.min(90, hsl.l + offset))));
            break;
        case 'random':
            colors = Array.from({ length: 5 }, () => hslToHex(Math.random() * 360, 50 + Math.random() * 40, 40 + Math.random() * 30));
            break;
    }

    window._currentPalette = colors;

    // Render palette preview
    const paletteDiv = document.getElementById('color-palette');
    paletteDiv.innerHTML = `
        <div style="display: flex; border-radius: 12px; overflow: hidden; height: 160px; border: 1px solid var(--border-color);">
            ${colors.map(c => `
                <div style="flex: 1; background: ${c}; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 12px; cursor: pointer;" onclick="copyToClipboard('${c}')">
                    <span style="background: rgba(0,0,0,0.5); color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-family: var(--font-mono);">${c}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Render color details
    const detailsDiv = document.getElementById('color-details');
    detailsDiv.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${colors.map(c => {
        const rgb = hexToRGB(c);
        return `
                    <div class="tool-output" style="flex: 1; min-width: 140px; cursor: pointer;" onclick="copyToClipboard('${c}')">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background: ${c}; border: 1px solid var(--border-color);"></div>
                            <div>
                                <div style="font-size: 13px; font-weight: 600;">${c}</div>
                                <div style="font-size: 11px; color: var(--text-muted);">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

function exportCSS() {
    if (!window._currentPalette) return;
    const css = `:root {\n${window._currentPalette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    copyToClipboard(css);
    showToast(t('css.copied'));
}

// Color utility functions
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
        h *= 360;
    }

    return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRGB(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}
