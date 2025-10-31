const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

const questions = [
    {
        question: "Kompyuterning asosiy qismlari qaysilar?",
        a: "Monitor, klaviatura, sichqoncha",
        b: "Protsessor, xotira, kiritish/chiqarish qurilmalari",
        c: "Printer, skaner, kamera",
        d: "Internet, Wi-Fi, Bluetooth",
        correct: "b"
    },
    {
        question: "RAM nima uchun ishlatiladi?",
        a: "Ma'lumotlarni doimiy saqlash uchun",
        b: "Internetga ulanish uchun",
        c: "Vaqtinchalik ma'lumotlarni saqlash uchun",
        d: "Ovozni chiqarish uchun",
        correct: "c"
    },
    {
        question: "Operatsion tizim nima?",
        a: "Kompyuter o'yini",
        b: "Kompyuter resurslarini boshqaruvchi dastur",
        c: "Internet brauzeri",
        d: "Matn muharriri",
        correct: "b"
    },
    {
        question: "Windows operatsion tizimida fayllarni qidirish uchun qaysi tugma ishlatiladi?",
        a: "Ctrl+F",
        b: "Alt+F4",
        c: "Windows+S",
        d: "Shift+F3",
        correct: "c"
    },
    {
        question: "Microsoft Word dasturida matnni qalin qilish uchun qaysi tugmalar ishlatiladi?",
        a: "Ctrl+B",
        b: "Ctrl+I",
        c: "Ctrl+U",
        d: "Ctrl+S",
        correct: "a"
    },
    {
        question: "Excel dasturida qatorlar qanday belgilanadi?",
        a: "Harflar bilan (A, B, C)",
        b: "Raqamlar bilan (1, 2, 3)",
        c: "Ramzlar bilan (@, #, $)",
        d: "Nuqtalar bilan (...)",
        correct: "b"
    },
    {
        question: "PowerPoint dasturida yangi slayd qo'shish uchun qaysi tugmalar ishlatiladi?",
        a: "Ctrl+N",
        b: "Ctrl+M",
        c: "Ctrl+Shift+N",
        d: "Alt+N",
        correct: "b"
    },
    {
        question: "Internet nima?",
        a: "Kompyuter o'yini",
        b: "Butun dunyo bo'ylab kompyuterlarni bog'laydigan tarmoq",
        c: "Dasturlash tili",
        d: "Fayl formati",
        correct: "b"
    },
    {
        question: "Email manzili qanday ko'rinishda bo'ladi?",
        a: "www.example.com",
        b: "user@example.com",
        c: "http://example.com",
        d: "example.com/user",
        correct: "b"
    },
    {
        question: "Antivirus dasturi nima uchun kerak?",
        a: "Internetni tezlashtirish uchun",
        b: "Fayllarni siqish uchun",
        c: "Viruslardan himoyalanish uchun",
        d: "Ovozni yaxshilash uchun",
        correct: "c"
    },
    {
        question: "CPU ning to'liq nomi nima?",
        a: "Computer Processing Unit",
        b: "Central Processing Unit",
        c: "Core Processing Unit",
        d: "Central Program Unit",
        correct: "b"
    },
    {
        question: "Qattiq disk (Hard Drive) nima uchun ishlatiladi?",
        a: "Ma'lumotlarni doimiy saqlash uchun",
        b: "Internetga ulanish uchun",
        c: "Ovozni chiqarish uchun",
        d: "Rasmlarni ko'rsatish uchun",
        correct: "a"
    },
    {
        question: "USB nima?",
        a: "Dasturlash tili",
        b: "Universal Serial Bus - qurilmalarni ulash standarti",
        c: "Operatsion tizim",
        d: "Internet protokoli",
        correct: "b"
    },
    {
        question: "Ctrl+C tugmalari nima uchun ishlatiladi?",
        a: "Kesish uchun",
        b: "Nusxalash uchun",
        c: "Joylashtirish uchun",
        d: "O'chirish uchun",
        correct: "b"
    },
    {
        question: "Ctrl+V tugmalari nima uchun ishlatiladi?",
        a: "Kesish uchun",
        b: "Nusxalash uchun",
        c: "Joylashtirish uchun",
        d: "Saqlash uchun",
        correct: "c"
    },
    {
        question: "Fayl kengaytmasi .docx qaysi dasturga tegishli?",
        a: "Excel",
        b: "PowerPoint",
        c: "Word",
        d: "Notepad",
        correct: "c"
    },
    {
        question: "Fayl kengaytmasi .xlsx qaysi dasturga tegishli?",
        a: "Excel",
        b: "PowerPoint",
        c: "Word",
        d: "Paint",
        correct: "a"
    },
    {
        question: "Kompyuterni to'g'ri o'chirish uchun nima qilish kerak?",
        a: "Elektr tugmasini bosish",
        b: "Start menyusidan Shut down ni tanlash",
        c: "Kabelni uzish",
        d: "Monitorni o'chirish",
        correct: "b"
    },
    {
        question: "Parol qanday bo'lishi kerak?",
        a: "Oddiy va eslab qolish oson",
        b: "Faqat raqamlardan iborat",
        c: "Murakkab va xavfsiz",
        d: "Faqat harflardan iborat",
        correct: "c"
    },
    {
        question: "Spam nima?",
        a: "Foydali dastur",
        b: "Keraksiz elektron xatlar",
        c: "Kompyuter o'yini",
        d: "Fayl formati",
        correct: "b"
    },
    {
        question: "Backup nima?",
        a: "Kompyuterni tezlashtirish",
        b: "Ma'lumotlarning zaxira nusxasini yaratish",
        c: "Viruslarni o'chirish",
        d: "Internetni sozlash",
        correct: "b"
    },
    {
        question: "Cloud storage nima?",
        a: "Kompyuter xotirasi",
        b: "Internet orqali ma'lumot saqlash xizmati",
        c: "Antivirus dasturi",
        d: "O'yin platformasi",
        correct: "b"
    },
    {
        question: "PDF fayli nima?",
        a: "Rasm fayli",
        b: "Ovoz fayli",
        c: "Hujjat fayli formati",
        d: "Video fayli",
        correct: "c"
    },
    {
        question: "Ctrl+Z tugmalari nima uchun ishlatiladi?",
        a: "Saqlash uchun",
        b: "Bekor qilish (Undo) uchun",
        c: "Nusxalash uchun",
        d: "Yopish uchun",
        correct: "b"
    },
    {
        question: "Wi-Fi nima?",
        a: "Simsiz internet ulanishi",
        b: "Kompyuter o'yini",
        c: "Dasturlash tili",
        d: "Fayl formati",
        correct: "a"
    },
    {
        question: "Bluetooth nima uchun ishlatiladi?",
        a: "Internetga ulanish uchun",
        b: "Qisqa masofada simsiz ulanish uchun",
        c: "Fayllarni siqish uchun",
        d: "Parolni yaratish uchun",
        correct: "b"
    },
    {
        question: "Taskbar Windows da qayerda joylashgan?",
        a: "Ekranning yuqorisida",
        b: "Ekranning o'ng tomonida",
        c: "Ekranning pastida",
        d: "Ekranning chap tomonida",
        correct: "c"
    },
    {
        question: "Recycle Bin nima uchun ishlatiladi?",
        a: "Yangi fayllar yaratish uchun",
        b: "O'chirilgan fayllarni vaqtincha saqlash uchun",
        c: "Internetga ulanish uchun",
        d: "Dasturlarni ishga tushirish uchun",
        correct: "b"
    },
    {
        question: "F5 tugmasi odatda nima uchun ishlatiladi?",
        a: "Saqlash uchun",
        b: "Yangilash (Refresh) uchun",
        c: "Yopish uchun",
        d: "Ochish uchun",
        correct: "b"
    },
    {
        question: "Screenshot nima?",
        a: "Kompyuter o'yini",
        b: "Ekran tasvirini olish",
        c: "Fayl formati",
        d: "Internet xizmati",
        correct: "b"
    },
    {
        question: "Ctrl+Alt+Del tugmalari nima uchun ishlatiladi?",
        a: "Kompyuterni o'chirish uchun",
        b: "Task Manager ni ochish uchun",
        c: "Internetga ulanish uchun",
        d: "Fayl yaratish uchun",
        correct: "b"
    },
    {
        question: "URL nima?",
        a: "Kompyuter nomi",
        b: "Veb-sahifa manzili",
        c: "Fayl hajmi",
        d: "Parol turi",
        correct: "b"
    },
    {
        question: "Browser nima?",
        a: "Matn muharriri",
        b: "Internet sahifalarini ko'rish dasturi",
        c: "O'yin dasturi",
        d: "Antivirus dasturi",
        correct: "b"
    },
    {
        question: "Download nima demak?",
        a: "Faylni yuklash (internetdan kompyuterga)",
        b: "Faylni o'chirish",
        c: "Faylni nusxalash",
        d: "Faylni ochish",
        correct: "a"
    },
    {
        question: "Upload nima demak?",
        a: "Faylni yuklab olish",
        b: "Faylni yuklash (kompyuterdan internetga)",
        c: "Faylni o'chirish",
        d: "Faylni ko'rish",
        correct: "b"
    },
    {
        question: "Firewall nima?",
        a: "O'yin dasturi",
        b: "Xavfsizlik tizimi",
        c: "Matn muharriri",
        d: "Rasm muharriri",
        correct: "b"
    },
    {
        question: "Malware nima?",
        a: "Foydali dastur",
        b: "Zararli dastur",
        c: "O'yin dasturi",
        d: "Operatsion tizim",
        correct: "b"
    },
    {
        question: "Phishing nima?",
        a: "Kompyuter o'yini",
        b: "Shaxsiy ma'lumotlarni o'g'irlash usuli",
        c: "Fayl formati",
        d: "Dasturlash tili",
        correct: "b"
    },
    {
        question: "Cache nima?",
        a: "Vaqtinchalik saqlangan ma'lumotlar",
        b: "Doimiy xotira",
        c: "Internet ulanishi",
        d: "Kompyuter virusi",
        correct: "a"
    },
    {
        question: "Cookie nima?",
        a: "Kompyuter virusi",
        b: "Veb-sayt tomonidan saqlangan kichik fayl",
        c: "O'yin dasturi",
        d: "Antivirus dasturi",
        correct: "b"
    },
    {
        question: "IP address nima?",
        a: "Kompyuterning internet manzili",
        b: "Parol turi",
        c: "Fayl nomi",
        d: "Dastur nomi",
        correct: "a"
    },
    {
        question: "LAN nima?",
        a: "Keng hudud tarmog'i",
        b: "Mahalliy hudud tarmog'i",
        c: "Internet protokoli",
        d: "Fayl formati",
        correct: "b"
    },
    {
        question: "WAN nima?",
        a: "Mahalliy hudud tarmog'i",
        b: "Keng hudud tarmog'i",
        c: "Simsiz tarmoq",
        d: "Kompyuter o'yini",
        correct: "b"
    },
    {
        question: "HTML nima?",
        a: "Dasturlash tili",
        b: "Veb-sahifa yaratish tili",
        c: "Operatsion tizim",
        d: "Fayl formati",
        correct: "b"
    },
    {
        question: "CSS nima uchun ishlatiladi?",
        a: "Veb-sahifa dizaynini yaratish uchun",
        b: "Ma'lumotlar bazasini boshqarish uchun",
        c: "Kompyuterni himoya qilish uchun",
        d: "Fayllarni siqish uchun",
        correct: "a"
    },
    {
        question: "JavaScript nima?",
        a: "Operatsion tizim",
        b: "Veb-sahifalar uchun dasturlash tili",
        c: "Antivirus dasturi",
        d: "Fayl formati",
        correct: "b"
    },
    {
        question: "Database nima?",
        a: "Kompyuter o'yini",
        b: "Ma'lumotlar bazasi",
        c: "Internet brauzeri",
        d: "Matn muharriri",
        correct: "b"
    },
    {
        question: "SQL nima?",
        a: "Ma'lumotlar bazasini boshqarish tili",
        b: "Operatsion tizim",
        c: "Internet protokoli",
        d: "Fayl formati",
        correct: "a"
    },
    {
        question: "Algorithm nima?",
        a: "Kompyuter o'yini",
        b: "Masalani yechish bosqichlari",
        c: "Fayl nomi",
        d: "Internet xizmati",
        correct: "b"
    },
    {
        question: "Programming nima?",
        a: "Kompyuter dasturlari yaratish",
        b: "Internetda qidirish",
        c: "Fayllarni nusxalash",
        d: "Kompyuterni ta'mirlash",
        correct: "a"
    },
    {
        question: "Software nima?",
        a: "Kompyuterning qattiq qismlari",
        b: "Kompyuter dasturlari",
        c: "Internet ulanishi",
        d: "Elektr toki",
        correct: "b"
    }
];

// Clear existing questions and insert new ones
db.serialize(() => {
    db.run("DELETE FROM questions");
    
    const stmt = db.prepare("INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?)");
    
    questions.forEach(q => {
        stmt.run(q.question, q.a, q.b, q.c, q.d, q.correct);
    });
    
    stmt.finalize();
    
    console.log(`${questions.length} ta savol muvaffaqiyatli qo'shildi!`);
});

db.close();
