/* ============================================
   ToolBox.digital – Internationalization (i18n)
   Supported Languages: DE (German), EN (English)
   ============================================ */

const TRANSLATIONS = {
    // ============ MAIN PAGE ============
    'hero.badge': {
        de: '100% Kostenlos & Ohne Registrierung',
        en: '100% Free & No Registration'
    },
    'hero.title.1': { de: 'Deine ', en: 'Your ' },
    'hero.title.highlight': { de: 'Online-Tools', en: 'Online Tools' },
    'hero.title.2': { de: 'immer griffbereit.', en: 'always at hand.' },
    'hero.subtitle': {
        de: 'Professionelle Tools für Entwickler, Designer & Creator. Alles läuft direkt in deinem Browser – schnell, sicher & privat.',
        en: 'Professional tools for developers, designers & creators. Everything runs directly in your browser – fast, secure & private.'
    },
    'hero.cta.tools': { de: 'Tools entdecken', en: 'Explore Tools' },
    'hero.cta.more': { de: 'Mehr erfahren', en: 'Learn More' },
    'hero.stats.tools': { de: 'Tools', en: 'Tools' },
    'hero.stats.cost': { de: 'Kosten', en: 'Cost' },
    'hero.stats.private': { de: 'Privat', en: 'Private' },

    // Nav
    'nav.tools': { de: 'Tools', en: 'Tools' },
    'nav.features': { de: 'Features', en: 'Features' },
    'nav.about': { de: 'Über uns', en: 'About' },

    // Tools Section
    'tools.badge': { de: 'Unsere Tools', en: 'Our Tools' },
    'tools.title': { de: 'Alles was du brauchst', en: 'Everything you need' },
    'tools.subtitle': { de: 'Wähle ein Tool und leg sofort los – keine Installation nötig.', en: 'Choose a tool and get started right away – no installation needed.' },
    'tools.back': { de: 'Zurück zu allen Tools', en: 'Back to all tools' },

    // Features Section
    'features.badge': { de: 'Warum ToolBox?', en: 'Why ToolBox?' },
    'features.title': { de: 'Features die überzeugen', en: 'Features that convince' },
    'features.fast.title': { de: 'Blitzschnell', en: 'Lightning Fast' },
    'features.fast.desc': { de: 'Alle Tools laufen direkt in deinem Browser – kein Server, keine Wartezeit.', en: 'All tools run directly in your browser – no server, no waiting.' },
    'features.private.title': { de: '100% Privat', en: '100% Private' },
    'features.private.desc': { de: 'Deine Daten verlassen niemals deinen Browser. Keine Uploads, keine Logs.', en: 'Your data never leaves your browser. No uploads, no logs.' },
    'features.mobile.title': { de: 'Mobile Ready', en: 'Mobile Ready' },
    'features.mobile.desc': { de: 'Perfekt optimiert für alle Geräte – nutze deine Tools überall.', en: 'Perfectly optimized for all devices – use your tools anywhere.' },
    'features.unlimited.title': { de: 'Unbegrenzt', en: 'Unlimited' },
    'features.unlimited.desc': { de: 'Keine Limits, keine versteckten Kosten. Alle Tools sind dauerhaft kostenlos.', en: 'No limits, no hidden costs. All tools are permanently free.' },

    // About Section
    'about.badge': { de: 'Über ToolBox.digital', en: 'About ToolBox.digital' },
    'about.title': { de: 'Von Entwicklern,<br>für alle.', en: 'By developers,<br>for everyone.' },
    'about.desc.1': { de: 'Wir glauben, dass professionelle Online-Tools kostenlos und für jeden zugänglich sein sollten. ToolBox.digital ist ein Open-Source-Projekt, das ständig wächst.', en: 'We believe that professional online tools should be free and accessible to everyone. ToolBox.digital is an open-source project that is constantly growing.' },
    'about.desc.2': { de: 'Jedes Tool wird mit Liebe zum Detail entwickelt und ist darauf ausgelegt, dir Zeit zu sparen und deinen Workflow zu verbessern.', en: 'Every tool is developed with attention to detail and is designed to save you time and improve your workflow.' },

    // Footer
    'footer.desc': { de: 'Kostenlose Online-Tools für deinen Alltag.', en: 'Free online tools for your daily life.' },
    'footer.tools': { de: 'Tools', en: 'Tools' },
    'footer.legal': { de: 'Rechtliches', en: 'Legal' },
    'footer.imprint': { de: 'Impressum', en: 'Imprint' },
    'footer.privacy': { de: 'Datenschutz', en: 'Privacy Policy' },
    'footer.terms': { de: 'AGB', en: 'Terms' },
    'footer.bottom': { de: 'Mit ❤️ gebaut.', en: 'Built with ❤️.' },

    // ============ TOOL: PASSWORD ============
    'pw.name': { de: 'Passwort Generator', en: 'Password Generator' },
    'pw.desc': { de: 'Erstelle sichere, zufällige Passwörter mit konfigurierbarer Länge und Zeichenarten.', en: 'Create secure, random passwords with configurable length and character types.' },
    'pw.tags.1': { de: 'Sicherheit', en: 'Security' },
    'pw.tags.2': { de: 'Generator', en: 'Generator' },
    'pw.length': { de: 'Passwort-Länge', en: 'Password Length' },
    'pw.upper': { de: 'Großbuchstaben (A-Z)', en: 'Uppercase (A-Z)' },
    'pw.lower': { de: 'Kleinbuchstaben (a-z)', en: 'Lowercase (a-z)' },
    'pw.numbers': { de: 'Zahlen (0-9)', en: 'Numbers (0-9)' },
    'pw.symbols': { de: 'Sonderzeichen (!@#$...)', en: 'Symbols (!@#$...)' },
    'pw.generated': { de: 'Generiertes Passwort', en: 'Generated Password' },
    'pw.clickGenerate': { de: 'Klicke auf "Generieren"', en: 'Click "Generate"' },
    'pw.noPassword': { de: 'Noch kein Passwort generiert', en: 'No password generated yet' },
    'pw.generate': { de: 'Generieren', en: 'Generate' },
    'pw.multiple': { de: '5 Passwörter', en: '5 Passwords' },
    'pw.selectOption': { de: 'Mindestens eine Option wählen!', en: 'Select at least one option!' },
    'pw.weak': { de: '🔴 Schwach', en: '🔴 Weak' },
    'pw.medium': { de: '🟡 Mittel', en: '🟡 Medium' },
    'pw.strong': { de: '🟢 Stark', en: '🟢 Strong' },
    'pw.veryStrong': { de: '🟣 Sehr stark', en: '🟣 Very Strong' },

    // ============ TOOL: COLORS ============
    'colors.name': { de: 'Farbpaletten Generator', en: 'Color Palette Generator' },
    'colors.desc': { de: 'Generiere harmonische Farbpaletten für dein nächstes Design-Projekt.', en: 'Generate harmonious color palettes for your next design project.' },
    'colors.tags.1': { de: 'Design', en: 'Design' },
    'colors.tags.2': { de: 'Farben', en: 'Colors' },
    'colors.base': { de: 'Basis-Farbe', en: 'Base Color' },
    'colors.analog': { de: 'Analog', en: 'Analogous' },
    'colors.complementary': { de: 'Komplementär', en: 'Complementary' },
    'colors.triadic': { de: 'Triadisch', en: 'Triadic' },
    'colors.split': { de: 'Split', en: 'Split' },
    'colors.mono': { de: 'Mono', en: 'Mono' },
    'colors.random': { de: 'Zufall', en: 'Random' },
    'colors.newPalette': { de: 'Neue Palette', en: 'New Palette' },
    'colors.exportCSS': { de: 'CSS exportieren', en: 'Export CSS' },

    // ============ TOOL: TEXT ============
    'text.name': { de: 'Text Tools', en: 'Text Tools' },
    'text.desc': { de: 'Wörter zählen, Groß-/Kleinschreibung ändern, Lorem Ipsum generieren und mehr.', en: 'Count words, change case, generate Lorem Ipsum and more.' },
    'text.tags.1': { de: 'Text', en: 'Text' },
    'text.tags.2': { de: 'Produktivität', en: 'Productivity' },
    'text.tab.analyze': { de: 'Analyse', en: 'Analysis' },
    'text.tab.transform': { de: 'Umwandeln', en: 'Transform' },
    'text.tab.lorem': { de: 'Lorem Ipsum', en: 'Lorem Ipsum' },
    'text.tab.encode': { de: 'Encode/Decode', en: 'Encode/Decode' },
    'text.input': { de: 'Text eingeben', en: 'Enter text' },
    'text.placeholder': { de: 'Füge deinen Text hier ein...', en: 'Paste your text here...' },
    'text.chars': { de: 'Zeichen', en: 'Characters' },
    'text.words': { de: 'Wörter', en: 'Words' },
    'text.sentences': { de: 'Sätze', en: 'Sentences' },
    'text.lines': { de: 'Zeilen', en: 'Lines' },
    'text.readTime': { de: 'Lesezeit', en: 'Read Time' },
    'text.speakTime': { de: 'Sprechzeit', en: 'Speak Time' },
    'text.uppercase': { de: 'GROSSBUCHSTABEN', en: 'UPPERCASE' },
    'text.lowercase': { de: 'kleinbuchstaben', en: 'lowercase' },
    'text.titlecase': { de: 'Titel Schreibweise', en: 'Title Case' },
    'text.sentencecase': { de: 'Satzanfang groß', en: 'Sentence case' },
    'text.reverse': { de: 'Umkehren', en: 'Reverse' },
    'text.slug': { de: 'Slugify', en: 'Slugify' },
    'text.camel': { de: 'camelCase', en: 'camelCase' },
    'text.remove-spaces': { de: 'Leerzeichen entfernen', en: 'Remove spaces' },
    'text.result': { de: 'Ergebnis', en: 'Result' },
    'text.copy': { de: 'Kopieren', en: 'Copy' },
    'text.paragraphs': { de: 'Absätze', en: 'Paragraphs' },
    'text.generateLorem': { de: 'Generieren', en: 'Generate' },
    'text.encoding': { de: 'Methode', en: 'Method' },
    'text.encode': { de: 'Encode', en: 'Encode' },
    'text.decode': { de: 'Decode', en: 'Decode' },
    'text.inputLabel': { de: 'Eingabe', en: 'Input' },
    'text.outputLabel': { de: 'Ausgabe', en: 'Output' },

    // ============ TOOL: CONVERTER ============
    'conv.name': { de: 'Einheiten-Konverter', en: 'Unit Converter' },
    'conv.desc': { de: 'Rechne Länge, Gewicht, Temperatur und Daten blitzschnell um.', en: 'Convert length, weight, temperature and data in a flash.' },
    'conv.tags.1': { de: 'Konverter', en: 'Converter' },
    'conv.tags.2': { de: 'Mathe', en: 'Math' },
    'conv.length': { de: 'Länge', en: 'Length' },
    'conv.weight': { de: 'Gewicht', en: 'Weight' },
    'conv.temperature': { de: 'Temperatur', en: 'Temperature' },
    'conv.data': { de: 'Daten', en: 'Data' },
    'conv.time': { de: 'Zeit', en: 'Time' },
    'conv.from': { de: 'Von', en: 'From' },
    'conv.to': { de: 'Nach', en: 'To' },
    'conv.swap': { de: 'Tauschen', en: 'Swap' },
    'conv.copy': { de: 'Kopieren', en: 'Copy' },
    'conv.allConversions': { de: 'Alle Umrechnungen', en: 'All Conversions' },

    // Unit names
    'unit.Millimeter': { de: 'Millimeter', en: 'Millimeters' },
    'unit.Zentimeter': { de: 'Zentimeter', en: 'Centimeters' },
    'unit.Meter': { de: 'Meter', en: 'Meters' },
    'unit.Kilometer': { de: 'Kilometer', en: 'Kilometers' },
    'unit.Zoll': { de: 'Zoll', en: 'Inches' },
    'unit.Fuß': { de: 'Fuß', en: 'Feet' },
    'unit.Yard': { de: 'Yard', en: 'Yards' },
    'unit.Meile': { de: 'Meile', en: 'Miles' },
    'unit.Milligramm': { de: 'Milligramm', en: 'Milligrams' },
    'unit.Gramm': { de: 'Gramm', en: 'Grams' },
    'unit.Kilogramm': { de: 'Kilogramm', en: 'Kilograms' },
    'unit.Tonne': { de: 'Tonne', en: 'Tonnes' },
    'unit.Unze': { de: 'Unze', en: 'Ounces' },
    'unit.Pfund': { de: 'Pfund', en: 'Pounds' },
    'unit.Celsius': { de: 'Celsius', en: 'Celsius' },
    'unit.Fahrenheit': { de: 'Fahrenheit', en: 'Fahrenheit' },
    'unit.Kelvin': { de: 'Kelvin', en: 'Kelvin' },
    'unit.Bit': { de: 'Bit', en: 'Bits' },
    'unit.Byte': { de: 'Byte', en: 'Bytes' },
    'unit.Kilobyte': { de: 'Kilobyte', en: 'Kilobytes' },
    'unit.Megabyte': { de: 'Megabyte', en: 'Megabytes' },
    'unit.Gigabyte': { de: 'Gigabyte', en: 'Gigabytes' },
    'unit.Terabyte': { de: 'Terabyte', en: 'Terabytes' },
    'unit.Sekunde': { de: 'Sekunde', en: 'Seconds' },
    'unit.Minute': { de: 'Minute', en: 'Minutes' },
    'unit.Stunde': { de: 'Stunde', en: 'Hours' },
    'unit.Tag': { de: 'Tag', en: 'Days' },
    'unit.Woche': { de: 'Woche', en: 'Weeks' },

    // ============ TOOL: JSON ============
    'json.name': { de: 'JSON Formatter', en: 'JSON Formatter' },
    'json.desc': { de: 'Formatiere, validiere und analysiere JSON-Daten mit Syntax-Highlighting.', en: 'Format, validate and analyze JSON data with syntax highlighting.' },
    'json.tags.1': { de: 'Entwickler', en: 'Developer' },
    'json.tags.2': { de: 'JSON', en: 'JSON' },
    'json.format': { de: 'Formatieren', en: 'Format' },
    'json.minify': { de: 'Minifizieren', en: 'Minify' },
    'json.validate': { de: 'Validieren', en: 'Validate' },
    'json.sample': { de: 'Beispiel laden', en: 'Load Sample' },
    'json.copy': { de: 'Kopieren', en: 'Copy' },
    'json.input': { de: 'Eingabe', en: 'Input' },
    'json.output': { de: 'Ausgabe', en: 'Output' },
    'json.inputPlaceholder': { de: '{"key": "value"}', en: '{"key": "value"}' },
    'json.outputPlaceholder': { de: 'Formatiertes JSON erscheint hier...', en: 'Formatted JSON appears here...' },
    'json.stats': { de: 'JSON Statistiken', en: 'JSON Statistics' },
    'json.valid': { de: '✅ Gültiges JSON', en: '✅ Valid JSON' },
    'json.invalid': { de: '❌ Ungültiges JSON', en: '❌ Invalid JSON' },
    'json.depth': { de: 'Tiefe', en: 'Depth' },
    'json.keys': { de: 'Schlüssel', en: 'Keys' },
    'json.type': { de: 'Typ', en: 'Type' },

    // ============ SHARED ============
    'copy.success': { de: 'In Zwischenablage kopiert!', en: 'Copied to clipboard!' },
    'css.copied': { de: 'CSS in Zwischenablage kopiert!', en: 'CSS copied to clipboard!' },
};

