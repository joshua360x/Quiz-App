

export default function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentIndex]
}

Quiz.prototype.nextIndex = function() {
  this.currentIndex++;
}

Quiz.prototype.hasEnded = function() {
  return this.currentIndex == this.questions.length
}

Quiz.prototype.guess = function(userGuess) {
  const currentQuestion = this.questions[this.currentIndex]
  if(currentQuestion.isCorrect(userGuess)) {
    this.score++
  }

  this.nextIndex();
}

Quiz.prototype.reset = function() {
  this.score = 0;
  this.currentIndex = 0;
}

// sample code of how it is written when runned
// const q1 = new Question();
// const q2 = new Question();
// const q3 = new Question();

// const qArray = [q1, q2, q3]

// const myQuiz = new Quiz(qArray)
// console.log(myQuiz)



// THIS SAMPLE CODE TEST ALL THE PROTOTYPES MADE 
// console.log(myQuiz.getCurrentQuestion())
// // button was clicked 
// myQuiz.nextIndex();
// console.log(myQuiz.getCurrentQuestion())
// myQuiz.nextIndex();
// console.log(myQuiz.getCurrentQuestion())
// myQuiz.nextIndex()
// console.log(myQuiz.hasEnded())










