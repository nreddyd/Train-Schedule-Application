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
  // console.log(trainName);
  // console.log(trainDest);
  // console.log(startTrain);
  // console.log(trainFrequency);
  database.ref().push(newTrain);
  // console.log(newTrain);

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

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency),
    $("<td>").text(" ")
  );

  // console.log(newRow);
  // Append the new row to the table
  $("#train-schedule > tbody").append(newRow);

  // $("#train-schedule > tbody").append(
  //   "<tr><td>" +
  //     trainName +
  //     "</td><td>" +
  //     destination +
  //     "</td><td class='min'>" +
  //     frequency +
  //     "</td><td class='min'>" +
  //     firstTrain +
  //     "</td><td class='min'>" +
  //     firstTrain +
  //     "</td></tr>"
  // );
});
