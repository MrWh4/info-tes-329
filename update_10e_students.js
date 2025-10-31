const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Updating 10-E class students...');

// First, remove existing 10-E students
db.run("DELETE FROM students WHERE class_name = '10-E'", (err) => {
    if (err) {
        console.error('Error removing existing 10-E students:', err);
        return;
    }
    
    console.log('Existing 10-E students removed');
    
    // Add the real 10-E students
    const students10E = [
        ['001', 'Soliha', 'Abduazizova', '10-E'],
        ['002', 'Nilufarxon', 'Abdullayeva', '10-E'],
        ['003', 'Zulxumor', 'Abdullayeva', '10-E'],
        ['004', 'Inobat', 'Abdug\'ofurova', '10-E'],
        ['005', 'Sarafroz', 'Alimjonova', '10-E'],
        ['006', 'Aslbek', 'Asatillayev', '10-E'],
        ['007', 'Fozilxon', 'Azizov', '10-E'],
        ['008', 'Durdona', 'Erdasheva', '10-E'],
        ['009', 'Durdona', 'Fazliddinova', '10-E'],
        ['010', 'Saodat', 'Gafurjonova', '10-E'],
        ['011', 'Xadicha', 'Ganjiyeva', '10-E'],
        ['012', 'Sarvinoz', 'Hamdamova', '10-E'],
        ['013', 'Azizullox', 'Imomov', '10-E'],
        ['014', 'Diyora', 'Karimova', '10-E'],
        ['015', 'Shoxrux', 'Mannopov', '10-E'],
        ['016', 'Zarina', 'Mardiyeva', '10-E'],
        ['017', 'Zilolaxon', 'Mirg\'iyosova', '10-E'],
        ['018', 'Muzaffar', 'Mirolimov', '10-E'],
        ['019', 'Xalima', 'Mirzayeva', '10-E'],
        ['020', 'Muharram', 'Mohirjonova', '10-E'],
        ['021', 'Sultonxon', 'Niyazmetov', '10-E'],
        ['022', 'Parizoda', 'Qilcheva', '10-E'],
        ['023', 'Mubina', 'Qobilova', '10-E'],
        ['024', 'Go\'zal', 'Raximova', '10-E'],
        ['025', 'Saidamirxon', 'Raximto\'rayev', '10-E'],
        ['026', 'Azizbek', 'Sayfiddinov', '10-E'],
        ['027', 'Karomiddin', 'Tuliboyev', '10-E'],
        ['028', 'Zebo', 'Tursunboyeva', '10-E'],
        ['029', 'Rasulbek', 'To\'lqinov', '10-E'],
        ['030', 'Rahmatillo', 'To\'ychiboyev', '10-E'],
        ['031', 'Abdulbosit', 'Umarjonov', '10-E'],
        ['032', 'Jamshidbek', 'Umbarov', '10-E'],
        ['033', 'Nozima', 'Uralova', '10-E'],
        ['034', 'Firdavsbek', 'Xudoyqulov', '10-E'],
        ['035', 'Alisher', 'Yuldoshev', '10-E'],
        ['036', 'Madinabonu', 'Atabayeva', '10-E']
    ];

    const stmt = db.prepare("INSERT INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    
    students10E.forEach(student => {
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
            console.log(`Successfully added ${students10E.length} students to 10-E class`);
            
            // Verify the insertion
            db.all("SELECT * FROM students WHERE class_name = '10-E' ORDER BY journal_number", (err, rows) => {
                if (err) {
                    console.error('Error verifying students:', err);
                } else {
                    console.log('\n10-E Class Students:');
                    rows.forEach(student => {
                        console.log(`${student.journal_number}: ${student.first_name} ${student.last_name}`);
                    });
                }
                db.close();
            });
        }
    });
});
