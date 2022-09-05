function Question(qtext, option, ans) {
    this.qtext = qtext;
    this.option = option;
    this.ans = ans;
  }
  
  function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.qIndex = 0;
  }
  
  Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.qIndex];
  }
  
  Quiz.prototype.checkOptionWithAns = function(ans) {
    if(this.getQuestionByIndex().isCorrectAns(ans)) {
        this.score++;
    }
  
    this.qIndex++;
  }
  
  Quiz.prototype.quizIsEnded = function() {
    return this.qIndex === this.questions.length;
  }
  
  
 
  
  Question.prototype.isCorrectAns = function(choice) {
    return this.ans === choice;
  }
  
  
  function loadAQuestion() {
    if(quiz.quizIsEnded()) {
        showScores();
    }
    else {
        // show question
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().qtext;
  
        // show options
        let option = quiz.getQuestionByIndex().option;
        for(let i = 0; i < option.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerHTML = option[i];
            handleOptionButton("btn" + i, option[i]);
        }
  
        showProgress();
    }
  };
  
  function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionWithAns(choice);
        loadAQuestion();
    }
  };
   
  
  let questions = [
    new Question("JavaScript supports", [
      "Functions", "XHTML","CSS", "HTML"], 
    "Functions"),
    new Question("Which language is used for styling web pages?", 
    ["HTML", "JQuery", "CSS", "XML"], 
    "CSS"),
    new Question("Which is not a JavaScript Framework?", [
      "Python Script", "JQuery","Django", "NodeJS"], 
    "Django"),
    new Question("Which is used for Connect To Database?", [
      "PHP", "HTML", "JS", "All"], 
    "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], 
    "Programming Language")
  ];
  
  let quiz = new Quiz(questions);
  
  loadAQuestion();

  function showScores() {
    let result = "<h1>Result</h1>";
    result += "<h2 id='score'> Your score is " + quiz.score + " percentage is "+(quiz.score/questions.length*100)+"%"+"</h2>";
    let element = document.getElementById("quiz");
    element.innerHTML = result;
  };

  function showProgress() {
    let currentQuestionNumber = quiz.qIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };