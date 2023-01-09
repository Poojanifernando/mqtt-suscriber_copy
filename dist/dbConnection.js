"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
//import mysql
const mysql2_1 = __importDefault(require("mysql2"));
//db connection details
let mySQLConn = {
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "MySqlDB@123",
    database: "new_line_light_db",
    multipleStatements: true
};
exports.dbPool = mysql2_1.default.createPool(mySQLConn);
//check if the db is connected successfully
exports.dbPool.getConnection((err, conn) => {
    if (err) {
        console.log(err.message + "Not able to connect");
    }
    else {
        console.log(" connected");
    }
});
//# sourceMappingURL=dbConnection.js.map