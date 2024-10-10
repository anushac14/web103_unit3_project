import { pool } from './database.js';
import './dotenv.js';
import eventData from '../data/events.js';

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            location VARCHAR(255) NOT NULL,
            event_date DATE NOT NULL,
            is_free BOOLEAN NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 events table created successfully');
    } catch (err) {
        console.error('⚠️ error creating events table', err);
    }
};

const seedEventsTable = async () => {
    await createEventsTable();

    eventData.forEach((event) => {
        const insertQuery = `
            INSERT INTO events (title, description, location, event_date, is_free) 
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [
            event.title,     
            event.description, 
            event.location,   
            event.event_date, 
            event.is_free     
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err);
                return;
            }

            console.log(`✅ ${event.title} added successfully`);
        });
    });
};

seedEventsTable();