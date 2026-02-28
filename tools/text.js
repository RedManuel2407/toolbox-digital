/* ============================================
   Tool: Text Tools
   ============================================ */

function renderTextTool(container) {
    container.innerHTML = `
        <div class="tool-tabs">
            <button class="tool-tab active" onclick="setTextTab('analyze')" id="tab-analyze">📊 ${t('text.tab.analyze')}</button>
            <button class="tool-tab" onclick="setTextTab('transform')" id="tab-transform">🔄 ${t('text.tab.transform')}</button>
            <button class="tool-tab" onclick="setTextTab('lorem')" id="tab-lorem">📝 ${t('text.tab.lorem')}</button>
            <button class="tool-tab" onclick="setTextTab('encode')" id="tab-encode">🔧 ${t('text.tab.encode')}</button>
        </div>

        <div id="text-tab-content"></div>
    `;

    window._textTab = 'analyze';
    renderTextTab();
}

function setTextTab(tab) {
    window._textTab = tab;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab)?.classList.add('active');
    renderTextTab();
}

function renderTextTab() {
    const content = document.getElementById('text-tab-content');

    switch (window._textTab) {
        case 'analyze':
            content.innerHTML = `
                <div class="tool-group" style="margin-top: 16px;">
                    <label class="tool-label">${t('text.input')}</label>
                    <textarea class="tool-textarea" id="text-input" rows="6" placeholder="${t('text.placeholder')}" oninput="analyzeText()"></textarea>
                </div>
                <div class="stat-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; margin-top: 16px;">
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-chars" style="font-size: 24px; font-weight: 800; color: var(--accent-1);">0</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.chars')}</span>
                    </div>
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-words" style="font-size: 24px; font-weight: 800; color: var(--accent-1);">0</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.words')}</span>
                    </div>
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-sentences" style="font-size: 24px; font-weight: 800; color: var(--accent-1);">0</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.sentences')}</span>
                    </div>
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-lines" style="font-size: 24px; font-weight: 800; color: var(--accent-1);">0</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.lines')}</span>
                    </div>
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-readtime" style="font-size: 24px; font-weight: 800; color: var(--accent-2);">0s</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.readTime')}</span>
                    </div>
                    <div class="tool-output" style="flex-direction: column; text-align: center; padding: 16px;">
                        <span id="text-speaktime" style="font-size: 24px; font-weight: 800; color: var(--accent-2);">0s</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${t('text.speakTime')}</span>
                    </div>
                </div>
            `;
            break;

        case 'transform':
            content.innerHTML = `
                <div class="tool-group" style="margin-top: 16px;">
                    <label class="tool-label">${t('text.input')}</label>
                    <textarea class="tool-textarea" id="text-transform-input" rows="4" placeholder="${t('text.placeholder')}"></textarea>
                </div>
                <div class="tool-tabs" style="margin-top: 12px; flex-wrap: wrap;">
                    <button class="btn btn-secondary btn-small" onclick="transformText('upper')">${t('text.uppercase')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('lower')">${t('text.lowercase')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('title')">${t('text.titlecase')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('sentence')">${t('text.sentencecase')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('reverse')">${t('text.reverse')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('slug')">${t('text.slug')}</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('camel')">camelCase</button>
                    <button class="btn btn-secondary btn-small" onclick="transformText('nospaces')">${t('text.remove-spaces')}</button>
                </div>
                <div class="tool-group" style="margin-top: 16px;">
                    <label class="tool-label">${t('text.result')}</label>
                    <div class="tool-output">
                        <span class="tool-output-text" id="text-transform-result" style="white-space: pre-wrap;">—</span>
                        <button class="btn-icon" onclick="copyToClipboard(document.getElementById('text-transform-result').textContent)" title="${t('text.copy')}">
                            <i data-lucide="copy"></i>
                        </button>
                    </div>
                </div>
            `;
            break;

        case 'lorem':
            content.innerHTML = `
                <div class="tool-group" style="margin-top: 16px;">
                    <label class="tool-label">${t('text.paragraphs')}: <span id="lorem-count-val">3</span></label>
                    <input type="range" class="tool-range" id="lorem-count" min="1" max="10" value="3">
                </div>
                <div class="tool-actions" style="margin-top: 12px;">
                    <button class="btn btn-primary" onclick="generateLorem()">
                        <i data-lucide="type"></i> ${t('text.generateLorem')}
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.getElementById('lorem-output').textContent)">
                        <i data-lucide="copy"></i> ${t('text.copy')}
                    </button>
                </div>
                <div class="tool-group" style="margin-top: 16px;">
                    <div class="tool-output" style="flex-direction: column; align-items: flex-start;">
                        <span class="tool-output-text" id="lorem-output" style="white-space: pre-wrap; line-height: 1.8;"></span>
                    </div>
                </div>
            `;
            document.getElementById('lorem-count').addEventListener('input', (e) => {
                document.getElementById('lorem-count-val').textContent = e.target.value;
            });
            generateLorem();
            break;

        case 'encode':
            content.innerHTML = `
                <div style="display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 250px;">
                        <div class="tool-group">
                            <label class="tool-label">${t('text.inputLabel')}</label>
                            <textarea class="tool-textarea" id="encode-input" rows="4" placeholder="${t('text.placeholder')}"></textarea>
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 250px;">
                        <div class="tool-group">
                            <label class="tool-label">${t('text.outputLabel')}</label>
                            <textarea class="tool-textarea" id="encode-output" rows="4" readonly></textarea>
                        </div>
                    </div>
                </div>
                <div class="tool-group" style="margin-top: 12px;">
                    <label class="tool-label">${t('text.encoding')}</label>
                    <select class="tool-select" id="encode-method">
                        <option value="base64">Base64</option>
                        <option value="url">URL Encoding</option>
                        <option value="html">HTML Entities</option>
                    </select>
                </div>
                <div class="tool-actions" style="margin-top: 12px;">
                    <button class="btn btn-primary" onclick="encodeText()">
                        <i data-lucide="lock"></i> ${t('text.encode')}
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="decodeText()">
                        <i data-lucide="unlock"></i> ${t('text.decode')}
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.getElementById('encode-output').value)">
                        <i data-lucide="copy"></i> ${t('text.copy')}
                    </button>
                </div>
            `;
            break;
    }
    lucide.createIcons();
}

