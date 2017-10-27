

// ----------------------------------------------------------------------------------------------------
// Global Variables Setup
// ----------------------------------------------------------------------------------------------------

// new game on start reset
var newGame = true;
// timer amount for each question
var totalTime = 10; // 15 secs
// timer for between questions
var betweenQsTime = 5; // 7 secs
// answer selected by user (could be a local variable?)
var answerSelected = -1;
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
var maxQuestionsAvailable = 10; // update this to be equal to all the question objects added below
// current correct answer
var currentRightAnswer;  // may not need this
// current question object
var currentQuestObj;
// times up variable
var timesUp = false;
// wrong answer selected variable
var wrongAnswer = false;
// right answer selected variable
var rightAnswer = false;
// timer ID
var intervalID;

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    timesUpMsg: "Sorry you didn't select an answer in time.",
    wrongAnsMsg: " is the wrong answer. Sorry!",
    rightAnsMsg: "That's right! Great job!",
    gameOverMsg: "Thanks for playing!",

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

var q5 = {

	question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
	answerChoices: ["A. home computer", "B. compact disk player", "C. cordless phone", "D. dishwasher"],
	correctAnswer: 1,
	questionTheme: "Electronics",
	correctAnswerDetails: "",
};

var q6 = {

	question: "Who holds the record for the most victories in a row on the professional golf tour?",
	answerChoices: ["A. Jack Nicklaus", "B. Arnold Palmer", "C. Byron Nelson", "D. Ben Hogan"],
	correctAnswer: 2,
	questionTheme: "Sports",
	correctAnswerDetails: "",
};

var q7 = {

	question: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
	answerChoices: ["A. Reggie Jackson", "B. Harmon Killebrew", "C. Willie Mays", "D. Frank Robinson"],
	correctAnswer: 2,
	questionTheme: "",
	correctAnswerDetails: "",
};

var q8 = {

	question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
	answerChoices: ["A. 8", "B. 18", "C. 38", "D. 58"],
	correctAnswer: 1,
	questionTheme: "",
	correctAnswerDetails: "",
};

var q9 = {

	question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
	answerChoices: ["A. cocker spaniel", "B. German shepherd", "C. Labrador retriever", "D. poodle"],
	correctAnswer: 0,
	questionTheme: "",
	correctAnswerDetails: "",
};

var q10 = {

	question: "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
	answerChoices: ["A. 10 percent", "B. 15 percent", "C. 31 percent", "D. 51 percent"],
	correctAnswer: 2,
	questionTheme: "",
	correctAnswerDetails: "",
};

// var q? = {

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

// find the #msg-view div to put user msgs into
var msgView = $("#msg-view");
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


// ----------------------------------------------------------------------------------------------------
// Load question objects into the availableQuestions array
// ----------------------------------------------------------------------------------------------------
function loadAvailableQuestions() {

	for (var i = 0; i < maxQuestionsAvailable; i++) {
		
		// add q# objects above to the availableQuestions array
		availableQuestions.push(eval("q"+(i+1))); // eval turns the string into a variable name
	}

	// create the button for the user to start the game
	getStarted();

}


// ----------------------------------------------------------------------------------------------------
// Setup Start View
// ----------------------------------------------------------------------------------------------------
function getStarted () {

	var startDiv = $("#contents");
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
	
	showTriviaQuestion(newGame);

	// no longer new game so set to false
	newGame = false;

	$("#start-btn").css("visibility","hidden");

});



// ----------------------------------------------------------------------------------------------------
//  when an answer div clicked
// ----------------------------------------------------------------------------------------------------
$("#answer-choices").on("click", ".answer-btns", function() {  

	console.log("answer clicked");

	// set answer selected by the user to the answerSelected variable
	answerSelected = $(this).attr("id");

	console.log(answerSelected);
	
	// check answer selected against the currentQuestObj.correctAnswer
	if (answerSelected == currentQuestObj.correctAnswer) {

		console.log("correct answer guessed");
		rightAnswer = true;
		totalCorrect++;

	} else {

		console.log("not the correct answer guessed");
		wrongAnswer = true;
		totalIncorrect++;

	}

	// setupCorrectAnsView();

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
		var newAnswerChoiceDiv = $("<button class='answer-btns'>");
		// add the answer choice text to the new div
		newAnswerChoiceDiv.text(currentQuestObj.answerChoices[i]);
		// add an id to the answer choice div
		newAnswerChoiceDiv.attr("id", i);

		// add the new answer choice div to the answer view
		newAnswerDiv.append(newAnswerChoiceDiv);

		newAnswerDiv.append("<br>");

		// console.log(newAnswerChoices);
		
	}
	
}


