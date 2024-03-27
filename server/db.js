import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'quan2910',
    database: 'iot'
});     

// export const connectDB = async () => {
//     try {
//         await db.connect();
//         console.log('Connected DB');
//     } catch (error) {
//         console.log(error);
//     }        
// }                