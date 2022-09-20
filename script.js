const QUESTIONS = [["This is the first question",["A","B","C","D"],"2"],["This is the first question 2",["A","B","C","D"],"3"],["This is the first question 3",['true','flase'],'false'],["This is the first question 4",[1,10,30,67],45]];
var usedQuestions = [];
var time=10;

function question(qID){
    // let someInt=setInterval(function(){
    //     displayClock();
    //     if(time==0){
    //         clearInterval(someInt);
    //     }

    // },500);
    let question = document.getElementById('question-title');
    let answers = document.getElementById('answers');

    question.innerText = QUESTIONS[qID][0];
    // quiz();

    for(let answer of QUESTIONS[qID][1]){
        let tempListItem = document.createElement('li');
        let tempButton = document.createElement('button');

        tempButton.innerText=answer;

        tempListItem.appendChild(tempButton);
        answers.appendChild(tempListItem);
    }
}

function validateAnswer(answer,correctAnswer){
    let validatedAnswer = null;
    if(typeof(answer)==typeof(correctAnswer)){
        if(answer==correctAnswer){
            return true;
        }
    }else{
        switch(typeof(correctAnswer)){
            // case :
                
            // break;
            case Number:
                validatedAnswer = parseInt(answer);
            break;
        }

    }
}

function displayClock(){
    let target = document.getElementById('timer');
    target.innerText=time;
    time--;
} 

function quiz(v){
    // let someInt=setInterval(displayClock,500);
    question(v)
    let someInt=setInterval(function(){
        displayClock();
        if(time==0){
            clearInterval(someInt);
        }

    },500);
    // console.log(someInt);
}

// 

// console.log(typeof(4.2));