 var config = {
    apiKey: "AIzaSyCzuJ7-eOiTwQWlljp3WdXVSIod7tVrRco",
    authDomain: "train-project-5be40.firebaseapp.com",
    databaseURL: "https://train-project-5be40.firebaseio.com",
    projectId: "train-project-5be40",
    storageBucket: "train-project-5be40.appspot.com",
    messagingSenderId: "80692073012"
  };
  firebase.initializeApp(config);


 var database = firebase.database();


$("#addTrain").on("click", function(event) {
  event.preventDefault();

  console.log('working');

  
  var trainName = $('#trainName').val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();
  
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency,
  }

  //push new train object to firebase
  database.ref().push(newTrain);

  $('#trainName').val('');
  $('#destination').val('');
  $('#firstTrain').val('');
  $('#frequency').val('');

  return false;
});

database.ref().on('child_added', function(snapshot, value) {

  var trainName = snapshot.val().name;
  var destination = snapshot.val().dest;
  var firstTrain = snapshot.val().first;
  var frequency = snapshot.val().freq;

  var startTime = moment(firstTrain, 'hh:mm');
  console.log(moment(startTime).format('hh:mm'));

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //difference between times
  var diffTime = moment().diff(moment(startTime), "minutes");
  console.log("Difference in time: " + diffTime);

  //remainder
  var remainder = diffTime % frequency;
  console.log(remainder);

  //minutes until train
  var minutesAway = frequency - remainder;
  console.log("minutes till train: " + minutesAway);

  //next train
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

  $('.tableTrain').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});