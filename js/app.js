
import Question from "./question.js"
import Quiz from "./quiz.js"


const App = (() => {

  //cache the DOM (putting all the DOM elements needed in variables)
  const quizEl = document.querySelector(".jabquiz");
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const taglineEL = document.querySelector(".jabquiz__tagline");
  const choicesEL = document.querySelector(".jabquiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  const q1 = new Question(
    "Who was the first president of the US?",
    ['George Washington', 'Samuel Adams', 'Bill Clinton', 'Monalisa'],
    0
  )

  const q2 = new Question(
    "How many rings are on the Olympic flag?",
    ['9', '8', '6', '5'],
    3
  )
  const q3 = new Question(
    "How many black spots are in a standard soccer ball",
    ['10', '20', '12', '7'],
    2
  )  

  const q4 = new Question(
    "Which of these animals does NOT appear in the Chinese zodiac?",
    ['Dragon', 'Bear', 'Dog', 'Rabbit'],
    1
  )


  const q5 = new Question(
    "How many friends can be loss in a game of Monopoly?",
    ['1', 'Depends', '10', 'All of Them'],
    3
  )

  
  
  const quiz = new Quiz([q1,q2,q3,q4,q5])

  const listeners = _ => {
    nextButtonEl.addEventListener("click", function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
      if(selectedRadioElem) {
        const key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key)
        renderAll();
      }
    })

    restartButtonEl.addEventListener("click", function() {
      setValue(taglineEL, 'Pick an Option Below');
     //1. reset the quiz
     quiz.reset();
     //2. renderAll
     renderAll();
     //3. restore next button
     nextButtonEl.style.opacity = 1;
    })
  }





  // easier way to manipulate text within DOM, nice little function
  const setValue = (elem, value) => {
    elem.innerHTML = value;
  }
  
  const renderQuestion = _ => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
   }

const renderChoicesElements = _ => {
  let markup = "";
  const currentChoices = quiz.getCurrentQuestion().choices;
  currentChoices.forEach((elem, index) => {
    markup+= `
    <li class="jabquiz__choice">
              <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}" >
              <label for="choice${index}" class="jabquiz__label">
                <i></i>
                <span>${elem}</span>
              </label>
            </li>
    `

  });

  setValue(choicesEL, markup);
}


  const renderTracker = _ => {
    const index = quiz.currentIndex
    setValue(trackerEl, `${index+1} of ${quiz.questions.length}`)
  }

  const getPercentage = (num1, num2) => {
    return Math.round((num1/num2)*100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if(width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%";
      }

    }, 3)
  }

  const renderProgress = _ => {
    //1. width
    const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length)
    //2. launch(0, width)
    launch(0,currentWidth)

  }

  const renderEndScreen = _ => {
    setValue(quizQuestionEl, 'See Score Below!');
    setValue(taglineEL, 'Complete');
    setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
    nextButtonEl.style.opacity = 0;
    renderProgress();
  }
  
  const renderAll = _ => {
    if(quiz.hasEnded()) {
      //renderEndScreen
      renderEndScreen();
    } else {
      // 1. render the question
      renderQuestion();
      // 2. render the the choices
      renderChoicesElements();
      // 3. render the tracker
      renderTracker();
      // 4. render the progress
      renderProgress();
    }
  }


  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();


App.renderAll();
App.listeners();













// this is a way understanding the code when you put the modules together 
// const q1 = new Question(
//   'what us 2 plus 2',
//   [5.3,2.4],
//   2
// );
// const q2 = new Question(
//   'what si fine gold',
//   ['AU','SU','PA'],
//   0
// );
// const q3 = new Question();

// const qArray = [q1, q2, q3]


// const myQuiz = new Quiz(qArray)
// console.log(myQuiz.getCurrentQuestion())
// // button was clicked 
// myQuiz.nextIndex();
// console.log(myQuiz.getCurrentQuestion())
// myQuiz.nextIndex();
// console.log(myQuiz.getCurrentQuestion())
// myQuiz.nextIndex()
// // console.log(myQuiz.guess())

// console.log(myQuiz.hasEnded())

