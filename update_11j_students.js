const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 11J class students...');

// First, remove existing 11J students
db.run("DELETE FROM students WHERE class_name = '11J'", (err) => {
    if (err) {
        console.error('Error removing existing 11J students:', err);
        return;
    }
    
    console.log('Existing 11J students removed');
    
    // Add the real 11J students
    const students11J = [
        ['001', 'Azimbek', 'Abdumo\'minov', '11J'],
        ['002', 'Laylo', 'Muxiddinova', '11J'],
        ['003', 'Boburxon', 'Sobirov', '11J'],
        ['004', 'Izzatilla', 'To\'ychiboyev', '11J'],
        ['005', 'Taxmina', 'Toshmuhammedova', '11J'],
        ['006', 'Xadicha', 'Umirzoqova', '11J'],
        ['007', 'E\'zoza', 'Umriuzoqova', '11J'],
        ['008', 'Abdulaziz', 'Usmonov', '11J'],
        ['009', 'Omina', 'Xamidullayeva', '11J'],
        ['010', 'Xursanoy', 'Xasanboyeva', '11J'],
        ['011', 'Aziza', 'Xasanova', '11J'],
        ['012', 'Abror', 'Xidoyatov', '11J'],
        ['013', 'Mexrangiz', 'Yuldasheva', '11J'],
        ['014', 'Aslbek', 'Shakarov', '11J']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students11J.forEach(student => {
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
            console.log(`Successfully added ${students11J.length} students to 11J class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '11J' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n11J Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
