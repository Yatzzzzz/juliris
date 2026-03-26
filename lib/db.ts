import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    // Ensure JSON columns are parsed correctly
    typeCast: function (field, next) {
        if (field.type === "JSON" || field.type === "BLOB") {
            const val = field.string();
            if (val === null) return null;
            try {
                return JSON.parse(val);
            } catch {
                return val;
            }
        }
        return next();
    },
});

export default pool;
