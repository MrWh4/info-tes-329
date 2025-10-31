const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 6A class students...');

// First, remove existing 6A students
db.run("DELETE FROM students WHERE class_name = '6A'", (err) => {
    if (err) {
        console.error('Error removing existing 6A students:', err);
        return;
    }
    
    console.log('Existing 6A students removed');
    
    // Add the real 6A students
    const students6A = [
        ['001', 'Soliha', 'Ilhomjonova', '6A'],
        ['002', 'Soliha', 'Mamadaliyeva', '6A'],
        ['003', 'Husanxoʻja', 'Maxkamov', '6A'],
        ['004', 'Muhammad Sodiq', 'Nozimjonov', '6A'],
        ['005', 'Zahroxon', 'Olimova', '6A'],
        ['006', 'Oysha', 'Ramazanova', '6A'],
        ['007', 'Jasmina', 'Saitkulova', '6A'],
        ['008', 'Yusufbek', 'Solixov', '6A'],
        ['009', 'Manzura', 'Tulqinova', '6A'],
        ['010', 'Mustafo', 'Tursunboyev', '6A'],
        ['011', 'Mubina', 'Vosiqova', '6A'],
        ['012', 'Mumtozbegim', 'Xasanboyeva', '6A'],
        ['013', 'Shirinoy', 'Xikmatullayeva', '6A'],
        ['014', 'Shahrizoda', 'Shokirova', '6A'],
        ['015', 'Shohjahon', 'Choriyev', '6A']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students6A.forEach(student => {
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
            console.log(`Successfully added ${students6A.length} students to 6A class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '6A' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n6A Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
