var config = {
	apiKey: "AIzaSyCnGULkVJDtmUAgkEWdbAvjItczt23Mj5c",
    authDomain: "employee-data-management-a34f4.firebaseapp.com",
    databaseURL: "https://train-scheduler-848fe.firebaseio.com/",
    projectId: "employee-data-management-a34f4",
    storageBucket: "employee-data-management-a34f4.appspot.com",
    messagingSenderId: "669959243962"

  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name = '';
  var destination = '';
  var frequency = '';
  var trainTime = '';

  $('#submit').on('click', function() {
  	event.preventDefault();

  	name = $('#name').val().trim();
  	destination = $('#destination').val().trim();
  	trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");
  	frequency = $('#frequency').val().trim();

  	database.ref().push( {
  		name: name,
  		destination: destination,
  		trainTime: trainTime,
  		frequency: frequency,
  	});

  	$("#name").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

  });

  	
 
 //this displays the uploaded data
database.ref().on('child_added', function(childSnapshot){

	moment();
	console.log(moment());

	var difMin = moment().diff(moment.unix(childSnapshot.val().trainTime, "X"), "minutes");
	console.log(difMin);

	var remainder = difMin % childSnapshot.val().frequency;
	console.log(remainder);

	var whole = childSnapshot.val().frequency - remainder;

	var nextTrain = moment().add(whole, "minutes");
	console.log(nextTrain);

	// var currentTime = moment().format('HH:mm');
	// console.log(currentTime);

	// var firstTimeConverted = moment(frequency, "hh:mm");
	// console.log(firstTimeConverted);

	// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// console.log(diffTime);

	// var tRemainder = diffTime % frequency;
	// console.log(tRemainder);

	// var minutesTillTrain = frequency - tRemainder;
 //    console.log(minutesTillTrain);

 //    var nextTrain = moment().add(minutesTillTrain, "minutes");
 //    console.log(moment(nextTrain).format("hh:mm"));

	$("#output").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + 
		childSnapshot.val().frequency + "</td><td>" + moment(nextTrain).format("h:mm a")
		+ "</td><td>" + whole + "</td></tr>");


})
