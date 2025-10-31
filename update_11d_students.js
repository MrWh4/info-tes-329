const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 11D class students...');

// First, remove existing 11D students
db.run("DELETE FROM students WHERE class_name = '11D'", (err) => {
    if (err) {
        console.error('Error removing existing 11D students:', err);
        return;
    }
    
    console.log('Existing 11D students removed');
    
    // Add the real 11D students
    const students11D = [
        ['001', 'Muhammadrizo', 'Abdumalikov', '11D'],
        ['002', 'Munavvara', 'Abdumannonova', '11D'],
        ['003', 'Samira', 'Ikromjonova', '11D'],
        ['004', 'Sarvarbek', 'Sadiqov', '11D'],
        ['005', 'Shohruh', 'Sanjarov', '11D'],
        ['006', 'Umarjon', 'Sobitjonov', '11D'],
        ['007', 'Mavluda', 'Sobitjonova', '11D'],
        ['008', 'Omina', 'Sobitjonova', '11D'],
        ['009', 'Madinabonu', 'Tursunboyeva', '11D'],
        ['010', 'Mo\'mina', 'Tursunova', '11D'],
        ['011', 'Sa\'dulloh', 'Turg\'unbekov', '11D'],
        ['012', 'Hasanjon', 'Usmonov', '11D'],
        ['013', 'Mirabbos', 'Usmonov', '11D'],
        ['014', 'Botir', 'Yusupbayev', '11D'],
        ['015', 'Muhammadjon', 'Ziyovuddinov', '11D'],
        ['016', 'Madina', 'O\'rolova', '11D']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students11D.forEach(student => {
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
            console.log(`Successfully added ${students11D.length} students to 11D class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '11D' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n11D Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
