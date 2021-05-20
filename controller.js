const express = require("express");
//express-fileupload - not download to the npm
const fileUpload = require("express-fileupload")
//searchInFile not existing in our project
const model = require("./model/searchInFile")

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())
app.use(express.static("./view"))

app.get("/", function (req, res) {
    res.sendFile("index.html")
});

//not needed in our project
app.post("/search", function (req, res) {
    var key = req.body.key
    res.write("search for " + key + ":\n")
    if (req.files) {
        var file = req.files.text_file
        var result = model.searchText(key, file.data.toString())
        res.write(result)
    }
    res.end()
});

app.listen(process.env.PORT || 8080)