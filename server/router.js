const express = require('express');

const sqlDbConnect = require('./dbconnect')

const Router = express.Router();

Router.get('/', (req, res) => {
    const userData = [{ id: 1, name: "John", email: "john@example.com", number: 1254533 },
    { id: 2, name: "Dave", email: "dave@example.com", number: 1254533 },
    { id: 3, name: "Robert", email: "robert@example.com", number: 1254533 },
    { id: 4, name: "Allison", email: "allison@example.com", number: 1254533 },
    ];
    //const userDataPretty = JSON.stringify(userData, null, 4)
    res.send(userData);
})

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

module.exports = Router