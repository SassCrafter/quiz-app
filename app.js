const quiz = [
    {
        question: 'Which company developed JavaScript?',
        a: 'Netscape',
        b: 'Samsung',
        c: 'Apple',
        correct: 'a'
    },
    {
        question: 'What is 32 + 64?',
        a: '20',
        b: '96',
        c: 'NaN',
        correct: 'b'
    },
    {
        question: 'How was the 2020?',
        a: 'Awesome',
        b: 'Fuck it',
        c: 'What??',
        correct: 'c'
    },
    {
        question: 'How to get a random from 0 to 9 number in JS?',
        a: 'math.floor(math.Random() * 10);',
        b: 'Math.floor(Math.Random() * 10);',
        c: 'Math.floor(Math.random() * 10);',
        correct: 'c'
    }
];


function loadQuiz() {
    const currentQuiz = quiz[currentQuestion];
    qEl.innerHTML = currentQuiz.question;
    a_text.innerHTML = currentQuiz.a;
    b_text.innerHTML = currentQuiz.b;
    c_text.innerHTML = currentQuiz.c;
}

function checkNextQuiz() {
    let retValue = false;
    if (qLeft >= 1) {
        inputs.forEach(input => {
            if (input.checked) {
                retValue = true;
            } else {
             retValue = false;
            }
        })
    }
    return retValue;
}

const addClassOnClick = (el,addClass) => el.forEach(x => { x.classList.add(addClass)});
const removeClassOnClick = (el,addClass) => el.forEach(x => { x.classList.remove(addClass)});

function addRemoveClassClick(arr) {
    arr.forEach(element => {
        element.addEventListener('click', () => {
            arr.forEach(el => {
                el.classList.remove('selected');
            })
            element.classList.add('selected');
        })
    });
}
function unselectInput() {
    const input = document.querySelector('input[type=radio]:checked');
    if (input) {
        input.checked = false;
        removeClassOnClick(answers,'selected');
    }
}

function showQuestionNumber() {
    q_answered.innerHTML = qCount;
    q_left.innerHTML = qLeft;
}

function countCorrect() {
    const input = document.querySelector('input[type=radio]:checked');
    const correctAnswer = quiz[currentQuestion].correct;
    console.log(correctAnswer);
    if (correctAnswer === input.id) {
        correctCount++;
    }
}


const qEl = document.querySelector('.question');
const q_answered = document.querySelector('.q-answered');
const q_left = document.querySelector('.q-left');
const a_text = document.getElementById('a-choice');
const b_text = document.getElementById('b-choice');
const c_text = document.getElementById('c-choice');
const inputs = document.querySelectorAll('input[type=radio]');
const answers = document.querySelectorAll('li');
const submitBtn = document.getElementById('submit-btn');
const correctEl = document.getElementById('correct');
const wrongEl = document.getElementById('wrong');
const results = document.querySelector('.results');



let correctCount = 0;
let currentQuestion = 0;
let qCount = 0;
let qLeft = quiz.length;

loadQuiz();
showQuestionNumber();
addRemoveClassClick(answers);

submitBtn.addEventListener('click', () => {
    if(checkNextQuiz && qCount !== quiz.length) {
        countCorrect();
        qCount++;
        qLeft--;
        currentQuestion++;
        loadQuiz();
        showQuestionNumber();
        unselectInput();
        

    } else {
        console.log("End");
        showQuestionNumber();
        correctEl.innerHTML = correctCount;
        wrongEl.innerHTML = quiz.length - correctCount;
        results.classList.add('show');
        return
    }
    //currentQuestion++;
    //loadQuiz();
});

