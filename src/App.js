import logo from './logo.svg';
import './App.css';
import webgazer from 'webgazer'
import { useEffect } from 'react';

function App() {

  webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
     webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        console.log(document)
        console.log(document.getElementById("plotting_canvas"))
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };

  

    useEffect(() => {
      setup();
      webgazer.setGazeListener(function(data, clock) {
        if (data) {
          var xprediction = data.x;
          var yprediction = data.y;
          
        }
      }).begin()
    });
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <canvas id="plotting_canvas" ></canvas>
    </div>
  );
}

export default App;
