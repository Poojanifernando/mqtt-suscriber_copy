//import mysql
import mysql from 'mysql2';

//db connection details
let mySQLConn = {
    connectionLimit : 100,
    host:"localhost",
    user:"root",
    password:"MySqlDB@123",
    database:"new_line_light_db",
    multipleStatements:true
}

export let dbPool = mysql.createPool(mySQLConn);

//check if the db is connected successfully
dbPool.getConnection((err, conn) =>{
    if(err){
        console.log(err.message + "Not able to connect");
    }else{
        console.log(" connected");
    }
})