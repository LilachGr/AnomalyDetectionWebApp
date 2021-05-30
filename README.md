# AnomalyDetectionWebApp
In this App we Implements the MVC Design Pattern.
We have the file of the model and it contains a dll file that choosing the appropriate Algorithm (Regression,Hybird) when we excuting Moreover
we have a AlgorithmFunctions.js file this file will response to the controler and till him the answer(anomaly detecting) when the controler ask to calculate something.
We have the View its the view of our WebApp when the client open it and have the appropriate things that the client want.
we have the controller.js and this is the important file that have the post method that interact the /AlgorithmFunctions that you can find in the model.
The MVC is the important part in this project as we know its Distinctive properits.




# How can use this WebApp?!
First of all we have developed this WebApp for Anomaly detecting.
For Detecting Anomaly you must upload two files -> the first is TrainFile and the second is the TestFile.
The WebApp will return a Response if this was directly from the WebApp or from sending Http Post commands(you can do this from the Postman Site in google)
You as a Client you can choose Algorithm of detecting anomaly the first is the Regerssion Algo and the second is the Hybird Algo(Combination of Regerssion and the minCircle)
The Response that the Client we get is the Anomaly between the first file and the second file it Contains the Descreption(the correlated features) and the timestep(the row that we get anomaly in.



# Running the WepApp
First of all you must have node package to execute the program.
You need to install :
npm i express
npm i express-fileupload
After the command (node controller.js) the program will execute on the port 8080
The WebApp will shown to the Client.
And in this moment the client know what to do (uploading files to detect anomaly)
If the client want to sent Http post command he can and should preserve on the appropriate syntax
firstly:
first csv file (Train file)
after that the "done" word
and one more csv file (Test file)
and after that the "done" word.
after that if the syntax is correct then he will get a json file as a response to his request from the WepApp.


