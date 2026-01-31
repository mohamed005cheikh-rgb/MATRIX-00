// التبديل بين المحول والحاسبة
function showTool(toolId, event) {
    document.querySelectorAll('.tool-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(toolId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// تبديل اللغة (AR/FR)
function switchLang(lang) {
    document.body.className = 'lang-' + lang;
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// منطق المحول الرقمي
function calculateConversion() {
    const val = document.getElementById('conv-input').value.trim();
    const fromBase = parseInt(document.getElementById('from-base').value);
    const resDiv = document.getElementById('conv-results');

    if(!val) { 
        resDiv.innerHTML = `<span style="opacity:0.5">...</span>`; 
        return; 
    }

    try {
        const decimal = parseInt(val, fromBase);
        if(isNaN(decimal)) throw "Err";
        
        resDiv.innerHTML = `
            <div style="font-size:0.8rem; opacity:0.6; margin-bottom:5px">BIN: ${decimal.toString(2)}</div>
            <div style="color:#3b82f6; font-weight:bold; font-size:1.6rem">${decimal}</div>
            <div style="font-size:0.8rem; opacity:0.6; margin-top:5px">HEX: ${decimal.toString(16).toUpperCase()}</div>
        `;
    } catch(e) { 
        resDiv.innerHTML = `<span style="color:#ff4444">⚠️ صيغة غير صحيحة</span>`; 
    }
}

// منطق الحاسبة
function runCalc() {
    const n1 = document.getElementById('num1').value.trim();
    const n2 = document.getElementById('num2').value.trim();
    const op = document.getElementById('op').value;
    const base = parseInt(document.getElementById('calc-base').value);
    const resDiv = document.getElementById('calc-results');

    try {
        const d1 = parseInt(n1, base);
        const d2 = parseInt(n2, base);
        if(isNaN(d1) || isNaN(d2)) throw "Err";
        
        let res;
        if(op === '+') res = d1 + d2;
        else if(op === '-') res = d1 - d2;
        else if(op === '*') res = d1 * d2;
        else if(op === '/') res = d1 / d2;

        resDiv.innerHTML = `
            <div style="font-size:1.4rem; color:#25d366">${res.toString(base).toUpperCase()}</div>
            <div style="font-size:0.9rem; opacity:0.5">Decimal: ${res}</div>
        `;
    } catch(e) { 
        resDiv.innerHTML = `<span style="color:#ff4444">⚠️ خطأ في الأرقام</span>`; 
    }
}

