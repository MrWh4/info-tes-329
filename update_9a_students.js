const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 9A class students...');

// First, remove existing 9A students
db.run("DELETE FROM students WHERE class_name = '9A'", (err) => {
    if (err) {
        console.error('Error removing existing 9A students:', err);
        return;
    }
    
    console.log('Existing 9A students removed');
    
    // Add the real 9A students
    const students9A = [
        ['001', 'Jasur', 'Abdujalilov', '9A'],
        ['002', 'Azizbek', 'Abduraxmanov', '9A'],
        ['003', 'Odinabonubonu', 'Abdusalomova', '9A'],
        ['004', 'Abdurahmon', 'Baxtiyorov', '9A'],
        ['005', 'Muslima', 'Erkinbayeva', '9A'],
        ['006', 'Munisa', 'Erkinova', '9A'],
        ['007', 'Farida', 'Fayziyeva', '9A'],
        ['008', 'Ziyoda', 'Fayziyeva', '9A'],
        ['009', 'Farangiz', 'Ilxomova', '9A'],
        ['010', 'Visola', 'Isokova', '9A'],
        ['011', 'Farangiz', 'Komiljonova', '9A'],
        ['012', 'Gо\'Zal', 'Madiyeva', '9A'],
        ['013', 'Shahrizoda', 'Maxamadjonova', '9A'],
        ['014', 'Saidbek', 'Odiljonov', '9A'],
        ['015', 'Bexruzxon', 'Sobirov', '9A'],
        ['016', 'Sarvar', 'Tohirjonov', '9A'],
        ['017', 'Bibisora', 'Turayeva', '9A'],
        ['018', 'Muhammadjon', 'Yodgorov', '9A'],
        ['019', 'Abduvosid', 'Zuhritdinov', '9A'],
        ['020', 'Mubinabonu', 'Choriyeva', '9A']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students9A.forEach(student => {
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
            console.log(`Successfully added ${students9A.length} students to 9A class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '9A' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n9A Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
