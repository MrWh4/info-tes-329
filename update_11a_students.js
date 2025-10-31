const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 11A class students...');

// First, remove existing 11A students
db.run("DELETE FROM students WHERE class_name = '11A'", (err) => {
    if (err) {
        console.error('Error removing existing 11A students:', err);
        return;
    }
    
    console.log('Existing 11A students removed');
    
    // Add the real 11A students
    const students11A = [
        ['001', 'Otabek', 'Abduraupov', '11A'],
        ['002', 'Omina', 'Dilmurodova', '11A'],
        ['003', 'Xonzoda', 'Nazarova', '11A'],
        ['004', 'Mushtariybonu', 'Obidova', '11A'],
        ['005', 'Firdavs', 'Olimjonov', '11A'],
        ['006', 'Murot', 'Olimov', '11A'],
        ['007', 'Abdug\'ani', 'Qobiljonov', '11A'],
        ['008', 'Davron', 'Rahmatjonov', '11A'],
        ['009', 'Sardor', 'Raxmatjonov', '11A'],
        ['010', 'Shahzod', 'Saidov', '11A'],
        ['011', 'Ibrohim', 'Sodiqov', '11A'],
        ['012', 'Mirjalol', 'Tursunqulov', '11A'],
        ['013', 'Nafisa', 'Valixonova', '11A'],
        ['014', 'Akrom', 'Xasanov', '11A'],
        ['015', 'Ziyodulla', 'Xodjakbarov', '11A'],
        ['016', 'Behruz', 'Xodjiyev', '11A'],
        ['017', 'Muslima', 'Yoqubjonova', '11A'],
        ['018', 'Abdulloh', 'Sharipov', '11A'],
        ['019', 'Sardor', 'Shermatov', '11A']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students11A.forEach(student => {
        stmt.run(student, (err) => {
            if (err) {
                console.error('Error inserting student:', student, err);
            }
        });
    });
    
    stmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statement:', err);
        } else {
            console.log(`Successfully added ${students11A.length} students to 11A class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '11A' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n11A Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
