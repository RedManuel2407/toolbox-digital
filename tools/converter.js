/* ============================================
   Tool: Unit Converter
   ============================================ */

const CONVERTER_UNITS = {
    length: {
        nameKey: 'conv.length',
        units: [
            { name: 'Millimeter', nameKey: 'unit.Millimeter', abbr: 'mm', factor: 1 },
            { name: 'Zentimeter', nameKey: 'unit.Zentimeter', abbr: 'cm', factor: 10 },
            { name: 'Meter', nameKey: 'unit.Meter', abbr: 'm', factor: 1000 },
            { name: 'Kilometer', nameKey: 'unit.Kilometer', abbr: 'km', factor: 1000000 },
            { name: 'Zoll', nameKey: 'unit.Zoll', abbr: 'in', factor: 25.4 },
            { name: 'Fuß', nameKey: 'unit.Fuß', abbr: 'ft', factor: 304.8 },
            { name: 'Yard', nameKey: 'unit.Yard', abbr: 'yd', factor: 914.4 },
            { name: 'Meile', nameKey: 'unit.Meile', abbr: 'mi', factor: 1609344 }
        ]
    },
    weight: {
        nameKey: 'conv.weight',
        units: [
            { name: 'Milligramm', nameKey: 'unit.Milligramm', abbr: 'mg', factor: 1 },
            { name: 'Gramm', nameKey: 'unit.Gramm', abbr: 'g', factor: 1000 },
            { name: 'Kilogramm', nameKey: 'unit.Kilogramm', abbr: 'kg', factor: 1000000 },
            { name: 'Tonne', nameKey: 'unit.Tonne', abbr: 't', factor: 1000000000 },
            { name: 'Unze', nameKey: 'unit.Unze', abbr: 'oz', factor: 28349.5 },
            { name: 'Pfund', nameKey: 'unit.Pfund', abbr: 'lb', factor: 453592 }
        ]
    },
    temperature: {
        nameKey: 'conv.temperature',
        units: [
            { name: 'Celsius', nameKey: 'unit.Celsius', abbr: '°C', special: true },
            { name: 'Fahrenheit', nameKey: 'unit.Fahrenheit', abbr: '°F', special: true },
            { name: 'Kelvin', nameKey: 'unit.Kelvin', abbr: 'K', special: true }
        ]
    },
    data: {
        nameKey: 'conv.data',
        units: [
            { name: 'Bit', nameKey: 'unit.Bit', abbr: 'bit', factor: 1 },
            { name: 'Byte', nameKey: 'unit.Byte', abbr: 'B', factor: 8 },
            { name: 'Kilobyte', nameKey: 'unit.Kilobyte', abbr: 'KB', factor: 8192 },
            { name: 'Megabyte', nameKey: 'unit.Megabyte', abbr: 'MB', factor: 8388608 },
            { name: 'Gigabyte', nameKey: 'unit.Gigabyte', abbr: 'GB', factor: 8589934592 },
            { name: 'Terabyte', nameKey: 'unit.Terabyte', abbr: 'TB', factor: 8796093022208 }
        ]
    },
    time: {
        nameKey: 'conv.time',
        units: [
            { name: 'Sekunde', nameKey: 'unit.Sekunde', abbr: 's', factor: 1 },
            { name: 'Minute', nameKey: 'unit.Minute', abbr: 'min', factor: 60 },
            { name: 'Stunde', nameKey: 'unit.Stunde', abbr: 'h', factor: 3600 },
            { name: 'Tag', nameKey: 'unit.Tag', abbr: 'd', factor: 86400 },
            { name: 'Woche', nameKey: 'unit.Woche', abbr: 'w', factor: 604800 }
        ]
    }
};

