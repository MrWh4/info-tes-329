const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 11V class students...');

// First, remove existing 11V students
db.run("DELETE FROM students WHERE class_name = '11V'", (err) => {
    if (err) {
        console.error('Error removing existing 11V students:', err);
        return;
    }
    
    console.log('Existing 11V students removed');
    
    // Add the real 11V students
    const students11V = [
        ['001', 'Zarifa', 'G\'ayratova', '11V'],
        ['002', 'Isroil', 'Hamidullayev', '11V'],
        ['003', 'Asadbek', 'Mirodilov', '11V'],
        ['004', 'Javohir', 'Mirzayev', '11V'],
        ['005', 'Muslima', 'Muxamedshukurova', '11V'],
        ['006', 'Diyora', 'Nig\'matova', '11V'],
        ['007', 'Muslima', 'Nosirova', '11V'],
        ['008', 'Xosiyat', 'Sa\'dullayeva', '11V'],
        ['009', 'Sohibaxon', 'Saydazimova', '11V'],
        ['010', 'Sunnatjon', 'Teshabaev', '11V'],
        ['011', 'Saidali', 'Tojiddinov', '11V'],
        ['012', 'Xurshid', 'Ubaydullayev', '11V'],
        ['013', 'Ibrohim', 'Xabibullayev', '11V'],
        ['015', 'Abdulaziz', 'Xayrullayev', '11V'],
        ['016', 'Shaxriyor', 'Xodjaniyozov', '11V'],
        ['017', 'Diyora', 'Yuldasheva', '11V'],
        ['018', 'Zilola', 'Zikriyayeva', '11V']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students11V.forEach(student => {
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
            console.log(`Successfully added ${students11V.length} students to 11V class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '11V' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n11V Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
