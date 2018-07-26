// Initialize Firebase
var config = {
  apiKey: "AIzaSyDlAK9r3kWqVxhaZLgQrqKJ2t8pl3167WA",
  authDomain: "trainschedulehomeworkproj.firebaseapp.com",
  databaseURL: "https://trainschedulehomeworkproj.firebaseio.com",
  projectId: "trainschedulehomeworkproj",
  storageBucket: "trainschedulehomeworkproj.appspot.com",
  messagingSenderId: "590447027370"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var trainDest = $("#destination")
    .val()
    .trim();
  var startTrain = $("#firstTrain")
    .val()
    .trim();
  var trainFrequency = $("#frequency")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrain: startTrain,
    frequency: trainFrequency
  };
  database.ref().push(newTrain);

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  // console.log(childSnapshot.val());
  console.log("inside childadded");
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var tRemainder =
    moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var tMinutes = frequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var tArrival = moment()
    .add(tMinutes, "m")
    .format("hh:mm A");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes)
  );

  // Append the new row to the table
  $("#train-schedule > tbody").append(newRow);
});
