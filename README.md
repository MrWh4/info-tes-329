# INFO TES 329 - Informatika Test Tizimi

Bu loyiha INFO TES 329 kursi uchun informatika test tizimi hisoblanadi.

## Xususiyatlari

- **Talaba kirishi**: Jurnal raqami orqali tekshirish
- **50 savollik test**: Har bir test 50 ta savoldan iborat
- **50 daqiqalik vaqt**: Har bir test uchun 50 daqiqa vaqt beriladi
- **100 ballik tizim**: Har bir to'g'ri javob uchun 2 ball
- **Natijalarni saqlash**: Talabalar o'z natijalarini ko'rishlari mumkin
- **Qayta topshirish oldini olish**: Har bir talaba faqat bir marta test topshirishi mumkin

## O'rnatish

1. **Node.js ni o'rnating** (agar o'rnatilmagan bo'lsa)

2. **Loyihani klonlang yoki yuklab oling**

3. **Bog'liqliklarni o'rnating**:
   ```bash
   npm install
   ```

4. **Ma'lumotlar bazasini to'ldiring**:
   ```bash
   node populate_questions.js
   ```

5. **Serverni ishga tushiring**:
   ```bash
   npm start
   ```
   
   Yoki development rejimida:
   ```bash
   npm run dev
   ```

6. **Brauzerda ochish**:
   http://localhost:3000 manzilini oching

## Foydalanish

### Talabalar uchun:
1. Jurnal raqamingizni kiriting
2. "Tekshirish" tugmasini bosing
3. Ism-familyangiz ko'rinadi
4. "Testni Boshlash" tugmasini bosing
5. 50 daqiqa ichida 50 ta savolga javob bering
6. Natijangizni ko'ring

### Test ma'lumotlari:
- **Talabalar**: 001, 002, 003, 004, 005 (test uchun)
- **Savollar**: 50 ta informatika savoli
- **Vaqt**: 50 daqiqa
- **Ball**: 100 ball (har bir to'g'ri javob 2 ball)

## Texnik ma'lumotlar

- **Backend**: Node.js, Express.js
- **Ma'lumotlar bazasi**: SQLite3
- **Frontend**: HTML, CSS (TailwindCSS), JavaScript
- **Sessiya boshqaruvi**: Express-session

## Fayl tuzilishi

```
informatika test/
├── server.js              # Asosiy server fayli
├── package.json           # Loyiha konfiguratsiyasi
├── populate_questions.js  # Savollarni yuklash skripti
├── test_system.db        # SQLite ma'lumotlar bazasi
├── public/
│   ├── index.html        # Asosiy HTML sahifa
│   ├── script.js         # Frontend JavaScript
│   └── styles.css        # CSS stillari
└── README.md             # Bu fayl
```

## Ma'lumotlar bazasi tuzilishi

### students jadval:
- id (PRIMARY KEY)
- journal_number (UNIQUE)
- first_name
- last_name
- created_at

### questions jadval:
- id (PRIMARY KEY)
- question_text
- option_a, option_b, option_c, option_d
- correct_answer
- created_at

### test_results jadval:
- id (PRIMARY KEY)
- student_id (FOREIGN KEY)
- score
- total_questions
- time_taken
- completed_at

## Xavfsizlik

- Sessiya boshqaruvi
- Talabalarning qayta test topshirishini oldini olish
- Ma'lumotlar bazasi SQL injection himoyasi
- Vaqt cheklovi

## Qo'llab-quvvatlash

Muammolar yoki savollar bo'lsa, loyiha administratori bilan bog'laning.

---
**INFO TES 329** - Informatika Test Tizimi
