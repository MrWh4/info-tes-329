const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

db.serialize(() => {
    // Students table
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        journal_number TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

    // Insert sample students
    const sampleStudents = [
        ['001', 'Akmal', 'Karimov'],
        ['002', 'Dilnoza', 'Rahimova'],
        ['003', 'Bobur', 'Toshmatov'],
        ['004', 'Malika', 'Abdullayeva'],
        ['005', 'Jasur', 'Normatov']
    ];

    const stmt = db.prepare("INSERT OR IGNORE INTO students (journal_number, first_name, last_name) VALUES (?, ?, ?)");
    sampleStudents.forEach(student => {
        stmt.run(student);
    });
    stmt.finalize();

    console.log('Database initialized successfully!');
});

db.close();
