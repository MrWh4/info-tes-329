const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Class Questions jadvali yaratilmoqda...');

db.serialize(() => {
    // Create class_questions table
    db.run(`CREATE TABLE IF NOT EXISTS class_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_name TEXT NOT NULL,
        question_id INTEGER NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
        UNIQUE(class_name, question_id)
    )`, (err) => {
        if (err) {
            console.error('Jadval yaratishda xatolik:', err);
        } else {
            console.log('✅ class_questions jadvali muvaffaqiyatli yaratildi');
        }
    });

    // Create index for better performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_class_questions_class 
            ON class_questions(class_name)`, (err) => {
        if (err) {
            console.error('Index yaratishda xatolik:', err);
        } else {
            console.log('✅ Index muvaffaqiyatli yaratildi');
        }
    });

    // Populate with existing questions for all classes
    const classes = ['6A', '6V', '9A', '9E', '9V', '10-E', '10-J', '10-V', '11A', '11D', '11J', '11V'];
    
    db.all("SELECT id FROM questions", (err, questions) => {
        if (err) {
            console.error('Savollarni olishda xatolik:', err);
            db.close();
            return;
        }

        console.log(`${questions.length} ta savol topildi`);
        
        let insertCount = 0;
        const totalInserts = classes.length * questions.length;

        classes.forEach(className => {
            questions.forEach(question => {
                db.run(`INSERT OR IGNORE INTO class_questions 
                        (class_name, question_id, is_active, created_at, updated_at) 
                        VALUES (?, ?, 1, datetime('now'), datetime('now'))`, 
                        [className, question.id], (err) => {
                    insertCount++;
                    
                    if (err) {
                        console.error(`${className} sinfi uchun savol ${question.id} qo'shishda xatolik:`, err);
                    }
                    
                    if (insertCount === totalInserts) {
                        console.log(`✅ Barcha sinflar uchun savollar muvaffaqiyatli qo'shildi`);
                        console.log(`Jami: ${totalInserts} ta bog'lanish yaratildi`);
                        
                        // Show statistics
                        db.get("SELECT COUNT(*) as total FROM class_questions", (err, result) => {
                            if (!err) {
                                console.log(`📊 Jami class_questions yozuvlari: ${result.total}`);
                            }
                            db.close();
                        });
                    }
                });
            });
        });

        if (questions.length === 0) {
            console.log('⚠️  Hech qanday savol topilmadi');
            db.close();
        }
    });
});
