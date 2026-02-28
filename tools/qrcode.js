/* ============================================
   Tool: QR Code Generator
   Uses qrcode-generator library (loaded via CDN)
   ============================================ */

function renderQRCodeTool(container) {
    container.innerHTML = `
        <div class="tool-group">
            <label class="tool-label">${t('qr.input')}</label>
            <textarea class="tool-textarea" id="qr-input" rows="3" placeholder="${t('qr.placeholder')}" oninput="generateQR()">https://toolbox-digital.vercel.app</textarea>
        </div>

        <div class="tool-row" style="margin-top: 16px;">
            <div class="tool-col">
                <div class="tool-group">
                    <label class="tool-label">${t('qr.size')}: <span id="qr-size-val">256</span>px</label>
                    <input type="range" class="tool-range" id="qr-size" min="128" max="512" step="32" value="256" oninput="document.getElementById('qr-size-val').textContent = this.value; generateQR();">
                </div>
            </div>
        </div>

        <div class="tool-row" style="margin-top: 12px;">
            <div class="tool-col">
                <div class="tool-group">
                    <label class="tool-label">${t('qr.fgColor')}</label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="color" id="qr-fg-color" value="#000000" onchange="generateQR()" style="width: 40px; height: 36px; border: none; cursor: pointer; border-radius: 6px;">
                        <input type="text" class="tool-input" id="qr-fg-hex" value="#000000" style="max-width: 110px; font-family: var(--font-mono); font-size: 13px;" oninput="syncQRColor('fg')">
                    </div>
                </div>
            </div>
            <div class="tool-col">
                <div class="tool-group">
                    <label class="tool-label">${t('qr.bgColor')}</label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="color" id="qr-bg-color" value="#ffffff" onchange="generateQR()" style="width: 40px; height: 36px; border: none; cursor: pointer; border-radius: 6px;">
                        <input type="text" class="tool-input" id="qr-bg-hex" value="#ffffff" style="max-width: 110px; font-family: var(--font-mono); font-size: 13px;" oninput="syncQRColor('bg')">
                    </div>
                </div>
            </div>
        </div>

        <div class="tool-group" style="margin-top: 12px;">
            <label class="tool-label">${t('qr.errorLevel')}</label>
            <select class="tool-select" id="qr-error" onchange="generateQR()" style="max-width: 200px;">
                <option value="L">Low (7%)</option>
                <option value="M" selected>Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
            </select>
        </div>

        <div class="tool-divider"></div>

        <div class="tool-group">
            <label class="tool-label">${t('qr.preview')}</label>
            <div style="display: flex; justify-content: center; padding: 24px; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <canvas id="qr-canvas" style="image-rendering: pixelated;"></canvas>
            </div>
        </div>

        <div class="tool-actions" style="margin-top: 16px;">
            <button class="btn btn-primary" onclick="downloadQR()">
                <i data-lucide="download"></i> ${t('qr.download')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="copyQRToClipboard()">
                <i data-lucide="copy"></i> ${t('qr.copy')}
            </button>
        </div>
    `;

    // Sync color pickers
    document.getElementById('qr-fg-color').addEventListener('input', (e) => {
        document.getElementById('qr-fg-hex').value = e.target.value;
    });
    document.getElementById('qr-bg-color').addEventListener('input', (e) => {
        document.getElementById('qr-bg-hex').value = e.target.value;
    });

    generateQR();
}

function syncQRColor(type) {
    const hex = document.getElementById(`qr-${type}-hex`).value;
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
        document.getElementById(`qr-${type}-color`).value = hex;
        generateQR();
    }
}

function generateQR() {
    const text = document.getElementById('qr-input').value;
    if (!text.trim()) return;

    const size = parseInt(document.getElementById('qr-size').value);
    const fgColor = document.getElementById('qr-fg-color').value;
    const bgColor = document.getElementById('qr-bg-color').value;
    const errorLevel = document.getElementById('qr-error').value;

    // Error correction level mapping
    const ecl = { 'L': 1, 'M': 0, 'Q': 3, 'H': 2 };

    try {
        const qr = qrcode(0, errorLevel);
        qr.addData(text);
        qr.make();

        const canvas = document.getElementById('qr-canvas');
        const ctx = canvas.getContext('2d');
        const moduleCount = qr.getModuleCount();
        const cellSize = Math.floor(size / moduleCount);
        const actualSize = cellSize * moduleCount;

        canvas.width = actualSize;
        canvas.height = actualSize;

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, actualSize, actualSize);

        // Draw QR modules
        ctx.fillStyle = fgColor;
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
    } catch (e) {
        // Text too long or other error
        const canvas = document.getElementById('qr-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#ef4444';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t('qr.error'), size / 2, size / 2);
    }
}

function downloadQR() {
    const canvas = document.getElementById('qr-canvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(t('qr.downloaded'));
}

function copyQRToClipboard() {
    const canvas = document.getElementById('qr-canvas');
    canvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
            showToast(t('copy.success'));
        }).catch(() => {
            showToast('Clipboard not supported');
        });
    });
}