// ----------------------------------------------------------------------------------------------------
//  Display the time remaining heading
// ----------------------------------------------------------------------------------------------------
function loadTimerView() {

	console.log(timerCountSpan);
	// add text to the timer div
	timerDiv.prepend("Time Remaining: ");
	timerCountSpan.text(timeRemaining);

}

// ----------------------------------------------------------------------------------------------------
//  Display the timer count down
// ----------------------------------------------------------------------------------------------------
function timerCountDown() {

	// add count to the user view
	timerCountSpan.text(timeRemaining);
	
	if (timeRemaining === 0 || answerSelected > -1) {

		// clear Interval timer countdown
        clearInterval(intervalID);

        if (timeRemaining === 0) {
	        // tell user time is up
	        timerCountSpan.text("Times Up!");

	        // set timesUp variable to true
	        timesUp = true;
	    }

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

	// check to see if all questions have been asked
	if (totalQuestionsAsked === maxQuestionsAvailable || totalQuestionsAsked === maxQuestionCount) {

		// setup game over view w/ stats
		roundOverView();

	} else {

		// setup the question view
		loadQuestionView();
		// setup the answers for the new question
		loadAnswerView();
		// setup timer view
		loadTimerView();

		// set up the timerCountDown function to run every sec (1000ms)
		intervalID = setInterval(timerCountDown, 1000);

		console.log("total questions asked = " + totalQuestionsAsked);

		// increment questions asked to go to next question when loaded
		totalQuestionsAsked++;
	}

}



// ----------------------------------------------------------------------------------------------------
//  load correct answer view
// ----------------------------------------------------------------------------------------------------
function setupCorrectAnsView() {

	// add user message to newQuestionDiv
	if (timesUp) {
		msgView.text(userMessages.timesUpMsg);
	}

	if (wrongAnswer) {
		msgView.text("Your guess of "+ currentQuestObj.answerChoices[answerSelected] + " " + userMessages.wrongAnsMsg);
	}

	if (rightAnswer) {
		msgView.text(userMessages.rightAnsMsg);
	}

	// show correct answer to user
	newAnswerDiv.text(currentQuestObj.answerChoices[currentQuestObj.correctAnswer]);

	//  after 5 seconds, execute the showTriviaQuestion function
    setTimeout(function() {showTriviaQuestion(newGame)}, 1000*betweenQsTime);
    
}



// ----------------------------------------------------------------------------------------------------
// reset variables and divs views
// ----------------------------------------------------------------------------------------------------
function resetQuestionItems() {

	// set the variables checked back to false
	timesUp = false;
	wrongAnswer = false;
	rightAnswer = false;
	answerSelected = -1;

	// clear out the divs for the new question / answers to be displayed
	msgView.text("");
	newQuestionDiv.text("");
	newAnswerDiv.text("");
	timerCountSpan.text("");
	timerDiv.html(timerCountSpan);
	
}

// ----------------------------------------------------------------------------------------------------
// Round / Game Over
// ----------------------------------------------------------------------------------------------------
function roundOverView() {

	// call reset Question Items ??
	resetQuestionItems();
	
	// show stats view to user
	msgView.text(userMessages.gameOverMsg);
	newQuestionDiv.text("Out of " + totalQuestionsAsked + " questions.");
	newAnswerDiv.text("You got " + totalCorrect + " correct. That is " + (totalCorrect/totalQuestionsAsked)*100 + "% right.");
	newAnswerDiv.append("<br>You got " + totalIncorrect + " wrong. That is " + (totalIncorrect/totalQuestionsAsked)*100 + "% wrong.");

	// reset totalQuestions & other global counters
	totalIncorrect = 0;
	totalCorrect = 0;
	totalQuestionsAsked = 0;

	// show start button to replay ... might add this later for future rounds to be played
	// $("#start-btn").css("visibility","visible");
}


// ----------------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------------
