const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const model = require("./model/AlgorithmFunctions");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static("./view"));
app.use(express.text());

app.get("/", function (req, res) {
    res.sendFile("index.html");
});

const csvNewTrain = "created1.csv";
const csvNewTest = "created2.csv";
const resultFile = "results.json";

/* get algorithmType:
 * if algorithmType == 0 we use Regression Algoritgm,
 * if algorithmType == 1 we use Hybrid Algoritgm,
 * if algorithmType == -1 we have error.
 * 
 * if postType == 1 we in story 1, if postType == 2 we in story 2.
 */
function createJsonFileForResult(algorithmType, res, postType) {
    //create new file for the result
    fs.appendFile(resultFile, '', function (err) {
        if (err) throw err;
    });
    if (algorithmType == -1) {
        res.json("Worng algorithm type! Try again!");
    } else {
        model.algorithmForFindingAnomalies(algorithmType, csvNewTrain, csvNewTest, resultFile);
        var out = fs.readFileSync(resultFile, "utf-8");
        //story 1
        if (postType == 1) {
            var outText = JSON.parse(out);
            var size = outText.length;
            var i;
            var output = "<b>The Anomalies:</b><br>"
            for (i = 0; i < size; i++) {
                output += "description: " + outText[i].description + " ,time step: " + outText[i].timeStep +"<br>";
            }
            if (size == 0) {
                output = "<b>There are no anomalies!</b>"
            }
            res.send(output);
        }
        //story 2
        else if (postType == 2) {  
            res.json(out);
        }
    }

    //delete all the files we created
    fs.unlink(resultFile, function (err) {
        if (err) throw err;
    });
    fs.unlink(csvNewTrain, function (err) {
        if (err) throw err;
    });
    fs.unlink(csvNewTest, function (err) {
        if (err) throw err;
    });

    res.end();
}

app.post("/AlgorithmFunctions", function (req, res) {

    var Trainfile = req.files.fileTrain;
    var Testfile = req.files.fileTest;
    var choiceName = req.body.Algo;
    var data1 = Trainfile.data;
    var data2 = Testfile.data;
    var algorithmType = -1;

    //move the data to created csv for Train
    fs.writeFileSync(csvNewTrain, data1, function (err) {
        if (err) return console.log(err);
    });

    //move data to created csv for Test
    fs.writeFileSync(csvNewTest, data2, function (err) {
        if (err) return console.log(err);
    });

    if (choiceName.localeCompare("Regression Algorithm") == 0) {
        algorithmType = 0;
    } else if (choiceName.localeCompare("Hybrid Algorithm") == 0) {
        algorithmType = 1;
    }
    createJsonFileForResult(algorithmType, res, 1);
});

//create file from specific i in output until the word "done" or end of the output.
function createFileFromPostReq(i, fileName, output) {
    var allText = "";
    var enter = "\r\n";
    var enterSize = enter.length;
    while (i < output.length) {
        var j = output.indexOf(enter, i);
        if (j == -1) j = output.length;
        var textLine = output.substr(i, j - i + enterSize);
        i = j + enterSize;
        if (textLine.substr(0, textLine.length - enterSize) == "done" || textLine == "done") break;
        allText += textLine;
    }
    fs.writeFileSync(fileName, allText, function (err) {
        if (err) return console.log(err);
    });
    return i;
}

app.post("/AlgorithmFunctions/:algorithmType", function (req, res) {
    var algorithmType = req.params.algorithmType;
    var output = req.body;
    //create csv files for test and train from post body
    var i = createFileFromPostReq(0, csvNewTrain, output);
    var i = createFileFromPostReq(i, csvNewTest, output);

    if (algorithmType == "regression" || algorithmType == "Regression") {
        createJsonFileForResult(0, res, 2);
    } else if (algorithmType == "hybrid" || algorithmType == "Hybrid") {
        createJsonFileForResult(1, res, 2);
    } else {
        createJsonFileForResult(-1, res, 2);
    }
});

var port = process.env.PORT || 8080;
app.listen(port, () => console.log("server started on port " + port));