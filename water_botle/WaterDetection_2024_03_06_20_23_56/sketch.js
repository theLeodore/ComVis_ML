// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/nMGZVBAOg/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 500);
  video.hide();

  textSize(24);
  fill(255);
  stroke(0);
  strokeWeight(4);
  // text('hi', 320, 250, 100, 100);

   position = createVector(width/2, height/2);

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);
  
  // text('hi', 320, 250, 100, 100);

  // // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
  
  if (label== "bottle detected") {
  text('stay hydrated :D', 260, 400);
  } else if (label == "neutral") {
  text('where is your fucking water bottle', 160, 400)
  } 
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  
//     if (label== "water bottle detected") {
//   text('drink up!', 260, 250, 100, 100);
//   } else if (label == "neutral") {
//   text('where is your fucking water bottle', position.x, position.y, 100, 100);
//   } 
  
  // Classifiy again!
  classifyVideo();
}