// src/lib/logger.js
import fs from 'fs';
import path from 'path';

// Define the path to the log file
const logFilePath = path.join(process.cwd(), 'logs', 'error_logs.json');

export function logError(status, error, url) {
    const logEntry = {
        status: status,
        error: error.message || error,
        url: url,
        timestamp: new Date().toISOString(),
    };

    let logs = [];

    // Check if the log file exists
    if (fs.existsSync(logFilePath)) {
        try {
            const existingLogs = fs.readFileSync(logFilePath, 'utf8');
            logs = existingLogs ? JSON.parse(existingLogs) : [];
        } catch (err) {
            console.error('Error parsing log file:', err);
            logs = []; // Reset logs if the JSON is invalid
        }
    }

    // Add the new log entry
    logs.push(logEntry);

    // Write the updated logs back to the file
    try {
        fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}