// Text Analysis
function analyzeText() {
    const text = document.getElementById('text-input').value;

    document.getElementById('text-chars').textContent = text.length;
    document.getElementById('text-words').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('text-sentences').textContent = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
    document.getElementById('text-lines').textContent = text.trim() ? text.split('\n').length : 0;

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const readMin = Math.floor(words / 200);
    const readSec = Math.round((words % 200) / 200 * 60);
    document.getElementById('text-readtime').textContent = readMin > 0 ? `${readMin}m ${readSec}s` : `${readSec}s`;

    const speakMin = Math.floor(words / 130);
    const speakSec = Math.round((words % 130) / 130 * 60);
    document.getElementById('text-speaktime').textContent = speakMin > 0 ? `${speakMin}m ${speakSec}s` : `${speakSec}s`;
}

// Text Transformation
function transformText(mode) {
    const input = document.getElementById('text-transform-input').value;
    if (!input) return;

    let result;
    switch (mode) {
        case 'upper': result = input.toUpperCase(); break;
        case 'lower': result = input.toLowerCase(); break;
        case 'title': result = input.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()); break;
        case 'sentence': result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); break;
        case 'reverse': result = input.split('').reverse().join(''); break;
        case 'slug': result = input.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'); break;
        case 'camel': result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); break;
        case 'nospaces': result = input.replace(/\s+/g, ''); break;
    }

    document.getElementById('text-transform-result').textContent = result;
}

// Lorem Ipsum Generator
const LOREM_PARAGRAPHS = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.",
    "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
    "Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat.",
    "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.",
    "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
];

function generateLorem() {
    const count = parseInt(document.getElementById('lorem-count').value);
    const output = [];
    for (let i = 0; i < count; i++) {
        output.push(LOREM_PARAGRAPHS[i % LOREM_PARAGRAPHS.length]);
    }
    document.getElementById('lorem-output').textContent = output.join('\n\n');
}

// Encode / Decode
function encodeText() {
    const input = document.getElementById('encode-input').value;
    const method = document.getElementById('encode-method').value;
    let result = '';

    switch (method) {
        case 'base64': result = btoa(unescape(encodeURIComponent(input))); break;
        case 'url': result = encodeURIComponent(input); break;
        case 'html': result = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); break;
    }

    document.getElementById('encode-output').value = result;
}

function decodeText() {
    const input = document.getElementById('encode-input').value;
    const method = document.getElementById('encode-method').value;
    let result = '';

    try {
        switch (method) {
            case 'base64': result = decodeURIComponent(escape(atob(input))); break;
            case 'url': result = decodeURIComponent(input); break;
            case 'html': result = input.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'); break;
        }
    } catch (e) {
        result = 'Error: Invalid input';
    }

    document.getElementById('encode-output').value = result;
}
