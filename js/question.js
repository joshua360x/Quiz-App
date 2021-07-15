
export default function Question(question, choices, answerKey) {
  this.question = question;
  this.choices = choices;
  this.answerKey = answerKey;
}


Question.prototype.isCorrect = function(guessKey) {
  return guessKey == this.answerKey
}


// sample code of how it is written when runned
// const q1 = new Question(
//   "Whats 1+1?",
//   [2,3,5,4],
//   0
//   )



// console.log(q1.isCorrect(1))

