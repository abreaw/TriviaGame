

// ----------------------------------------------------------------------------------------------------
// Global Variables Setup
// ----------------------------------------------------------------------------------------------------

// timer amount for each question
var totalTime = 15; // 15 secs
// answer selected by user (could be a local variable?)
var answerSelected;
// total correct answer count
var totalCorrect = 0;
// total incorrect answer count
var totalIncorrect = 0;
// total # of questions shown to user during game 
var totalQuestionsAsked = 0;
// time remaining counter (local variable?)
var timeRemaining;
// total # of max questions that will be asked during round
var maxQuestionCount = 10; // 10 questions asked to the user total
// total # of questions available
var maxQuestionsAvailable = 4; // update this to be equal to all the question objects added below
// current correct answer
var currentRightAnswer;
// times up variable
var timesUp = false;
// timer ID
var intervalID;


// ----------------------------------------------------------------------------------------------------
// Trivia Question Objects
// ----------------------------------------------------------------------------------------------------
var q1 = {

	question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
	answerChoices: ["A. William and Elizabeth", "B. Joseph and Catherine", "C. John and Mary", "D. George and Anne"],
	correctAnswer: 2,
	questionTheme: "General",
	correctAnswerDetails: "",
};

var q2 = {

	question: "When did the Liberty Bell get its name?",
	answerChoices: ["A. when it was made, in 1701", "B. when it rang on July 4, 1776", "C. in the 19th century, when it became a symbol of the abolition of slavery", "D. none of the above"],
	correctAnswer: 2,
	questionTheme: "US History",
	correctAnswerDetails: "",
};

var q3 = {

	question: "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
	answerChoices: ["A. Buttermilk", "B. Daisy", "C. Scout", "D. Tulip"],
	correctAnswer: 0,
	questionTheme: "Entertainment",
	correctAnswerDetails: "",
};

var q4 = {

	question: "The Daniel Boon museum at the home where he died can best be described how?",
	answerChoices: ["A. a log cabin in Kentucky", "B. a two-story clapboard house in Tennessee", "C. a four-story Georgian-style home in Missouri", "D. a three story brick house in Arkansas"],
	correctAnswer: 2,
	questionTheme: "US History",
	correctAnswerDetails: "",
};

// var q5 = {

// 	question: "",
// 	answerChoices: ["", "", "", ""],
// 	correctAnswer: ,
// 	questionTheme: "",
// 	correctAnswerDetails: "",
// };

// question array to hold all available question objects
// need to set this up on load to add all the question objects based on the maxQuestionsAvailable amount
var availableQuestions = []; 


// get questions into the array for game play
loadAvailableQuestions();
// create the button for the user to start the game
getStarted();


// ----------------------------------------------------------------------------------------------------
// Load question objects into the availableQuestions array
// ----------------------------------------------------------------------------------------------------
function loadAvailableQuestions() {

	for (var i = 0; i < maxQuestionsAvailable; i++) {
		
		// add q# objects above to the availableQuestions array
		availableQuestions.push(eval("q"+(i+1))); // eval turns the string into a variable name
	}

	// console.log(availableQuestions);
}


// ----------------------------------------------------------------------------------------------------
// Setup Start View
// ----------------------------------------------------------------------------------------------------
function getStarted () {

	var startDiv = $("#timing-view");
	var startBtn = $("<button>");

	startBtn.attr("id", "start-btn");
	startBtn.attr("value", "Start");
	startBtn.text("Start");

	startDiv.append(startBtn);
}


// ----------------------------------------------------------------------------------------------------
// When Start button is clicked
// ----------------------------------------------------------------------------------------------------
$("#start-btn").on("click", function() {  

	console.log("start button clicked");
	
	// do {

	showTriviaQuestion();

	// } while (!timesUp && totalQuestionsAsked <= maxQuestionsAvailable);
		
	// // setup the question view
	// loadQuestionView();
	// // setup the answers for the new question
	// loadAnswerView();
	$("#start-btn").css("visibility","hidden");



});



// ----------------------------------------------------------------------------------------------------
// load Question view for user
// ----------------------------------------------------------------------------------------------------
function loadQuestionView() {

	// find the #question-view div to put the question into
	var newQuestionDiv = $("#question-view");

	// grab the question using the totalQuestionsAsked variable as a counter
	var newQuestion = availableQuestions[totalQuestionsAsked].question;

	// put the new Question into the div for user to see
	newQuestionDiv.text(newQuestion);

}



// ----------------------------------------------------------------------------------------------------
// display answers for current question to user
// ----------------------------------------------------------------------------------------------------
function loadAnswerView() {

	// find the #answer-choices div to put the answer into
	var newAnswerDiv = $("#answer-choices");
	// variable to hold the new answer choices divs
	var newAnswerChoices = "";

	// loop through the possible answers for the question
	for (var i = 0; i < availableQuestions[totalQuestionsAsked].answerChoices.length; i++) {
		
		// create new divs with each answer choice inside
		var newAnswerChoiceDiv = $("<div>");
		// add the answer choice text to the new div
		newAnswerChoiceDiv.text(availableQuestions[totalQuestionsAsked].answerChoices[i]);
		// add an id to the answer choice div
		newAnswerChoiceDiv.attr("id", i);

		// add the new answer choice div to the answer view
		newAnswerDiv.append(newAnswerChoiceDiv);

		// console.log(newAnswerChoices);
		
	}
	
	// grab the right answer for later evaluation
	currentRightAnswer = availableQuestions[totalQuestionsAsked].correctAnswer;
	// console.log(currentRightAnswer);

}

function loadTimerView() {

	// grab timer div items
	var timerDiv = $("#timing-view");
	console.log(timerDiv);

	timerDiv.prepend("Time Remaining: ")

}


function timerCountDown() {

	var timerCountSpan = $("#timer-count");
	
	// add count to the user view
	timerCountSpan.text(timeRemaining);
	
	if (timeRemaining === 0) {

		// console.log("clearing intervalID");
		// clear Interval timer countdown
        clearInterval(intervalID);

        // tell user time is up
        timerCountSpan.text("Times Up!");

        // run correct answer view
	}

	timeRemaining--;

}


// ----------------------------------------------------------------------------------------------------
//  show trivia question to user
// ----------------------------------------------------------------------------------------------------
function showTriviaQuestion() {

	// setup the question view
	loadQuestionView();
	// setup the answers for the new question
	loadAnswerView();
	// setup timer view
	loadTimerView();

	// set timer to total amount available
	timeRemaining = totalTime;

	// set up the timerCountDown function to run every sec (1000ms)
	intervalID = setInterval(timerCountDown, 1000);

}






// ----------------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------------






// ----------------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------------





// ----------------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------------
