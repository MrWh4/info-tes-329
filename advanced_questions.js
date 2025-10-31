const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

// 10-11 sinflar uchun murakkab savollar
const advancedQuestions = [
    // Dasturlash asoslari
    {
        question: "Python dasturlash tilida quyidagi kod natijasi qanday bo'ladi?\nfor i in range(3):\n    print(i * 2)",
        a: "0, 2, 4",
        b: "2, 4, 6", 
        c: "1, 2, 3",
        d: "0, 1, 2",
        correct: "a"
    },
    {
        question: "Algoritmning qaysi xususiyati uning har qanday kiritish ma'lumotlari uchun chekli vaqt ichida tugashini kafolatlaydi?",
        a: "Aniqlik",
        b: "Cheklillik",
        c: "Umumiylik",
        d: "Samaradorlik",
        correct: "b"
    },
    {
        question: "Binary search algoritmi eng yomon holatda necha marta taqqoslash amalga oshiradi (n elementli massivda)?",
        a: "n",
        b: "n/2",
        c: "log₂(n)",
        d: "n²",
        correct: "c"
    },
    {
        question: "Quyidagi HTML kodda nima noto'g'ri?\n<img src='rasm.jpg' alt='Rasm' width=100>",
        a: "width atributi qiymati qo'shtirnoqda emas",
        b: "img tegi yopilmagan",
        c: "src atributi noto'g'ri",
        d: "Hech narsa noto'g'ri emas",
        correct: "a"
    },
    {
        question: "CSS da 'position: absolute' qanday ishlaydi?",
        a: "Element o'z joyida qoladi",
        b: "Element eng yaqin positioned parent ga nisbatan joylashadi",
        c: "Element faqat yuqoridan joylashadi",
        d: "Element ko'rinmay qoladi",
        correct: "b"
    },
    {
        question: "JavaScript da '==' va '===' operatorlari orasidagi farq nima?",
        a: "Farq yo'q",
        b: "'==' faqat qiymatni, '===' qiymat va turni tekshiradi",
        c: "'===' faqat sonlar uchun ishlatiladi",
        d: "'==' tezroq ishlaydi",
        correct: "b"
    },
    {
        question: "Ma'lumotlar bazasida PRIMARY KEY nima uchun ishlatiladi?",
        a: "Ma'lumotlarni saralash uchun",
        b: "Har bir qatorni noyob identifikatsiya qilish uchun",
        c: "Ma'lumotlarni shifrlash uchun",
        d: "Jadval nomini belgilash uchun",
        correct: "b"
    },
    {
        question: "SQL da INNER JOIN nima qiladi?",
        a: "Barcha qatorlarni birlashtiradi",
        b: "Faqat mos kelgan qatorlarni qaytaradi",
        c: "Faqat birinchi jadval qatorlarini qaytaradi",
        d: "Ma'lumotlarni o'chiradi",
        correct: "b"
    },
    {
        question: "Kompyuter tarmog'ida IP address nima?",
        a: "Internet parol",
        b: "Kompyuterning noyob manzili",
        c: "Internet protokol",
        d: "Fayl nomi",
        correct: "b"
    },
    {
        question: "TCP va UDP protokollari orasidagi asosiy farq nima?",
        a: "TCP tezroq, UDP sekinroq",
        b: "TCP ishonchli, UDP ishonchsiz",
        c: "UDP yangi, TCP eski",
        d: "Farq yo'q",
        correct: "b"
    },
    {
        question: "Kriptografiyada 'hash function' nima uchun ishlatiladi?",
        a: "Ma'lumotlarni siqish uchun",
        b: "Ma'lumotlarni shifrlash uchun",
        c: "Ma'lumotlar yaxlitligini tekshirish uchun",
        d: "Ma'lumotlarni o'chirish uchun",
        correct: "c"
    },
    {
        question: "Big O notation O(n²) nimani bildiradi?",
        a: "Algoritm doimo n² vaqt oladi",
        b: "Algoritm eng yomon holatda n² ga proporsional vaqt oladi",
        c: "Algoritm n² xotira ishlatadi",
        d: "Algoritm n² marta takrorlanadi",
        correct: "b"
    },
    {
        question: "Stack ma'lumotlar strukturasida qaysi printsip qo'llaniladi?",
        a: "FIFO (First In, First Out)",
        b: "LIFO (Last In, First Out)",
        c: "Random access",
        d: "Sequential access",
        correct: "b"
    },
    {
        question: "Rekursiv funksiya nima?",
        a: "O'zini chaqiradigan funksiya",
        b: "Takrorlanadigan funksiya",
        c: "Matematik funksiya",
        d: "Tez ishlaydigan funksiya",
        correct: "a"
    },
    {
        question: "Object-Oriented Programming da 'Encapsulation' nima?",
        a: "Ma'lumotlarni yashirish va himoya qilish",
        b: "Klasslarni meros qilish",
        c: "Bir nechta shaklga ega bo'lish",
        d: "Obyektlarni yaratish",
        correct: "a"
    },
    {
        question: "Git version control sistemida 'commit' nima qiladi?",
        a: "Fayllarni o'chiradi",
        b: "O'zgarishlarni saqlaydi",
        c: "Loyihani ishga tushiradi",
        d: "Internetga yuklaydi",
        correct: "b"
    },
    {
        question: "API (Application Programming Interface) nima?",
        a: "Dasturlash tili",
        b: "Dasturlar o'rtasida aloqa o'rnatish usuli",
        c: "Ma'lumotlar bazasi",
        d: "Kompyuter tarmog'i",
        correct: "b"
    },
    {
        question: "Machine Learning da 'supervised learning' nima?",
        a: "Nazorat ostida o'rganish",
        b: "Belgilangan ma'lumotlar bilan o'rganish",
        c: "Tez o'rganish",
        d: "Avtomatik o'rganish",
        correct: "b"
    },
    {
        question: "Cloud Computing ning asosiy afzalligi nima?",
        a: "Arzon narx",
        b: "Moslashuvchanlik va masshtablanish",
        c: "Tezlik",
        d: "Xavfsizlik",
        correct: "b"
    },
    {
        question: "Cybersecurity da 'phishing' hujumi nima?",
        a: "Kompyuterni buzish",
        b: "Aldab shaxsiy ma'lumotlarni o'g'irlash",
        c: "Internetni to'xtatish",
        d: "Fayllarni o'chirish",
        correct: "b"
    },
    {
        question: "Blockchain texnologiyasining asosiy xususiyati nima?",
        a: "Tezlik",
        b: "Markazlashtirilmaganlik va o'zgarmaslik",
        c: "Arzonlik",
        d: "Soddalik",
        correct: "b"
    },
    {
        question: "Artificial Intelligence va Machine Learning orasidagi farq nima?",
        a: "Farq yo'q",
        b: "AI kengroq tushuncha, ML uning bir qismi",
        c: "ML yangi, AI eski",
        d: "AI faqat robotlar uchun",
        correct: "b"
    },
    {
        question: "Agile dasturlash metodologiyasining asosiy printsipi nima?",
        a: "Uzun muddatli rejalashtirish",
        b: "Takroriy va moslashuvchan rivojlantirish",
        c: "Bir marta yozish",
        d: "Faqat dokumentatsiya",
        correct: "b"
    },
    {
        question: "DevOps nima?",
        a: "Dasturlash tili",
        b: "Development va Operations jarayonlarini birlashtirish",
        c: "Ma'lumotlar bazasi",
        d: "Operatsion tizim",
        correct: "b"
    },
    {
        question: "Microservices arxitekturasining afzalligi nima?",
        a: "Soddalik",
        b: "Mustaqil rivojlantirish va deploy qilish",
        c: "Kam xotira ishlatish",
        d: "Tez ishlash",
        correct: "b"
    },
    {
        question: "Docker konteynerizatsiyasining maqsadi nima?",
        a: "Dasturlarni izolyatsiya qilish va portable qilish",
        b: "Fayllarni siqish",
        c: "Internetga ulanish",
        d: "Ma'lumotlarni shifrlash",
        correct: "a"
    },
    {
        question: "NoSQL ma'lumotlar bazalarining SQL bazalardan farqi nima?",
        a: "Tezroq ishlaydi",
        b: "Moslashuvchan sxema va horizontal masshtablash",
        c: "Yangi texnologiya",
        d: "Faqat matn saqlaydi",
        correct: "b"
    },
    {
        question: "REST API ning asosiy printsipi nima?",
        a: "Stateless va HTTP metodlaridan foydalanish",
        b: "Faqat GET so'rovlari",
        c: "XML formatida ma'lumot",
        d: "Faqat POST so'rovlari",
        correct: "a"
    },
    {
        question: "Responsive web design nima?",
        a: "Tez yuklanadigan sayt",
        b: "Turli ekran o'lchamlariga moslashadigan dizayn",
        c: "Chiroyli dizayn",
        d: "Interaktiv sayt",
        correct: "b"
    },
    {
        question: "MVC (Model-View-Controller) pattern nima uchun ishlatiladi?",
        a: "Kodni tashkil qilish va ajratish uchun",
        b: "Tezlikni oshirish uchun",
        c: "Xotira tejash uchun",
        d: "Xavfsizlik uchun",
        correct: "a"
    }
];

