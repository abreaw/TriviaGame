

// ----------------------------------------------------------------------------------------------------
// Global Variables Setup
// ----------------------------------------------------------------------------------------------------

// timer amount for each question
var totalTime = 15; // 15 secs
// timer for between questions
var betweenQsTime = 5; // 5 secs
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
// current question object
var currentQuestObj;
// times up variable
var timesUp = false;
// wrong answer selected variable
var wrongAnswer = false;
// timer ID
var intervalID;

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    timesUpMsg: "Sorry you didn't select an answer in time.",
    wrongAnsMsg: "That is not the correct answer.",
    attackEnemy: "Click the 'Attack' button to battle.",
    youLost: "You have been defeated! Pick wisely next time you must!",
    youWon: "Yay! You won!",

};


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


// ----------------------------------------------------------------------------------------------------
// Grab all div objects that will be updated throughout the game
// ----------------------------------------------------------------------------------------------------

// find the #question-view div to put the question into
var newQuestionDiv = $("#question-view");
// find the #answer-choices div to put the answer into
var newAnswerDiv = $("#answer-choices");
// grab timer div items
var timerDiv = $("#timing-view");
var timerCountSpan = $("#timer-count");


// ----------------------------------------------------------------------------------------------------
// setup the game
// ----------------------------------------------------------------------------------------------------

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

	showTriviaQuestion(true);

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

	// grab the current question object for use in other functions
	currentQuestObj = availableQuestions[totalQuestionsAsked]

	// put the new Question into the div for user to see
	newQuestionDiv.text(currentQuestObj.question);

}



// ----------------------------------------------------------------------------------------------------
// display answers for current question to user
// ----------------------------------------------------------------------------------------------------
function loadAnswerView() {

	// variable to hold the new answer choices divs
	var newAnswerChoices = "";

	// loop through the possible answers for the question
	for (var i = 0; i < currentQuestObj.answerChoices.length; i++) { 
		
		// create new divs with each answer choice inside
		var newAnswerChoiceDiv = $("<div>");
		// add the answer choice text to the new div
		newAnswerChoiceDiv.text(currentQuestObj.answerChoices[i]);
		// add an id to the answer choice div
		newAnswerChoiceDiv.attr("id", i);

		// add the new answer choice div to the answer view
		newAnswerDiv.append(newAnswerChoiceDiv);

		// console.log(newAnswerChoices);
		
	}
	
}

function loadTimerView() {

	// grab timer div items
	// var timerDiv = $("#timing-view");
	
	// add text to the timer div
	timerDiv.prepend("Time Remaining: ");
	timerCountSpan.text(timeRemaining);

}


function timerCountDown() {

	// var timerCountSpan = $("#timer-count");
	
	// add count to the user view
	timerCountSpan.text(timeRemaining);
	
	if (timeRemaining === 0) {

		// console.log("clearing intervalID");
		// clear Interval timer countdown
        clearInterval(intervalID);

        // tell user time is up
        timerCountSpan.text("Times Up!");

        // set timesUp variable to true
        timesUp = true;

        // run correct answer view
        setupCorrectAnsView();
	}

	timeRemaining--;

}


// ----------------------------------------------------------------------------------------------------
//  show trivia question to user
// ----------------------------------------------------------------------------------------------------
function showTriviaQuestion(isNewGame) {

	if (!isNewGame) {
		// refresh the divs / variables
		resetQuestionItems();
	}
	
	// set timer to total amount available
	timeRemaining = totalTime;

	// setup the question view
	loadQuestionView();
	// setup the answers for the new question
	loadAnswerView();
	// setup timer view
	loadTimerView();

	// // set timer to total amount available
	// timeRemaining = totalTime;

	// set up the timerCountDown function to run every sec (1000ms)
	intervalID = setInterval(timerCountDown, 1000);

}






// ----------------------------------------------------------------------------------------------------
//  load correct answer view
// ----------------------------------------------------------------------------------------------------
function setupCorrectAnsView() {

	// add user message to newQuestionDiv
	if (timesUp) {
		newQuestionDiv.text(userMessages.timesUpMsg);
	}

	if (wrongAnswer) {
		newQuestionDiv.text(userMessages.wrongAnsMsg);
	}

	// show correct answer to user
	newAnswerDiv.text(currentQuestObj.answerChoices[currentQuestObj.correctAnswer]);

	//  after 5 seconds, execute the showTriviaQuestion function
    setTimeout(function() {showTriviaQuestion()}, 1000*betweenQsTime);

}



// ----------------------------------------------------------------------------------------------------
// reset variables and divs views
// ----------------------------------------------------------------------------------------------------
function resetQuestionItems() {

	// set the variables checked back to false
	timesUp = false;
	wrongAnswer = false;

	// increment questions asked to go to next question when loaded
	totalQuestionsAsked++;

	// clear out the divs for the new question / answers to be displayed
	newQuestionDiv.text("");
	newAnswerDiv.text("");
	timerDiv.text("");
	timerCountSpan.text("");

}




// ----------------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------------