function renderConverterTool(container) {
    const categories = Object.keys(CONVERTER_UNITS);

    container.innerHTML = `
        <div class="tool-tabs">
            ${categories.map((cat, i) => `
                <button class="tool-tab ${i === 0 ? 'active' : ''}" onclick="setConverterCategory('${cat}')" id="conv-tab-${cat}">
                    ${t(CONVERTER_UNITS[cat].nameKey)}
                </button>
            `).join('')}
        </div>

        <div style="margin-top: 20px;">
            <div class="tool-row">
                <div class="tool-col">
                    <label class="tool-label">${t('conv.from')}</label>
                    <input type="number" class="tool-input" id="conv-from-value" value="1" oninput="convertUnits()">
                    <select class="tool-select" id="conv-from-unit" onchange="convertUnits()"></select>
                </div>
                <div style="display: flex; align-items: center; padding-top: 24px; color: var(--text-muted); font-size: 24px;">→</div>
                <div class="tool-col">
                    <label class="tool-label">${t('conv.to')}</label>
                    <input type="number" class="tool-input" id="conv-to-value" readonly>
                    <select class="tool-select" id="conv-to-unit" onchange="convertUnits()"></select>
                </div>
            </div>

            <div class="tool-actions" style="margin-top: 12px;">
                <button class="btn btn-secondary btn-small" onclick="swapUnits()">
                    <i data-lucide="arrow-left-right"></i> ${t('conv.swap')}
                </button>
                <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.getElementById('conv-to-value').value)">
                    <i data-lucide="copy"></i> ${t('conv.copy')}
                </button>
            </div>

            <div class="tool-group" style="margin-top: 20px;">
                <label class="tool-label">${t('conv.allConversions')}</label>
                <div id="conv-all" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;"></div>
            </div>
        </div>
    `;

    window._converterCategory = categories[0];
    populateUnitSelects();
    convertUnits();
}

function setConverterCategory(cat) {
    window._converterCategory = cat;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('conv-tab-' + cat)?.classList.add('active');
    document.getElementById('conv-from-value').value = 1;
    populateUnitSelects();
    convertUnits();
}

function populateUnitSelects() {
    const cat = CONVERTER_UNITS[window._converterCategory];
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');

    fromSelect.innerHTML = cat.units.map((u, i) => `<option value="${i}">${t(u.nameKey)}</option>`).join('');
    toSelect.innerHTML = cat.units.map((u, i) => `<option value="${i}" ${i === 1 ? 'selected' : ''}>${t(u.nameKey)}</option>`).join('');
}

function convertUnits() {
    const cat = CONVERTER_UNITS[window._converterCategory];
    const fromIdx = parseInt(document.getElementById('conv-from-unit').value);
    const toIdx = parseInt(document.getElementById('conv-to-unit').value);
    const value = parseFloat(document.getElementById('conv-from-value').value) || 0;

    let result;
    if (cat.units[0].special) {
        // Temperature conversion
        result = convertTemperature(value, cat.units[fromIdx].name, cat.units[toIdx].name);
    } else {
        const baseValue = value * cat.units[fromIdx].factor;
        result = baseValue / cat.units[toIdx].factor;
    }

    document.getElementById('conv-to-value').value = parseFloat(result.toFixed(10)).toLocaleString('de-DE');

    // Show all conversions
    const allDiv = document.getElementById('conv-all');
    allDiv.innerHTML = cat.units.map(u => {
        let converted;
        if (cat.units[0].special) {
            converted = convertTemperature(value, cat.units[fromIdx].name, u.name);
        } else {
            converted = (value * cat.units[fromIdx].factor) / u.factor;
        }
        return `
            <div class="tool-output" style="font-size: 13px; cursor: pointer;" onclick="copyToClipboard('${parseFloat(converted.toFixed(10))} ${u.abbr}')">
                ${parseFloat(converted.toFixed(10))} ${u.abbr}
            </div>
        `;
    }).join('');
}

function convertTemperature(value, from, to) {
    // Convert to Celsius first
    let celsius;
    switch (from) {
        case 'Celsius': celsius = value; break;
        case 'Fahrenheit': celsius = (value - 32) * 5 / 9; break;
        case 'Kelvin': celsius = value - 273.15; break;
    }

    // Convert from Celsius
    switch (to) {
        case 'Celsius': return celsius;
        case 'Fahrenheit': return celsius * 9 / 5 + 32;
        case 'Kelvin': return celsius + 273.15;
    }
}

function swapUnits() {
    const fromUnit = document.getElementById('conv-from-unit');
    const toUnit = document.getElementById('conv-to-unit');
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    convertUnits();
}
