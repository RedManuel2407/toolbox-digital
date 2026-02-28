/* ============================================
   Tool: QR Code Generator (Enhanced)
   Features: Text/URL, WiFi, vCard, Email, Logo Overlay
   ============================================ */

function renderQRCodeTool(container) {
    container.innerHTML = `
        <div class="tool-tabs">
            <button class="tool-tab active" onclick="setQRTab('text')" id="qr-tab-text">🔗 ${t('qr.tab.text')}</button>
            <button class="tool-tab" onclick="setQRTab('wifi')" id="qr-tab-wifi">📶 ${t('qr.tab.wifi')}</button>
            <button class="tool-tab" onclick="setQRTab('vcard')" id="qr-tab-vcard">👤 ${t('qr.tab.vcard')}</button>
            <button class="tool-tab" onclick="setQRTab('email')" id="qr-tab-email">✉️ ${t('qr.tab.email')}</button>
        </div>

        <div id="qr-input-area" style="margin-top: 16px;"></div>

        <div class="tool-divider"></div>

        <div class="tool-row">
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

        <div class="tool-row" style="margin-top: 12px;">
            <div class="tool-col">
                <div class="tool-group">
                    <label class="tool-label">${t('qr.errorLevel')}</label>
                    <select class="tool-select" id="qr-error" onchange="generateQR()" style="max-width: 200px;">
                        <option value="L">Low (7%)</option>
                        <option value="M" selected>Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                    </select>
                </div>
            </div>
            <div class="tool-col">
                <div class="tool-group">
                    <label class="tool-label">${t('qr.logo')}</label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn btn-secondary btn-small" onclick="document.getElementById('qr-logo-input').click()">
                            <i data-lucide="image-plus"></i> ${t('qr.addLogo')}
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="removeLogo()" id="qr-remove-logo" style="display: none;">
                            <i data-lucide="x"></i> ${t('qr.removeLogo')}
                        </button>
                        <input type="file" id="qr-logo-input" accept="image/*" onchange="loadLogo(event)" style="display: none;">
                    </div>
                    <span id="qr-logo-name" style="font-size: 12px; color: var(--text-muted); margin-top: 4px;"></span>
                </div>
            </div>
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

    window._qrTab = 'text';
    window._qrLogo = null;
    renderQRInputArea();
}

// ============ TABS ============

function setQRTab(tab) {
    window._qrTab = tab;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('qr-tab-' + tab)?.classList.add('active');
    renderQRInputArea();
}

function renderQRInputArea() {
    const area = document.getElementById('qr-input-area');

    switch (window._qrTab) {
        case 'text':
            area.innerHTML = `
                <div class="tool-group">
                    <label class="tool-label">${t('qr.input')}</label>
                    <textarea class="tool-textarea" id="qr-text-input" rows="3" placeholder="${t('qr.placeholder')}" oninput="generateQR()">https://toolbox-digital.vercel.app</textarea>
                </div>
            `;
            break;

        case 'wifi':
            area.innerHTML = `
                <div class="tool-group">
                    <label class="tool-label">${t('qr.wifi.name')}</label>
                    <input type="text" class="tool-input" id="qr-wifi-ssid" placeholder="${t('qr.wifi.namePlaceholder')}" oninput="generateQR()">
                </div>
                <div class="tool-row" style="margin-top: 12px;">
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.wifi.password')}</label>
                            <input type="text" class="tool-input" id="qr-wifi-pass" placeholder="${t('qr.wifi.passPlaceholder')}" oninput="generateQR()">
                        </div>
                    </div>
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.wifi.encryption')}</label>
                            <select class="tool-select" id="qr-wifi-enc" onchange="generateQR()">
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">${t('qr.wifi.open')}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <label class="tool-checkbox" style="margin-top: 12px;">
                    <input type="checkbox" id="qr-wifi-hidden" onchange="generateQR()"> ${t('qr.wifi.hidden')}
                </label>
            `;
            break;

        case 'vcard':
            area.innerHTML = `
                <div class="tool-row">
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.vcard.firstname')}</label>
                            <input type="text" class="tool-input" id="qr-vcard-fn" placeholder="Max" oninput="generateQR()">
                        </div>
                    </div>
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.vcard.lastname')}</label>
                            <input type="text" class="tool-input" id="qr-vcard-ln" placeholder="Mustermann" oninput="generateQR()">
                        </div>
                    </div>
                </div>
                <div class="tool-row" style="margin-top: 12px;">
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.vcard.phone')}</label>
                            <input type="tel" class="tool-input" id="qr-vcard-tel" placeholder="+49 123 456789" oninput="generateQR()">
                        </div>
                    </div>
                    <div class="tool-col">
                        <div class="tool-group">
                            <label class="tool-label">${t('qr.vcard.email')}</label>
                            <input type="email" class="tool-input" id="qr-vcard-email" placeholder="max@example.com" oninput="generateQR()">
                        </div>
                    </div>
                </div>
                <div class="tool-group" style="margin-top: 12px;">
                    <label class="tool-label">${t('qr.vcard.org')}</label>
                    <input type="text" class="tool-input" id="qr-vcard-org" placeholder="${t('qr.vcard.orgPlaceholder')}" oninput="generateQR()">
                </div>
                <div class="tool-group" style="margin-top: 12px;">
                    <label class="tool-label">${t('qr.vcard.url')}</label>
                    <input type="url" class="tool-input" id="qr-vcard-url" placeholder="https://example.com" oninput="generateQR()">
                </div>
            `;
            break;

        case 'email':
            area.innerHTML = `
                <div class="tool-group">
                    <label class="tool-label">${t('qr.email.to')}</label>
                    <input type="email" class="tool-input" id="qr-email-to" placeholder="empfaenger@example.com" oninput="generateQR()">
                </div>
                <div class="tool-group" style="margin-top: 12px;">
                    <label class="tool-label">${t('qr.email.subject')}</label>
                    <input type="text" class="tool-input" id="qr-email-subject" placeholder="${t('qr.email.subjectPlaceholder')}" oninput="generateQR()">
                </div>
                <div class="tool-group" style="margin-top: 12px;">
                    <label class="tool-label">${t('qr.email.body')}</label>
                    <textarea class="tool-textarea" id="qr-email-body" rows="3" placeholder="${t('qr.email.bodyPlaceholder')}" oninput="generateQR()"></textarea>
                </div>
            `;
            break;
    }

    lucide.createIcons();
    generateQR();
}

// ============ QR DATA BUILDERS ============

function getQRData() {
    switch (window._qrTab) {
        case 'text':
            return document.getElementById('qr-text-input')?.value || '';

        case 'wifi': {
            const ssid = document.getElementById('qr-wifi-ssid')?.value || '';
            const pass = document.getElementById('qr-wifi-pass')?.value || '';
            const enc = document.getElementById('qr-wifi-enc')?.value || 'WPA';
            const hidden = document.getElementById('qr-wifi-hidden')?.checked ? 'true' : 'false';
            if (!ssid) return '';
            return `WIFI:T:${enc};S:${ssid};P:${pass};H:${hidden};;`;
        }

        case 'vcard': {
            const fn = document.getElementById('qr-vcard-fn')?.value || '';
            const ln = document.getElementById('qr-vcard-ln')?.value || '';
            const tel = document.getElementById('qr-vcard-tel')?.value || '';
            const email = document.getElementById('qr-vcard-email')?.value || '';
            const org = document.getElementById('qr-vcard-org')?.value || '';
            const url = document.getElementById('qr-vcard-url')?.value || '';
            if (!fn && !ln) return '';
            let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn};;;\nFN:${fn} ${ln}`;
            if (tel) vcard += `\nTEL:${tel}`;
            if (email) vcard += `\nEMAIL:${email}`;
            if (org) vcard += `\nORG:${org}`;
            if (url) vcard += `\nURL:${url}`;
            vcard += `\nEND:VCARD`;
            return vcard;
        }

        case 'email': {
            const to = document.getElementById('qr-email-to')?.value || '';
            const subject = document.getElementById('qr-email-subject')?.value || '';
            const body = document.getElementById('qr-email-body')?.value || '';
            if (!to) return '';
            return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }

        default:
            return '';
    }
}

