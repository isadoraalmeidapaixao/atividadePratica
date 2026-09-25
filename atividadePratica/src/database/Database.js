import * as SQLite from 'expo-sqlite';

export class Database {

    static db = SQLite.openDatabaseSync('tasksync.db');

    static initialize() {

        this.db.execSync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT NOT NULL,
                priority TEXT NOT NULL,
                status TEXT NOT NULL,
                FOREIGN KEY (user_id)
                REFERENCES users(id)
            );
        `);

        // usuário de entrada
        const user = this.db.getFirstSync(
            `SELECT * FROM users WHERE email = ?`,
            ['aluno@senac.com']
        );

        if (!user) {
            this.db.runSync(
                `INSERT INTO users
                (name, email, password)
                VALUES (?, ?, ?)`,
                [
                    'Estudante',
                    'aluno@senac.com',
                    '1234'
                ]
            );
        }
    }

    static getUser(email, password) {

        return this.db.getFirstSync(
            `SELECT *
             FROM users
             WHERE email = ?
             AND password = ?`,
            [
                email,
                password
            ]
        );
    }

    static insertTask(
        userId,
        title,
        description,
        category,
        priority
    ) {

        this.db.runSync(
            `INSERT INTO tasks
            (
                user_id,
                title,
                description,
                category,
                priority,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                title,
                description,
                category,
                priority,
                'pending'
            ]
        );
    }

    static getTasks(userId) {

        return this.db.getAllSync(
            `SELECT *
             FROM tasks
             WHERE user_id = ?
             ORDER BY id DESC`,
            [userId]
        );
    }

    static completeTask(taskId) {

        this.db.runSync(
            `UPDATE tasks
             SET status = 'completed'
             WHERE id = ?`,
            [taskId]
        );
    }
}