const express = require('express');

const sqlDbConnect = require('./dbconnect')

const Router = express.Router();

Router.get("/api/allcontacts", (req, res) => {
    sqlDbConnect.query("SELECT * FROM contacts", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

Router.post("/api/addcontacts", (req, res) => {
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;  

    var sql = `INSERT INTO contacts(name,email,number) VALUES("${name}","${email}",${number})`

    sqlDbConnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json({success:"Contact Added successfully"});
        } else {
            console.log(err);
        }
    })
})

Router.delete("/api/deletecontacts/:id",(req,res)=>{
    sqlDbConnect.query("DELETE FROM contacts WHERE ID = '"+req.params.id+"' ", (err,result)=>{
        if(!err){
            res.status(200).json({success:"Contact Deleted"});
        }else{
            console.log(err);
        }
    })
})

module.exports = Router