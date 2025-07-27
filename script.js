// 7/27/25
// daily-challenges.html

let myScore = Number(localStorage.getItem('myScore')) || 0; // begining score is 0
const scoreMessage = document.getElementById(`userScore`);
const refreshMessage = document.getElementById(`refreshError`);
let generateCounter = 0;
let dailyChallengesDone = 0;
let days = 0; // TODO: days you completed all tasks
const challengeList = [
    `Go for a walk`,
    `Reflect on your day`,
    `Compliment a stranger`,
    `Make a new friend`,
    `Donate an item`,
    `Volunteer`,
    `Call someone you haven't talked to in a while`,
    `Help a stranger`,
    `Try a new food`,
    `Catch up with old friends`,
    `placeholderAction1`,
    `placeholderAction2`,
    `placeholderAction3`,
    `placeholderAction4`,
    `placeholderAction5`,
]

// perm score display
scoreMessage.textContent = `Score: ` + myScore;


function generateChallenges(){
    let shuffledChallengeList = challengeList.sort(() => Math.random() - 0.5); // shuffle
    const selectedChallengeList = shuffledChallengeList.slice(0, 3); // choose first 3 in shuffled list

    generateChallengeBoxes(selectedChallengeList);
    generateCounter++;
    console.log(generateCounter);
}

function generateChallengeBoxes(selectedChallengeList){
    const challengeListContainer = document.getElementById(`displayChallengeList`);
    challengeListContainer.innerHTML = ``;

    selectedChallengeList.forEach((action, i) => { // for each challenge (action) in the selected list of 3
        const box = document.createElement(`div`);
        box.className = `challengeBox`;
        // box.textContent = `${i + 1}. ${action}`;
        box.innerHTML = `
        ${i + 1}. ${action}
        <br><br>
        <button id="doneButton" onclick="markAsDone(this)">Mark as Done</button>
        `; // note 1
        challengeListContainer.appendChild(box)
    });
}

function generateTodaysChallenges(){
    if(generateCounter > 2){
        refreshMessage.textContent = `Please attempt the current challenges.`;
    }
    else if(generateCounter > 0){
        refreshMessage.textContent = `Please use "Refresh" to generate new tasks!`;
    }
    else{
        refreshMessage.textContent = ``;
        generateChallenges();
    }
}

function refresh(){
    let refreshButton = document.getElementById(`refreshButton`);

    if(generateCounter == 0){
        refreshMessage.textContent = `Please generate today's challenges first!`;
        refreshButton.disabled = true; // note 2 // TODO: should disable on when load window (window.onload)
    }
    else if(generateCounter > 2){
        refreshMessage.textContent = `You don't have any refreshes left! Please attempt the current challenges.`;
        refreshButton.disabled = true;
        return;
    }
    else{
        refreshMessage.textContent = ``;
        generateChallenges();
    }
}

function resetScore(){
    const resetMessage = document.getElementById(`resetMessage`);
    const resetButton = document.getElementById(`resetButton`);

    if(myScore > 0){
        myScore = 0;
        localStorage.setItem(`myScore`, myScore);

        scoreMessage.textContent = `Score: ` + myScore;
        resetMessage.textContent = `Your score has been reset.`;
        resetButton.disabled = true;
    }
    else{
        resetButton.disabled = true;
    }
}

function markAsDone(button){
    button.disabled = true;
    button.textContent = `Challenge Completed!`;

    myScore++;
    localStorage.setItem(`myScore`, myScore)
    scoreMessage.textContent = `Score: ` + myScore;
}
    

/*
    NOTES:

    Note 1
        - .innerHTML allows you to set what appears in the html from the js file :D

    Note 2
        - myButton.style.display = `none`; // hides button
*/