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

$(".btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrain = $("#firstTrain")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  database.ref().set({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});
