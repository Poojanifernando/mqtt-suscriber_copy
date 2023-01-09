"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mqtt 
const mqtt_1 = __importDefault(require("mqtt"));
//import the db connection from dbConnection file
const dbConnection_1 = require("./dbConnection");
//get mqtt connection
let mqttConnection = mqtt_1.default.connect('mqtt://45.61.56.94:1883');
//let mqttConnection = mqtt.connect('mqtt://127.0.0.1:1883')
//subscribe the connection
mqttConnection.on("connect", () => {
    mqttConnection.subscribe('X96HTRK23M');
    //if the susbcribe successfully 
    console.log("suscribe successfully");
});
//X96HTRK23M
mqttConnection.on("message", (topic, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        topic = 'X96HTRK23M';
        //console.log(payload.toString() + "555555555")
        var dataJson = JSON.parse(payload.toString());
        console.log(JSON.parse(payload.toString()));
        // let deviceData = payload.toString();
        let funcRes_MySQL = yield savedatainmysql(dataJson);
        console.log(funcRes_MySQL);
    }
    catch (e) {
        console.log(e.message);
    }
}));
//save getting data to the database
function savedatainmysql(inputJSON) {
    //console.log(inputJSON+ "666666");
    try {
        return new Promise((resolve, reject) => {
            //  let sql = "SET @P_JSON = ? ;" +  "CALL MQTT_Insert_Device(@P_JSON)"
            //insert data into the table by values        
            var sql = `INSERT INTO iot_input_process SET ?`;
            let params = [inputJSON];
            console.log("inputJSON", inputJSON);
            let data = {
                device_id_in_iot_input: inputJSON.deviceid,
                parameter_id_in_iot_input: inputJSON.type,
                value_input: inputJSON.value,
            };
            console.log("data", data);
            //dbPool.query(callSP, params)
            dbConnection_1.dbPool.query(sql, data, (err, result) => {
                console.log("err", err);
                console.log("result", result);
                if (err) {
                    reject({ statusCode: 400, message: err.message });
                }
                else {
                    if (result.affectedRows > 0) {
                        //console.log(params)
                        //let response = result[params.length][0]                
                        resolve({ statusCode: 200, message: "successfully inserted" });
                    }
                    else {
                        reject({ statusCode: 201, message: "No response" });
                    }
                }
            });
        });
    }
    catch (e) {
        console.log(e.message);
    }
}
//# sourceMappingURL=app.js.map