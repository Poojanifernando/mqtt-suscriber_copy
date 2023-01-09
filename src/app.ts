//import mqtt 
import mqtt from 'mqtt'
//import the db connection from dbConnection file
import { dbPool } from './dbConnection';

//get mqtt connection
let mqttConnection = mqtt.connect('mqtt://45.61.56.94:1883')
//let mqttConnection = mqtt.connect('mqtt://127.0.0.1:1883')

//subscribe the connection
mqttConnection.on("connect", ()=>{

    mqttConnection.subscribe('X96HTRK23M')
    //if the susbcribe successfully 
    console.log("suscribe successfully");
})

//X96HTRK23M
mqttConnection.on("message", async(topic, payload)=>{
    try{ 
    topic = 'X96HTRK23M'
    //console.log(payload.toString() + "555555555")

    var dataJson = JSON.parse(payload.toString())
    console.log(JSON.parse(payload.toString()))

   // let deviceData = payload.toString();
  
   let funcRes_MySQL = await savedatainmysql(dataJson);


   console.log(funcRes_MySQL);
    }catch(e: any){
        console.log(e.message)
    }
})

//save getting data to the database
function savedatainmysql(inputJSON: any){

    //console.log(inputJSON+ "666666");
    try{
        return  new Promise((resolve, reject)=>{
           
       
        //  let sql = "SET @P_JSON = ? ;" +  "CALL MQTT_Insert_Device(@P_JSON)"
  
     
            


        //insert data into the table by values        
        var sql = `INSERT INTO iot_input_process SET ?`;
         let params = [inputJSON]
         console.log("inputJSON",inputJSON);
         let data = {
            device_id_in_iot_input : inputJSON.deviceid,
            parameter_id_in_iot_input : inputJSON.type,
            value_input :inputJSON.value,
        };
        console.log("data",data);
          //dbPool.query(callSP, params)
           dbPool.query(sql, data, (err: any, result: any)=>{
            console.log("err",err);
            console.log("result",result);
               if(err){
                    
                    reject({statusCode:400, message:err.message})
                }
                else{
                    
                    if(result.affectedRows > 0){
                        //console.log(params)
                        //let response = result[params.length][0]                
                        resolve({statusCode: 200, message: "successfully inserted"})
                    }
                    else{
                        reject({statusCode: 201, message:"No response"})
                    }
                }
            })
        })
    }
    catch(e: any){
        console.log(e.message);

    }
}