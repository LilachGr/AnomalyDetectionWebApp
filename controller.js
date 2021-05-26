const express = require("express");
//express-fileupload - not download to the npm
//const fileUpload = require("express-fileupload")
//searchInFile not existing in our project
//const model = require("./model/searchInFile")

const modelDll = require("./model/AlgorithmFunctions")

const app = express()

app.use(express.urlencoded({ extended: false }))
//app.use(fileUpload())
app.use(express.static("./view"))

app.get("/", function (req, res) {
   res.sendFile("index.html")
});

//not needed in our project
app.post("/search", function (req, res) {
    res.write("hello world")
    modelDll.algorithmForFindingAnomalies(0, "D:\\biu_exercise\\advandedProgramming2\\tryNodeJS2\\NodejsWebApp1\\NodejsWebApp1\\reg_flight.csv", "D:\\biu_exercise\\advandedProgramming2\\tryNodeJS2\\NodejsWebApp1\\NodejsWebApp1\\anomaly_flight.csv", "./anomalies.txt")
    modelDll.algorithmForFindingAnomalies(1, "D:\\biu_exercise\\advandedProgramming2\\tryNodeJS2\\NodejsWebApp1\\NodejsWebApp1\\reg_flight.csv", "D:\\biu_exercise\\advandedProgramming2\\tryNodeJS2\\NodejsWebApp1\\NodejsWebApp1\\anomaly_flight.csv", "./anomalies2.txt")
    res.end()
});

app.listen(process.env.PORT || 8080)