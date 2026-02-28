/* ============================================
   Tool: Password Generator
   ============================================ */

function renderPasswordTool(container) {
    container.innerHTML = `
        <div class="tool-group">
            <label class="tool-label">${t('pw.length')}: <span id="pw-length-val">16</span></label>
            <input type="range" class="tool-range" id="pw-length" min="4" max="128" value="16">
        </div>
        
        <div class="tool-checkbox-group" style="margin-top: 16px;">
            <label class="tool-checkbox">
                <input type="checkbox" id="pw-upper" checked> ${t('pw.upper')}
            </label>
            <label class="tool-checkbox">
                <input type="checkbox" id="pw-lower" checked> ${t('pw.lower')}
            </label>
            <label class="tool-checkbox">
                <input type="checkbox" id="pw-numbers" checked> ${t('pw.numbers')}
            </label>
            <label class="tool-checkbox">
                <input type="checkbox" id="pw-symbols" checked> ${t('pw.symbols')}
            </label>
        </div>
        
        <div class="tool-divider"></div>
        
        <div class="tool-group">
            <label class="tool-label">${t('pw.generated')}</label>
            <div class="tool-output" id="pw-output">
                <span class="tool-output-text" id="pw-result">${t('pw.clickGenerate')}</span>
                <button class="btn-icon" onclick="copyToClipboard(document.getElementById('pw-result').textContent)" title="${t('text.copy')}">
                    <i data-lucide="copy"></i>
                </button>
            </div>
            <div class="strength-meter">
                <div class="strength-fill" id="pw-strength-bar" style="width: 0%; background: var(--text-muted);"></div>
            </div>
            <span class="strength-label" id="pw-strength-label" style="color: var(--text-muted);">${t('pw.noPassword')}</span>
        </div>
        
        <div class="tool-actions">
            <button class="btn btn-primary" onclick="generatePassword()" id="btn-generate-password">
                <i data-lucide="refresh-cw"></i> ${t('pw.generate')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="generateMultiplePasswords()" id="btn-generate-multiple">
                <i data-lucide="list"></i> ${t('pw.multiple')}
            </button>
        </div>
        
        <div id="pw-multiple" style="margin-top: 16px;"></div>
    `;

    // Live update length display
    document.getElementById('pw-length').addEventListener('input', (e) => {
        document.getElementById('pw-length-val').textContent = e.target.value;
    });

    // Auto-generate on load
    generatePassword();
}

function generatePassword() {
    const length = parseInt(document.getElementById('pw-length').value);
    const useUpper = document.getElementById('pw-upper').checked;
    const useLower = document.getElementById('pw-lower').checked;
    const useNumbers = document.getElementById('pw-numbers').checked;
    const useSymbols = document.getElementById('pw-symbols').checked;

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) {
        document.getElementById('pw-result').textContent = t('pw.selectOption');
        return;
    }

    // Use crypto API for better randomness
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
    }

    document.getElementById('pw-result').textContent = password;
    updateStrengthMeter(password, useUpper, useLower, useNumbers, useSymbols);
}

function generateMultiplePasswords() {
    const container = document.getElementById('pw-multiple');
    const length = parseInt(document.getElementById('pw-length').value);
    const useUpper = document.getElementById('pw-upper').checked;
    const useLower = document.getElementById('pw-lower').checked;
    const useNumbers = document.getElementById('pw-numbers').checked;
    const useSymbols = document.getElementById('pw-symbols').checked;

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) return;

    let html = '';
    for (let i = 0; i < 5; i++) {
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        let pw = '';
        for (let j = 0; j < length; j++) {
            pw += chars[array[j] % chars.length];
        }
        html += `
            <div class="tool-output" style="margin-bottom: 8px; font-size: 13px;">
                <span class="tool-output-text">${pw}</span>
                <button class="btn-icon" onclick="copyToClipboard('${pw}')" title="${t('text.copy')}" style="width: 32px; height: 32px;">
                    <i data-lucide="copy"></i>
                </button>
            </div>
        `;
    }

    container.innerHTML = html;
    lucide.createIcons();
}

function updateStrengthMeter(password, upper, lower, numbers, symbols) {
    let score = 0;

    // Length contribution
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 24) score += 1;

    // Variety contribution
    if (upper) score += 1;
    if (lower) score += 1;
    if (numbers) score += 1;
    if (symbols) score += 1;

    const bar = document.getElementById('pw-strength-bar');
    const label = document.getElementById('pw-strength-label');

    const percentage = Math.min(100, (score / 8) * 100);
    bar.style.width = percentage + '%';

    if (score <= 2) {
        bar.style.background = '#ef4444';
        label.textContent = t('pw.weak');
        label.style.color = '#ef4444';
    } else if (score <= 4) {
        bar.style.background = '#f59e0b';
        label.textContent = t('pw.medium');
        label.style.color = '#f59e0b';
    } else if (score <= 6) {
        bar.style.background = '#22c55e';
        label.textContent = t('pw.strong');
        label.style.color = '#22c55e';
    } else {
        bar.style.background = 'var(--accent-gradient)';
        label.textContent = t('pw.veryStrong');
        label.style.color = '#8b5cf6';
    }
}