// ============ LOGO ============

function loadLogo(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            window._qrLogo = img;
            document.getElementById('qr-logo-name').textContent = file.name;
            document.getElementById('qr-remove-logo').style.display = '';
            // Use high error correction when logo is added
            document.getElementById('qr-error').value = 'H';
            generateQR();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeLogo() {
    window._qrLogo = null;
    document.getElementById('qr-logo-input').value = '';
    document.getElementById('qr-logo-name').textContent = '';
    document.getElementById('qr-remove-logo').style.display = 'none';
    generateQR();
}

// ============ COLOR SYNC ============

function syncQRColor(type) {
    const hex = document.getElementById(`qr-${type}-hex`).value;
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
        document.getElementById(`qr-${type}-color`).value = hex;
        generateQR();
    }
}

// ============ QR GENERATION ============

function generateQR() {
    const text = getQRData();
    if (!text.trim()) {
        // Clear canvas
        const canvas = document.getElementById('qr-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = parseInt(document.getElementById('qr-size')?.value || 256);
        canvas.width = size;
        canvas.height = size;
        ctx.fillStyle = document.getElementById('qr-bg-color')?.value || '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#666';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t('qr.enterData'), size / 2, size / 2);
        return;
    }

    const size = parseInt(document.getElementById('qr-size').value);
    const fgColor = document.getElementById('qr-fg-color').value;
    const bgColor = document.getElementById('qr-bg-color').value;
    const errorLevel = document.getElementById('qr-error').value;

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

        // Draw logo overlay
        if (window._qrLogo) {
            const logoSize = actualSize * 0.22;
            const logoX = (actualSize - logoSize) / 2;
            const logoY = (actualSize - logoSize) / 2;
            const pad = 6;

            // White background behind logo
            ctx.fillStyle = bgColor;
            ctx.beginPath();
            ctx.roundRect(logoX - pad, logoY - pad, logoSize + pad * 2, logoSize + pad * 2, 8);
            ctx.fill();

            // Border
            ctx.strokeStyle = fgColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(logoX - pad, logoY - pad, logoSize + pad * 2, logoSize + pad * 2, 8);
            ctx.stroke();

            // Draw logo
            ctx.drawImage(window._qrLogo, logoX, logoY, logoSize, logoSize);
        }
    } catch (e) {
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

// ============ EXPORT ============

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
