const sql = require('mysql')

const sqlconnect = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"contacts_app",
    multipleStatements:true
})

sqlconnect.connect((err)=>{
    if(!err){
        console.log("Database Connected");
    }else(
        console.log("Database Not Connected")
    )
})

module.exports= sqlconnect