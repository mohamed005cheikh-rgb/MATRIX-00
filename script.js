let currentExIdx = 0;
const exercises = [];

// توليد تمارين تغطي كافة الرموز المذكورة في القاموس
function generateExercises() {
    const database = [
        { q_ar: "لإدخال بيانات في الخوارزمية نستخدم:", q_fr: "Pour lire une donnée en Algo:", opt: ["Lire", "Ecrire", "<-", "Pour"], ans: "Lire", cat: "ALGO" },
        { q_ar: "رمز 'لا يساوي' في لغة C هو:", q_fr: "Le symbole 'différent de' en C:", opt: ["<>", "!=", "=/=", "NOT"], ans: "!=", cat: "LANG-C" },
        { q_ar: "دالة scanf تستخدم للـ:", q_fr: "La fonction scanf est utilisée pour:", opt: ["Affichage", "Lecture", "Saut de ligne", "Calcul"], ans: "Lecture", cat: "LANG-C" },
        { q_ar: "المحدد %f يستخدم لنوع البيانات:", q_fr: "Le format %f est utilisé pour:", opt: ["int", "char", "float", "double"], ans: "float", cat: "LANG-C" },
        { q_ar: "نهاية حلقة Pour في الخوارزمية تكون بـ:", q_fr: "La boucle Pour se termine par:", opt: ["FinSi", "FinPour", "Stop", "Next"], ans: "FinPour", cat: "ALGO" },
        { q_ar: "للحصول على عنوان متغير في الذاكرة نستخدم:", q_fr: "Pour obtenir l'adresse d'une variable:", opt: ["*", "&", "#", "@"], ans: "&", cat: "LANG-C" }
    ];

    for(let i=0; i<200; i++) {
        let pattern = database[i % database.length];
        exercises.push({...pattern, id: `ID:${(i+1).toString().padStart(3, '0')}`});
    }
}

function renderEx() {
    const ex = exercises[currentExIdx];
    const lang = document.body.className.includes('lang-ar') ? 'ar' : 'fr';
    
    document.getElementById('ex-id').textContent = ex.id;
    document.getElementById('ex-category').textContent = `TYPE: ${ex.cat}`;
    document.getElementById('ex-question').textContent = lang === 'ar' ? ex.q_ar : ex.q_fr;
    
    const container = document.getElementById('ex-options');
    container.innerHTML = '';
    
    [...ex.opt].sort(() => Math.random() - 0.5).forEach(o => {
        const b = document.createElement('button');
        b.className = 'option-btn';
        b.textContent = o;
        b.onclick = (e) => check(e, o, ex.ans);
        container.appendChild(b);
    });
}

function check(e, sel, cor) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    const feedback = document.getElementById('feedback');
    
    if(sel === cor) {
        e.target.classList.add('correct');
        feedback.innerHTML = "<span class='text-blue'>[✔] ACCESS_GRANTED</span>";
    } else {
        e.target.classList.add('wrong');
        feedback.innerHTML = `<span class='text-red'>[✘] ERROR: KEY IS ${cor}</span>`;
    }
    document.getElementById('next-btn').style.display = 'block';
}

function nextEx() {
    currentExIdx++;
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').innerHTML = '';
    renderEx();
}

function switchLang(l) {
    document.body.className = 'lang-' + l;
    document.body.dir = l === 'ar' ? 'rtl' : 'ltr';
    renderEx();
}

function closePop() { document.getElementById('guide-pop').style.display = 'none'; }

window.onload = () => { generateExercises(); renderEx(); };

