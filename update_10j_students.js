const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 10-J class students...');

// First, remove existing 10-J students
db.run("DELETE FROM students WHERE class_name = '10-J'", (err) => {
    if (err) {
        console.error('Error removing existing 10-J students:', err);
        return;
    }
    
    console.log('Existing 10-J students removed');
    
    // Add the real 10-J students
    const students10J = [
        ['001', 'Muxamamd', 'Isonqulov', '10-J'],
        ['002', 'Shoxjahon', 'Mengliboyev', '10-J'],
        ['003', 'Ezozaxon', 'Nurullayeva', '10-J'],
        ['004', 'Orif', 'Obidov', '10-J'],
        ['005', 'Bexruz', 'Rajabboyev', '10-J'],
        ['006', 'Ibrohimjon', 'Raxmatov', '10-J'],
        ['007', 'Munisxon', 'Rustamova', '10-J'],
        ['008', 'Shaxinabegim', 'Sabirova', '10-J'],
        ['009', 'Sarvarbek', 'Saburov', '10-J'],
        ['010', 'Madina', 'Samandarova', '10-J'],
        ['011', 'Shirin', 'Sayfuddinova', '10-J'],
        ['012', 'Mirfayz', 'To\'rayev', '10-J'],
        ['013', 'Zubayr', 'Umarov', '10-J'],
        ['014', 'Kamilaxon', 'Xajiabdulkarimova', '10-J'],
        ['015', 'Qurbonmurod', 'Xamrayev', '10-J'],
        ['016', 'Abdulbosit', 'Yusupov', '10-J'],
        ['017', 'Sardor', 'Zarifov', '10-J'],
        ['018', 'Jasurbek', 'Shavkatov', '10-J']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students10J.forEach(student => {
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
            console.log(`Successfully added ${students10J.length} students to 10-J class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '10-J' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n10-J Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
