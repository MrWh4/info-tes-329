const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test_system.db');

console.log('Starting database migration...');

db.serialize(() => {
    // Check if class_name column exists
    db.all("PRAGMA table_info(students)", (err, columns) => {
        if (err) {
            console.error('Error checking table info:', err);
            return;
        }
        
        const hasClassColumn = columns.some(col => col.name === 'class_name');
        
        if (!hasClassColumn) {
            console.log('Adding class_name column to students table...');
            
            // Add class_name column
            db.run("ALTER TABLE students ADD COLUMN class_name TEXT", (err) => {
                if (err) {
                    console.error('Error adding class_name column:', err);
                    return;
                }
                
                console.log('class_name column added successfully');
                
                // Update existing students with default class
                db.run("UPDATE students SET class_name = '6A' WHERE class_name IS NULL", (err) => {
                    if (err) {
                        console.error('Error updating existing students:', err);
                        return;
                    }
                    
                    console.log('Existing students updated with default class');
                    
                    // Drop the old unique constraint and recreate the table with new constraint
                    console.log('Recreating table with new constraints...');
                    
                    db.run(`CREATE TABLE students_new (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        journal_number TEXT NOT NULL,
                        first_name TEXT NOT NULL,
                        last_name TEXT NOT NULL,
                        class_name TEXT NOT NULL,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        UNIQUE(journal_number, class_name)
                    )`, (err) => {
                        if (err) {
                            console.error('Error creating new table:', err);
                            return;
                        }
                        
                        // Copy data from old table
                        db.run(`INSERT INTO students_new (id, journal_number, first_name, last_name, class_name, created_at)
                                SELECT id, journal_number, first_name, last_name, class_name, created_at FROM students`, (err) => {
                            if (err) {
                                console.error('Error copying data:', err);
                                return;
                            }
                            
                            // Drop old table and rename new one
                            db.run("DROP TABLE students", (err) => {
                                if (err) {
                                    console.error('Error dropping old table:', err);
                                    return;
                                }
                                
                                db.run("ALTER TABLE students_new RENAME TO students", (err) => {
                                    if (err) {
                                        console.error('Error renaming table:', err);
                                        return;
                                    }
                                    
                                    console.log('Database migration completed successfully!');
                                    
                                    // Now add the new sample students
                                    addSampleStudents();
                                });
                            });
                        });
                    });
                });
            });
        } else {
            console.log('class_name column already exists');
            addSampleStudents();
        }
    });
});

function addSampleStudents() {
    console.log('Adding sample students for all classes...');
    
    const sampleStudents = [
        // 6A sinf
        ['001', 'Akmal', 'Karimov', '6A'],
        ['002', 'Dilnoza', 'Rahimova', '6A'],
        ['003', 'Bobur', 'Toshmatov', '6A'],
        // 6V sinf
        ['001', 'Malika', 'Abdullayeva', '6V'],
        ['002', 'Jasur', 'Normatov', '6V'],
        ['003', 'Zarina', 'Usmonova', '6V'],
        // 9A sinf
        ['001', 'Sardor', 'Alimov', '9A'],
        ['002', 'Nigora', 'Karimova', '9A'],
        ['003', 'Davron', 'Tursunov', '9A'],
        // 9E sinf
        ['001', 'Madina', 'Rahmonova', '9E'],
        ['002', 'Otabek', 'Nazarov', '9E'],
        ['003', 'Gulnoza', 'Yusupova', '9E'],
        // 9V sinf
        ['001', 'Jamshid', 'Qodirov', '9V'],
        ['002', 'Sevara', 'Mirzayeva', '9V'],
        ['003', 'Aziz', 'Salimov', '9V'],
        // 10-E sinf
        ['001', 'Shohruh', 'Abdullayev', '10-E'],
        ['002', 'Kamola', 'Toshmatova', '10-E'],
        ['003', 'Farruh', 'Karimov', '10-E'],
        // 10-J sinf
        ['001', 'Nilufar', 'Rahimova', '10-J'],
        ['002', 'Bekzod', 'Normatov', '10-J'],
        ['003', 'Dildora', 'Usmonova', '10-J'],
        // 10-V sinf
        ['001', 'Rustam', 'Alimov', '10-V'],
        ['002', 'Mohira', 'Karimova', '10-V'],
        ['003', 'Jasur', 'Tursunov', '10-V'],
        // 11A sinf
        ['001', 'Shohida', 'Rahmonova', '11A'],
        ['002', 'Bobur', 'Nazarov', '11A'],
        ['003', 'Feruza', 'Yusupova', '11A'],
        // 11D sinf
        ['001', 'Azamat', 'Qodirov', '11D'],
        ['002', 'Gulshan', 'Mirzayeva', '11D'],
        ['003', 'Nodir', 'Salimov', '11D'],
        // 11J sinf
        ['001', 'Laylo', 'Abdullayeva', '11J'],
        ['002', 'Sanjar', 'Toshmatov', '11J'],
        ['003', 'Munisa', 'Karimova', '11J'],
        // 11V sinf
        ['001', 'Ulugbek', 'Rahimov', '11V'],
        ['002', 'Dilfuza', 'Normatova', '11V'],
        ['003', 'Sardorbek', 'Usmonov', '11V']
    ];

    const stmt = db.prepare("INSERT OR IGNORE INTO students (journal_number, first_name, last_name, class_name) VALUES (?, ?, ?, ?)");
    sampleStudents.forEach(student => {
        stmt.run(student);
    });
    stmt.finalize(() => {
        console.log(`${sampleStudents.length} sample students added successfully!`);
        db.close();
    });
}