// ============ I18N ENGINE ============

let currentLang = 'de';

function t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[currentLang] || entry['de'] || key;
}

function getLang() {
    return currentLang;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('toolbox-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    updatePageLanguage();
}

function initLang() {
    const saved = localStorage.getItem('toolbox-lang');
    if (saved) {
        currentLang = saved;
    } else {
        // Auto-detect browser language
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        currentLang = browserLang === 'de' ? 'de' : 'en';
    }
    document.documentElement.setAttribute('lang', currentLang);
}

function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const isHtml = el.getAttribute('data-i18n-html') === 'true';
        if (isHtml) {
            el.innerHTML = t(key);
        } else {
            el.textContent = t(key);
        }
    });

    // Update elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    // Update lang switcher button
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLang === 'de' ? 'EN' : 'DE';
        langBtn.title = currentLang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln';
    }

    // Re-render tool cards with translated strings
    if (typeof renderToolCards === 'function' && document.getElementById('tools-grid')) {
        renderToolCards();
    }

    // If a tool is open, re-render it
    const workspace = document.getElementById('tool-workspace');
    if (workspace && workspace.style.display === 'block') {
        const title = document.getElementById('workspace-title');
        if (title && window._currentToolId) {
            const tool = TOOLS.find(t => t.id === window._currentToolId);
            if (tool) {
                title.textContent = tool.icon + ' ' + t(tool.nameKey);
                tool.render(document.getElementById('workspace-body'));
                lucide.createIcons();
            }
        }
    }

    lucide.createIcons();
}
