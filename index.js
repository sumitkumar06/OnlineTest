const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/OnlineTest', { useNewUrlParser: true });
const port = 8000;

// Define Mongoose Schema
const candidateSchema = new mongoose.Schema({
    name: String,
    email: String
});

const test1Schema = new mongoose.Schema({
    name: String,
    first_score: String
});

const test2Schema = new mongoose.Schema({
    name: String,
    second_score: String
});

const test3Schema = new mongoose.Schema({
    name: String,
    third_score: String
});

const Candidate = mongoose.model('Candidate', candidateSchema);
const Test1 = mongoose.model('Test1', test1Schema);
const Test2 = mongoose.model('Test2', test2Schema);
const Test3 = mongoose.model('Test3', test3Schema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files
app.use(express.urlencoded());

// ENDPOINTS


// Insert a candidate into database
app.post('/', (req, res) => {
    var myData = new Candidate(req.body)
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the databse")
    })
});


// Assign score for a candidate based on the test for first round
app.post('/first_round', (req, res) => {
    var test1Data = new Test1(req.body)
    let candidtaeName = req.body.name;
    var st = db.collection('Candidate').find();
    st.forEach(function (doc, err) {
        let candidateN = doc.name
        if (candidateN == candidtaeName) {
            test1Data.save().then(()=>{
                res.send('Your score is saved')
            }).catch(()=>{
                res.send('there is some erroe saving your score')
            })
        }
        else{
            res.send("no candidate found")
        }
    })
});

// Assign score for a candidate based on the test for second round
app.post('/second_round', (req, res) => {
    var test2Data = new Test2(req.body)
    let candidtaeName = req.body.name;
    var st = db.collection('Candidate').find();
    st.forEach(function (doc, err) {
        let candidateN = doc.name
        if (candidateN == candidtaeName) {
            test2Data.save().then(()=>{
                res.send('Your score is saved')
            }).catch(()=>{
                res.send('there is some erroe saving your score')
            })
        }
        else{
            res.send("no candidate found")
        }
    })
});

// Assign score for a candidate based on the test for third round
app.post('/third_round', (req, res) => {
    var test3Data = new Test3(req.body)
    let candidtaeName = req.body.name;
    var st = db.collection('Candidate').find();
    st.forEach(function (doc, err) {
        let candidateN = doc.name
        if (candidateN == candidtaeName) {
            test3Data.save().then(()=>{
                res.send('Your score is saved')
            }).catch(()=>{
                res.send('there is some erroe saving your score')
            })
        }
        else{
            res.send("no candidate found")
        }
    })
});


// for getting results of the first round
app.get('/first_round/result',(req ,res)=>{
    var st = db.collection('Test1').find();
    let firstSum = 0 ;
    let count = 0 ;
    let firstHighest = Number.MIN_SAFE_INTEGER;
    st.forEach(function (doc, err) {
        firstSum = firstSum + doc.first_score;
        count++;
        if(doc.first_score > firstHighest){
            firstHighest = doc.first_score;
        }
    })
    var average_of_first = firstSum/count;

    res.send('Highest Score in first round is = ' + firstHighest + ' and average score of first round is = ' + average_of_first)

})


// for getting results of the second round
app.get('/second_round/result',(req ,res)=>{
    var st = db.collection('Test2').find();
    let secondSum = 0 ;
    let count = 0 ;
    let secondHighest = Number.MIN_SAFE_INTEGER;
    st.forEach(function (doc, err) {
        secondSum = secondSum + doc.second_score;
        count++;
        if(doc.second_score > secondHighest){
            secondHighest = doc.second_score;
        }
    })
    var average_of_second = secondtSum/count;

    res.send('Highest Score in second round is = ' + secondHighest + ' and average score of second round is = ' + average_of_second)

})


// for getting results of the third round
app.get('/third_round/result',(req ,res)=>{
    var st = db.collection('Test3').find();
    let thirdSum = 0 ;
    let count = 0 ;
    let thirdHighest = Number.MIN_SAFE_INTEGER;
    st.forEach(function (doc, err) {
        thirdSum = thirdSum + doc.third_score;
        count++;
        if(doc.third_score >thirdtHighest){
            thirdHighest = doc.third_score;
        }
    })
    var average_of_third = thirdSum/count;

    res.send('Highest Score in third round is = ' + thirdHighest + ' and average score of third round is = ' + average_of_third)

})


// STARTING THE SERVER
app.listen(port, () => {
    console.log(`The server for this application is started at port ${port}`);
});  