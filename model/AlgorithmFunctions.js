const ffi = require("ffi-napi")

const algorithmDll = new ffi.Library("./model/AlgorithmDll.dll", {
    "DllHybridAlgoritgm": ["void", ["string", "string", "string"]],
    "DllRegressionAlgoritgm": ["void", ["string", "string", "string"]]
})

//if algorithmType == 0 we use Regression Algoritgm.
//if algorithmType == 1 we use Hybrid Algoritgm.
function algorithmForFindingAnomalies(algorithmType, learnNormalFileName, testFileName, outputFileName) {
    //if algorithmType is Regression Algoritgm
    if (algorithmType == 0) {
        algorithmDll.DllRegressionAlgoritgm(learnNormalFileName, testFileName, outputFileName)
    }
    //if algorithmType is Hybrid Algoritgm
    else if (algorithmType == 1) {
        algorithmDll.DllHybridAlgoritgm(learnNormalFileName, testFileName, outputFileName)
    }
}

module.exports.algorithmForFindingAnomalies = algorithmForFindingAnomalies
