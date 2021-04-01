const express = require('express');
const app = express();
const path = require('path')
var uniqid = require("uniqid");
var CronJob = require('cron').CronJob;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(express.static('public'))


//////////////////////////// Form for data insertion //////////////////////////////////
app.get("/", (req, res) => {
    res.render('index');
})


//////////////////////////// Endpoint for fetching all tasks /////////////////////////////
app.get("/list", (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/BoardInfinity', { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('BoardInfinity')
        var col = db.collection('data');
        col.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray(function (err, result) {
            if (err) throw err;
            res.render("display", { items: result })
        });
    })
});



//////////////////////////////////// Endpoint for adding task (POST) //////////////////////////////////
app.post("/add", (req, res) => {
    var fetch = req.body;
    MongoClient.connect('mongodb://localhost:27017/BoardInfinity', { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('BoardInfinity')
        const col = db.collection("data")
        fetch.createdAt = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        fetch.id = uniqid()
        col.insertOne(fetch, function (err, doc) {
            if (err) throw err;
        });
        var duration = parseInt(fetch.duration);
        var i = -1;
        var job = new CronJob("* * * * * *", function () {
            i++;
            if (i == duration * 60) {
                db.collection("data").deleteOne({ 'id': fetch.id }, function (err, obj) {
                    if (err) throw err;
                    console.log("deleted");
                });
                job.stop();
            }
        });
        job.start();
        res.send("Task Added Successfully<br> <a href='/list'>See Here</a>")
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Running on port " + port)
})
