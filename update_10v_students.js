const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 10V class students...');

// First, remove existing 10V students
db.run("DELETE FROM students WHERE class_name = '10V'", (err) => {
    if (err) {
        console.error('Error removing existing 10V students:', err);
        return;
    }
    
    console.log('Existing 10V students removed');
    
    // Add the real 10V students
    const students10V = [
        ['001', 'Abduazim', 'Abdug`aniyev', '10V'],
        ['002', 'Islom', 'Abdug`aniyev', '10V'],
        ['003', 'Mubina', 'Abdullayeva', '10V'],
        ['004', 'Abdunabi', 'Abdumannopov', '10V'],
        ['005', 'Zarina', 'Abduraufova', '10V'],
        ['006', 'Moxina', 'Abduraxmonova', '10V'],
        ['007', 'Zuxra', 'Abduxalilova', '10V'],
        ['008', 'Zafar', 'Alimov', '10V'],
        ['009', 'Nasiba', 'Axmedova', '10V'],
        ['010', 'Husniyor', 'Azimboyev', '10V'],
        ['011', 'Rashidbek', 'Bahtiyorov', '10V'],
        ['012', 'Muhammadsodiq', 'Bozorboyev', '10V'],
        ['013', 'Halilulox', 'Ergashev', '10V'],
        ['014', 'Shuxratjon', 'Ibodullayev', '10V'],
        ['015', 'Muslima', 'Ibrohimova', '10V'],
        ['016', 'Muhammadsodiq', 'Jumamurodov', '10V'],
        ['017', 'Madina', 'Jo`rayeva', '10V'],
        ['018', 'Baxtiyorjon', 'Karimov', '10V'],
        ['019', 'E`zoza', 'Komilova', '10V'],
        ['020', 'Sarvarbek', 'Mamatov', '10V'],
        ['021', 'Samandar', 'Mirzoxidov', '10V'],
        ['022', 'Nurzod', 'Nurillayev', '10V'],
        ['023', 'Madinaxon', 'Olimxo`jayeva', '10V'],
        ['024', 'Ibrohim', 'Rixsiboyev', '10V'],
        ['025', 'Odilxon', 'Saydazimov', '10V'],
        ['026', 'Maxmud', 'Saydullayev', '10V'],
        ['027', 'Abdurahmon', 'Turdiyev', '10V'],
        ['028', 'Sevinch', 'To`lqinova', '10V'],
        ['029', 'Mubinabonu', 'Umaraliyeva', '10V'],
        ['030', 'Sherali', 'Xabibullayev', '10V'],
        ['031', 'Ibroximbek', 'Xoldorbekov', '10V'],
        ['032', 'Behzodbek', 'Xolmo`minov', '10V'],
        ['033', 'Abduvalixo`ja', 'Xusanxo`jayev', '10V'],
        ['034', 'Abdulloh', 'Yatimov', '10V'],
        ['035', 'Fayoz', 'Zokirov', '10V'],
        ['036', 'Islombek', 'Shodiyev', '10V']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students10V.forEach(student => {
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
            console.log(`Successfully added ${students10V.length} students to 10V class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '10V' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n10V Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