console.log('10-11 sinflar uchun murakkab savollar qo\'shilmoqda...');

db.serialize(() => {
    // Avval mavjud savollarni saqlab qolish uchun ularni ko'rib chiqamiz
    db.get("SELECT COUNT(*) as count FROM questions", (err, result) => {
        if (err) {
            console.error('Xatolik:', err);
            return;
        }
        
        console.log(`Hozirda ${result.count} ta savol mavjud`);
        
        // Yangi murakkab savollarni qo'shish
        const stmt = db.prepare("INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?)");
        
        let addedCount = 0;
        advancedQuestions.forEach(q => {
            stmt.run(q.question, q.a, q.b, q.c, q.d, q.correct, (err) => {
                if (err) {
                    console.error('Savol qo\'shishda xatolik:', err);
                } else {
                    addedCount++;
                }
            });
        });
        
        stmt.finalize(() => {
            console.log(`${addedCount} ta murakkab savol muvaffaqiyatli qo'shildi!`);
            
            // Jami savollar sonini tekshirish
            db.get("SELECT COUNT(*) as count FROM questions", (err, finalResult) => {
                if (err) {
                    console.error('Xatolik:', err);
                } else {
                    console.log(`Jami savollar soni: ${finalResult.count}`);
                }
                db.close();
            });
        });
    });
});
