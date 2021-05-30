const ffi = require("ffi-napi")

const algorithmDll = new ffi.Library("./model/AlgorithmDll.dll", {
    "DllHybridAlgoritgm": ["void", ["string", "string", "string"]],
    "DllRegressionAlgoritgm": ["void", ["string", "string", "string"]]
})

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
