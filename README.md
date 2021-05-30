# AnomalyDetectionWebApp
## About the WebApp
In this WebApp we implement the MVC architecture.  
We have the folder of the model and it contains a dll file that implements two algorithms for detecting anomalies (Regression, Hybrid). Also in that folder, we have a AlgorithmFunctions.js file. This file calls the dll in response to the controller.  
We have the View folder which holds the view of our WebApp. The view shows the web page with all parts as required (choosing two csv files and algorithm and the response).  
The controller.js implements all post calls to /AlgorithmFunctions.

## How to use this WebApp?!
First of all we have developed this WebApp for Anomaly detecting.
For Detecting Anomaly you must upload two files -> the first is TrainFile and the second is the TestFile.  
The WebApp will return a Response if this was directly from the WebApp or when sending Http Post command (you can do this using the Postman tool for example).  
There are two supported algorithms for detecting anomalies: the first is Regression Algo and the second is the Hybrid Algo (Combination of Regression and the minCircle).  
The Response that the client will get is the anomalies between the first file and the second file. It contains the description of the correlated features and the timestep (the row that we get the anomaly in).

# Running the WepApp
+ First of all you must have Node.js version 14.17.0. to execute the program.
You also need to install:  
npm i express  
npm i express-fileupload  
npm i ffi-napi  

#### Using the browser:
+ option 1: from command line run the command "node controller.js". The program will execute on the port 8080. Then open a browser and browse to "http://localhost:8080/".
+ option 2: from visual studio run the app (x64 version). 
The program will execute on a port chosen by visual studio. The browser will start.
+ Use the UI of the WebApp shown in the browser.

#### Using postman:

If the client want to sent Http post command he must follow the appropriate syntax:
+ Use Post verb.
+ Url: "http://localhost:8080/AlgorithmFunctions/Hybrid" or "http://localhost:8080/AlgorithmFunctions/Regression"
(use the right port per the server).
+ Body type "Text"
firstly:
data from the first csv file (Train file)
after that the "done" word.
and then data from the second csv file (Test file)
and after that the "done" word.
+ Example for a good syntax:
A,B,C,D  
1,2,3,4  
5,6,7,8  
done  
A,B,C,D  
3,4,5,6  
2,4,6,7  
done
+ After that if the syntax is correct then we will get a json file as a response to the request from the WepApp.
