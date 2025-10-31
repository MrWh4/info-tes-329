const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Database setup
const db = new sqlite3.Database('test_system.db');

// Initialize database tables
db.serialize(() => {
    // Students table
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        journal_number TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        class_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(journal_number, class_name)
    )`);

    // Test results table
    db.run(`CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        score INTEGER NOT NULL,
        total_questions INTEGER DEFAULT 50,
        time_taken INTEGER,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students (id)
    )`);

    // Test questions table
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert sample students for different classes
    const sampleStudents = [
        // 6A sinf
        ['001', 'Akmal', 'Karimov', '6A'],
        ['002', 'Dilnoza', 'Rahimova', '6A'],
        ['003', 'Bobur', 'Toshmatov', '6A'],
        // 6V sinf
        ['001', 'Malika', 'Abdullayeva', '6V'],
        ['002', 'Jasur', 'Normatov', '6V'],
        ['003', 'Zarina', 'Usmonova', '6V'],
        // 9A sinf
        ['001', 'Sardor', 'Alimov', '9A'],
        ['002', 'Nigora', 'Karimova', '9A'],
        ['003', 'Davron', 'Tursunov', '9A'],
        // 9E sinf
        ['001', 'Madina', 'Rahmonova', '9E'],
        ['002', 'Otabek', 'Nazarov', '9E'],
        ['003', 'Gulnoza', 'Yusupova', '9E'],
        // 9V sinf
        ['001', 'Jamshid', 'Qodirov', '9V'],
        ['002', 'Sevara', 'Mirzayeva', '9V'],
        ['003', 'Aziz', 'Salimov', '9V'],
        // 10-E sinf
        ['001', 'Shohruh', 'Abdullayev', '10-E'],
        ['002', 'Kamola', 'Toshmatova', '10-E'],
        ['003', 'Farruh', 'Karimov', '10-E'],
        // 10-J sinf
        ['001', 'Nilufar', 'Rahimova', '10-J'],
        ['002', 'Bekzod', 'Normatov', '10-J'],
        ['003', 'Dildora', 'Usmonova', '10-J'],
        // 10-V sinf
        ['001', 'Rustam', 'Alimov', '10-V'],
        ['002', 'Mohira', 'Karimova', '10-V'],
        ['003', 'Jasur', 'Tursunov', '10-V'],
        // 11A sinf
        ['001', 'Shohida', 'Rahmonova', '11A'],
        ['002', 'Bobur', 'Nazarov', '11A'],
        ['003', 'Feruza', 'Yusupova', '11A'],
        // 11D sinf
        ['001', 'Azamat', 'Qodirov', '11D'],
        ['002', 'Gulshan', 'Mirzayeva', '11D'],
        ['003', 'Nodir', 'Salimov', '11D'],
        // 11J sinf
        ['001', 'Laylo', 'Abdullayeva', '11J'],
        ['002', 'Sanjar', 'Toshmatov', '11J'],
        ['003', 'Munisa', 'Karimova', '11J'],
        // 11V sinf
        ['001', 'Ulugbek', 'Rahimov', '11V'],
        ['002', 'Dilfuza', 'Normatova', '11V'],
        ['003', 'Sardorbek', 'Usmonov', '11V']
    ];

    const stmt = db.prepare("INSERT OR IGNORE INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    sampleStudents.forEach(student => {
        stmt.run(student);
    });
    stmt.finalize();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'info-tes-329-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // 1 hour
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Verify student journal number and class
app.post('/verify-student', (req, res) => {
    const { journalNumber, className } = req.body;
    
    if (!journalNumber || !className) {
        return res.status(400).json({ error: 'Jurnal raqami va sinf nomi kiritilishi shart' });
    }
    
    db.get("SELECT * FROM students WHERE journal_number = ? AND class_name = ?", [journalNumber, className], (err, student) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!student) {
            return res.status(404).json({ error: 'Bu jurnal raqami va sinf kombinatsiyasi topilmadi' });
        }

        // Check if student already took the test
        db.get("SELECT * FROM test_results WHERE student_id = ?", [student.id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result) {
                return res.json({
                    success: true,
                    student: student,
                    hasCompletedTest: true,
                    previousResult: result
                });
            }

            req.session.studentId = student.id;
            res.json({
                success: true,
                student: student,
                hasCompletedTest: false
            });
        });
    });
});

// Get test questions based on student's class level
app.get('/get-questions', (req, res) => {
    if (!req.session.studentId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get student's class to determine question difficulty
    db.get("SELECT class_name FROM students WHERE id = ?", [req.session.studentId], (err, student) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const className = student.class_name;
        let questionQuery;
        
        // Determine question selection based on class level
        if (className.startsWith('10') || className.startsWith('11')) {
            // 10-11 sinflar uchun: 60% murakkab savollar, 40% oddiy savollar
            questionQuery = `
                SELECT id, question_text, option_a, option_b, option_c, option_d 
                FROM (
                    SELECT *, 'advanced' as type FROM questions WHERE id > 51
                    UNION ALL
                    SELECT *, 'basic' as type FROM questions WHERE id <= 51
                ) 
                ORDER BY 
                    CASE 
                        WHEN type = 'advanced' THEN RANDOM() * 0.6
                        ELSE RANDOM() * 0.4
                    END DESC
                LIMIT 50
            `;
        } else {
            // 6-9 sinflar uchun: asosan oddiy savollar, ozgina murakkab
            questionQuery = `
                SELECT id, question_text, option_a, option_b, option_c, option_d 
                FROM (
                    SELECT *, 'basic' as type FROM questions WHERE id <= 51
                    UNION ALL
                    SELECT *, 'advanced' as type FROM questions WHERE id > 51
                ) 
                ORDER BY 
                    CASE 
                        WHEN type = 'basic' THEN RANDOM() * 0.8
                        ELSE RANDOM() * 0.2
                    END DESC
                LIMIT 50
            `;
        }

        db.all(questionQuery, (err, questions) => {
            if (err) {
                console.error('Question selection error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            
            // Remove the 'type' field from response
            const cleanQuestions = questions.map(q => ({
                id: q.id,
                question_text: q.question_text,
                option_a: q.option_a,
                option_b: q.option_b,
                option_c: q.option_c,
                option_d: q.option_d
            }));
            
            res.json({ questions: cleanQuestions, classLevel: className });
        });
    });
});

// Submit test results
app.post('/submit-test', (req, res) => {
    if (!req.session.studentId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { answers, timeTaken } = req.body;
    
    // Calculate score
    db.all("SELECT id, correct_answer FROM questions", (err, questions) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        let score = 0;
        const totalQuestions = Math.min(questions.length, 50);
        
        questions.slice(0, totalQuestions).forEach(question => {
            if (answers[question.id] === question.correct_answer) {
                score += 2; // 2 points per correct answer (50 questions * 2 = 100 points)
            }
        });

        // Save result
        db.run("INSERT INTO test_results (student_id, score, total_questions, time_taken) VALUES (?, ?, ?, ?)",
            [req.session.studentId, score, totalQuestions, timeTaken], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                res.json({
                    success: true,
                    score: score,
                    totalQuestions: totalQuestions,
                    percentage: Math.round((score / 100) * 100)
                });

                // Clear session after test completion
                req.session.destroy();
            });
    });
});

// Get student result
app.get('/get-result/:journalNumber/:className', (req, res) => {
    const { journalNumber, className } = req.params;
    
    db.get(`SELECT s.first_name, s.last_name, s.class_name, tr.score, tr.total_questions, tr.time_taken, tr.completed_at 
            FROM students s 
            JOIN test_results tr ON s.id = tr.student_id 
            WHERE s.journal_number = ? AND s.class_name = ?`, [journalNumber, className], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!result) {
            return res.status(404).json({ error: 'Natija topilmadi' });
        }

        res.json({
            success: true,
            result: {
                ...result,
                percentage: Math.round((result.score / 100) * 100)
            }
        });
    });
});

// Admin routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

// Admin login
app.post('/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (password === '2017') {
        req.session.isAdmin = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Noto\'g\'ri parol' });
    }
});

// Admin panel (protected)
app.get('/admin/panel', (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin');
    }
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Admin logout
app.post('/admin/logout', (req, res) => {
    req.session.isAdmin = false;
    req.session.destroy();
    res.json({ success: true });
});

// Get all results for admin (protected)
app.get('/admin/all-results', (req, res) => {
    if (!req.session.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Get all students
    db.all("SELECT * FROM students ORDER BY class_name, journal_number", (err, students) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Get all test results
        db.all(`SELECT tr.*, s.first_name, s.last_name, s.class_name, s.journal_number 
                FROM test_results tr 
                JOIN students s ON tr.student_id = s.id 
                ORDER BY s.class_name, s.journal_number`, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                success: true,
                students: students,
                results: results
            });
        });
    });
});

// Get statistics for admin (protected)
app.get('/admin/statistics', (req, res) => {
    if (!req.session.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    db.get("SELECT COUNT(*) as total_students FROM students", (err, totalStudents) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        db.get("SELECT COUNT(*) as completed_tests, AVG(score) as average_score FROM test_results", (err, testStats) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            // Get class-wise statistics
        db.all(`SELECT s.class_name, 
                       COUNT(DISTINCT s.id) as total_students,
                       COUNT(DISTINCT tr.student_id) as completed_tests,
                       AVG(tr.score) as average_score
                FROM students s 
                LEFT JOIN test_results tr ON s.id = tr.student_id 
                GROUP BY s.class_name 
                ORDER BY s.class_name`, (err, classStats) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                success: true,
                statistics: {
                    totalStudents: totalStudents.total_students,
                    completedTests: testStats.completed_tests || 0,
                    averageScore: Math.round(testStats.average_score || 0),
                    pendingTests: totalStudents.total_students - (testStats.completed_tests || 0),
                    classStats: classStats.map(stat => ({
                        className: stat.class_name,
                        totalStudents: stat.total_students,
                        completedTests: stat.completed_tests || 0,
                        averageScore: Math.round(stat.average_score || 0),
                        pendingTests: stat.total_students - (stat.completed_tests || 0)
                    }))
                }
            });
        });
    });
});
});

// Test Manager Route (protected)
app.get('/admin/test-manager', (req, res) => {
if (!req.session.isAdmin) {
    return res.redirect('/admin');
}
res.sendFile(path.join(__dirname, 'public', 'test-manager.html'));
});

// Get questions for specific class (protected)
app.get('/admin/class-questions/:className', (req, res) => {
if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
}

const className = req.params.className;
    
// Get questions for the class
db.all(`SELECT cq.*, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer
        FROM class_questions cq 
        JOIN questions q ON cq.question_id = q.id 
        WHERE cq.class_name = ? 
        ORDER BY cq.created_at DESC`, [className], (err, questions) => {
    if (err) {
        return res.status(500).json({ error: 'Database error' });
    }

    // Get statistics
    db.get(`SELECT COUNT(*) as total, 
                   COUNT(CASE WHEN cq.is_active = 1 THEN 1 END) as active,
                   MAX(cq.updated_at) as last_update
            FROM class_questions cq 
            WHERE cq.class_name = ?`, [className], (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({
            success: true,
            questions: questions || [],
            stats: {
                total: stats.total || 0,
                active: stats.active || 0,
                lastUpdate: stats.last_update || null
            }
        });
    });
});
});

// Add question to specific class (protected)
app.post('/admin/add-question', (req, res) => {
if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
}

const { className, questionText, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

if (!className || !questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
    return res.status(400).json({ error: 'Barcha maydonlar to\'ldirilishi kerak' });
}

// First, add the question to the questions table
db.run(`INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer) 
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [questionText, optionA, optionB, optionC, optionD, correctAnswer], 
        function(err) {
    if (err) {
        return res.status(500).json({ error: 'Savol qo\'shishda xatolik' });
    }

    const questionId = this.lastID;

    // Then, link it to the specific class
    db.run(`INSERT INTO class_questions (class_name, question_id, is_active, created_at, updated_at) 
            VALUES (?, ?, 1, datetime('now'), datetime('now'))`, 
            [className, questionId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Savol sinfga bog\'lashda xatolik' });
        }

        res.json({ success: true, message: 'Savol muvaffaqiyatli qo\'shildi' });
    });
});
});

// Delete question from class (protected)
app.delete('/admin/delete-question/:questionId', (req, res) => {
if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
}

const questionId = req.params.questionId;

// Remove from class_questions first
db.run(`DELETE FROM class_questions WHERE question_id = ?`, [questionId], (err) => {
    if (err) {
        return res.status(500).json({ error: 'Savol o\'chirishda xatolik' });
    }

    // Then remove from questions table
    db.run(`DELETE FROM questions WHERE id = ?`, [questionId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Savol o\'chirishda xatolik' });
        }

        res.json({ success: true, message: 'Savol o\'chirildi' });
    });
});
});

app.listen(PORT, () => {
console.log(`INFO TES 329 server running on http://localhost:${PORT}`);
console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
