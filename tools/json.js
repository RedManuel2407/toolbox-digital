/* ============================================
   Tool: JSON Formatter
   ============================================ */

function renderJsonTool(container) {
    container.innerHTML = `
        <div class="tool-tabs">
            <button class="btn btn-primary btn-small" onclick="formatJSON()" id="btn-format-json">
                <i data-lucide="code"></i> ${t('json.format')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="minifyJSON()">
                <i data-lucide="minimize-2"></i> ${t('json.minify')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="validateJSON()">
                <i data-lucide="check-circle"></i> ${t('json.validate')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="loadSampleJSON()">
                <i data-lucide="file-json"></i> ${t('json.sample')}
            </button>
            <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.getElementById('json-output').value)">
                <i data-lucide="copy"></i> ${t('json.copy')}
            </button>
        </div>

        <div class="tool-row" style="margin-top: 16px;">
            <div class="tool-col">
                <label class="tool-label">${t('json.input')}</label>
                <textarea class="tool-textarea" id="json-input" rows="12" placeholder='${t('json.inputPlaceholder')}' oninput="liveValidateJSON()"></textarea>
            </div>
            <div class="tool-col">
                <label class="tool-label">${t('json.output')}</label>
                <textarea class="tool-textarea" id="json-output" rows="12" placeholder="${t('json.outputPlaceholder')}" readonly></textarea>
            </div>
        </div>

        <div class="tool-group" style="margin-top: 16px;">
            <label class="tool-label">${t('json.stats')}</label>
            <div id="json-stats" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px;"></div>
        </div>

        <div id="json-validation" style="margin-top: 12px;"></div>
    `;
}

function formatJSON() {
    const input = document.getElementById('json-input').value;
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        document.getElementById('json-output').value = formatted;
        showJsonStats(parsed);
        showJsonValidation(true);
    } catch (e) {
        document.getElementById('json-output').value = '';
        showJsonValidation(false, e.message);
    }
}

function minifyJSON() {
    const input = document.getElementById('json-input').value;
    try {
        const parsed = JSON.parse(input);
        document.getElementById('json-output').value = JSON.stringify(parsed);
        showJsonValidation(true);
    } catch (e) {
        showJsonValidation(false, e.message);
    }
}

function validateJSON() {
    const input = document.getElementById('json-input').value;
    try {
        const parsed = JSON.parse(input);
        showJsonStats(parsed);
        showJsonValidation(true);
    } catch (e) {
        showJsonValidation(false, e.message);
    }
}

function liveValidateJSON() {
    const input = document.getElementById('json-input').value;
    if (!input.trim()) {
        document.getElementById('json-validation').innerHTML = '';
        return;
    }
    try {
        JSON.parse(input);
        showJsonValidation(true);
    } catch (e) {
        showJsonValidation(false, e.message);
    }
}

function showJsonValidation(valid, error) {
    const div = document.getElementById('json-validation');
    if (valid) {
        div.innerHTML = `<div class="tool-output" style="border-color: var(--success); background: rgba(34, 197, 94, 0.05);">
            <span style="color: var(--success); font-weight: 600;">${t('json.valid')}</span>
        </div>`;
    } else {
        div.innerHTML = `<div class="tool-output" style="border-color: var(--error); background: rgba(239, 68, 68, 0.05);">
            <span style="color: var(--error); font-weight: 600;">${t('json.invalid')}: ${error}</span>
        </div>`;
    }
}

function showJsonStats(data) {
    const stats = analyzeJSON(data);
    const div = document.getElementById('json-stats');
    div.innerHTML = `
        <div class="tool-output" style="flex-direction: column; text-align: center; padding: 12px;">
            <span style="font-size: 20px; font-weight: 800; color: var(--accent-1);">${stats.depth}</span>
            <span style="font-size: 11px; color: var(--text-muted);">${t('json.depth')}</span>
        </div>
        <div class="tool-output" style="flex-direction: column; text-align: center; padding: 12px;">
            <span style="font-size: 20px; font-weight: 800; color: var(--accent-2);">${stats.keys}</span>
            <span style="font-size: 11px; color: var(--text-muted);">${t('json.keys')}</span>
        </div>
        <div class="tool-output" style="flex-direction: column; text-align: center; padding: 12px;">
            <span style="font-size: 20px; font-weight: 800; color: var(--accent-3);">${stats.type}</span>
            <span style="font-size: 11px; color: var(--text-muted);">${t('json.type')}</span>
        </div>
    `;
}

function analyzeJSON(data, depth = 0) {
    let maxDepth = depth;
    let keyCount = 0;

    if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data);
        keyCount = keys.length;
        keys.forEach(key => {
            const sub = analyzeJSON(data[key], depth + 1);
            maxDepth = Math.max(maxDepth, sub.depth);
            keyCount += sub.keys;
        });
    }

    return {
        depth: maxDepth,
        keys: keyCount,
        type: Array.isArray(data) ? 'Array' : typeof data === 'object' && data !== null ? 'Object' : typeof data
    };
}

function loadSampleJSON() {
    const sample = {
        "name": "ToolBox.digital",
        "version": "1.0.0",
        "tools": [
            { "id": "password", "name": "Password Generator", "free": true },
            { "id": "colors", "name": "Color Palette Generator", "free": true },
            { "id": "text", "name": "Text Tools", "free": true },
            { "id": "converter", "name": "Unit Converter", "free": true },
            { "id": "json", "name": "JSON Formatter", "free": true }
        ],
        "config": {
            "theme": "dark",
            "language": "multi",
            "analytics": false,
            "privacy": true
        }
    };
    document.getElementById('json-input').value = JSON.stringify(sample, null, 2);
    formatJSON();
}
