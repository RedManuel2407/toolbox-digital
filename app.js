/* ============================================
   ToolBox.digital – Main Application Logic
   ============================================ */

// Tool Registry
const TOOLS = [
    {
        id: 'password',
        nameKey: 'pw.name',
        descKey: 'pw.desc',
        icon: '🔐',
        tagKeys: ['pw.tags.1', 'pw.tags.2'],
        accent: 'linear-gradient(135deg, #6366f1, #818cf8)',
        render: renderPasswordTool
    },
    {
        id: 'colors',
        nameKey: 'colors.name',
        descKey: 'colors.desc',
        icon: '🎨',
        tagKeys: ['colors.tags.1', 'colors.tags.2'],
        accent: 'linear-gradient(135deg, #ec4899, #f472b6)',
        render: renderColorsTool
    },
    {
        id: 'text',
        nameKey: 'text.name',
        descKey: 'text.desc',
        icon: '📝',
        tagKeys: ['text.tags.1', 'text.tags.2'],
        accent: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
        render: renderTextTool
    },
    {
        id: 'converter',
        nameKey: 'conv.name',
        descKey: 'conv.desc',
        icon: '🔄',
        tagKeys: ['conv.tags.1', 'conv.tags.2'],
        accent: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        render: renderConverterTool
    },
    {
        id: 'json',
        nameKey: 'json.name',
        descKey: 'json.desc',
        icon: '📊',
        tagKeys: ['json.tags.1', 'json.tags.2'],
        accent: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        render: renderJsonTool
    }
];

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initTheme();
    renderToolCards();
    initNavigation();
    initLangToggle();
    updatePageLanguage();
    lucide.createIcons();
});

// ============ THEME ============

function initTheme() {
    const saved = localStorage.getItem('toolbox-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'dark');

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('toolbox-theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

// ============ LANGUAGE ============

function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const newLang = getLang() === 'de' ? 'en' : 'de';
            setLang(newLang);
        });
    }
}

// ============ TOOL CARDS ============

function renderToolCards() {
    const grid = document.getElementById('tools-grid');
    grid.innerHTML = TOOLS.map(tool => `
        <div class="tool-card" onclick="openTool('${tool.id}')" id="card-${tool.id}" style="--card-accent: ${tool.accent}">
            <div class="tool-card-header">
                <div class="tool-card-icon" style="background: ${tool.accent}; border-radius: 12px;">
                    <span style="filter: brightness(100); font-size: 24px;">${tool.icon}</span>
                </div>
                <div class="tool-card-info">
                    <h3>${t(tool.nameKey)}</h3>
                    <p>${t(tool.descKey)}</p>
                </div>
            </div>
            <div class="tool-card-tags">
                ${tool.tagKeys.map(tk => `<span class="tag">${t(tk)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ============ NAVIGATION ============

function initNavigation() {
    document.getElementById('btn-back').addEventListener('click', closeTool);

    // Handle nav link clicks when a tool is open
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const workspace = document.getElementById('tool-workspace');
            if (workspace.style.display === 'block') {
                e.preventDefault();
                const targetId = link.getAttribute('href').replace('#', '');
                closeTool();
                // Wait for DOM to update, then scroll
                setTimeout(() => {
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 50);
            }
        });
    });
}

function openTool(toolId) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    // Track current tool for re-rendering on language change
    window._currentToolId = toolId;

    // Hide main sections
    document.getElementById('hero').style.display = 'none';
    document.getElementById('tools').style.display = 'none';
    document.getElementById('features').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('footer').style.display = 'none';

    // Show workspace
    const workspace = document.getElementById('tool-workspace');
    workspace.style.display = 'block';
    document.getElementById('workspace-title').textContent = tool.icon + ' ' + t(tool.nameKey);

    // Render tool
    const body = document.getElementById('workspace-body');
    tool.render(body);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-init icons
    lucide.createIcons();
}

function closeTool() {
    window._currentToolId = null;
    document.getElementById('hero').style.display = '';
    document.getElementById('tools').style.display = '';
    document.getElementById('features').style.display = '';
    document.getElementById('about').style.display = '';
    document.getElementById('footer').style.display = '';
    document.getElementById('tool-workspace').style.display = 'none';

    window.scrollTo({ top: document.getElementById('tools').offsetTop - 100, behavior: 'smooth' });
}

// ============ UTILITIES ============

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('copy.success'));
    }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(t('copy.success'));
    });
}

function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle"></i> ${message}`;
    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => toast.remove(), 2500);
}
