const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 9E class students...');

// First, remove existing 9E students
db.run("DELETE FROM students WHERE class_name = '9E'", (err) => {
    if (err) {
        console.error('Error removing existing 9E students:', err);
        return;
    }
    
    console.log('Existing 9E students removed');
    
    // Add the real 9E students
    const students9E = [
        ['001', 'Hasan', 'Nematov', '9E'],
        ['002', 'Zuhra', 'Nematova', '9E'],
        ['003', 'Muxammadsolih', 'Otamuxamedov', '9E'],
        ['004', 'Arslonbek', 'Quchqarov', '9E'],
        ['005', 'Saiazimxo\'ja', 'Saidanvarxo\'jaev', '9E'],
        ['006', 'Muxlisa', 'Sanjarova', '9E'],
        ['007', 'Kamronbek', 'Toraboev', '9E'],
        ['008', 'Ozodbek', 'To\'qinov', '9E'],
        ['009', 'Abdulloh', 'Ulugbekov', '9E'],
        ['010', 'Maqsudbek', 'Uralov', '9E'],
        ['011', 'Farrux', 'Xaitboyev', '9E'],
        ['012', 'Go\'zalxon', 'Xayrullaeva', '9E'],
        ['013', 'Ezoza', 'Xolmatjonova', '9E'],
        ['014', 'Munavvar', 'Xudoyberdiyeva', '9E'],
        ['015', 'Oyimjon', 'Yarasheva', '9E'],
        ['016', 'Muslima', 'Yusupova', '9E'],
        ['017', 'Kamronbek', 'G\'apporov', '9E'],
        ['018', 'Robiya', 'Shukurillayeva', '9E']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students9E.forEach(student => {
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
            console.log(`Successfully added ${students9E.length} students to 9E class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '9E' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n9E Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
