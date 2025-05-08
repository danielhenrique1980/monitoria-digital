import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localmonitoriadigital.mysql.database.azure.com",
  user: "adminmonitoria",
  database: "monitoria_digital",
  password: "Truco-6912",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});
