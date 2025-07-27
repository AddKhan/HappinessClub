// 7/27/25
// daily-challenges.html

// variables

// score
let myScore = Number(localStorage.getItem('myScore')) || 0; // begining score is 0

// DOI elements
const scoreMessage = document.getElementById(`userScore`);
const refreshMessage = document.getElementById(`refreshError`);
const resetButton = document.getElementById(`resetButton`);
const refreshButton = document.getElementById(`refreshButton`);

//counters
let generateCounter = 0;
let dailyChallengesDone = 0; // TODO
let days = 0; // TODO: days you completed all tasks

//challenge list
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

// window onload TODO

// perm score display
scoreMessage.textContent = `Score: ` + myScore;
if(myScore == 0){
    resetButton.disabled = true;
}
if(generateCounter == 0){
    refreshButton.disabled = true;
}

///////////////////////////////////////////////////////////

function generateChallenges(){
    let shuffledChallengeList = challengeList.sort(() => Math.random() - 0.5); // shuffle
    const selectedChallengeList = shuffledChallengeList.slice(0, 3); // choose first 3 in shuffled list

    generateChallengeBoxes(selectedChallengeList);
    generateCounter++;
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
    generateChallenges();
    document.getElementById(`todaysChallengesButton`).style.display = `none`;
    refreshButton.disabled = false;
}

function refresh(){// here 
    if(generateCounter > 2){
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

    if(myScore > 0){
        myScore = 0;
        localStorage.setItem(`myScore`, myScore);

        scoreMessage.textContent = `Score: ` + myScore;
        resetMessage.textContent = `Your score has been reset.`;
        resetButton.disabled = true;
    }
    else{
        resetButton.disabled = true;
        console.log(`reset else caught`); // todo: test if this works, if not delete
    }
}

function markAsDone(button){
    button.disabled = true;
    button.textContent = `Challenge Completed!`;

    myScore++;
    localStorage.setItem(`myScore`, myScore)
    scoreMessage.textContent = `Score: ` + myScore;
    resetButton.disabled = false;
}
    

/*
    NOTES:

    Note 1
        - .innerHTML allows you to set what appears in the html from the js file :D

    Note 2
        - myButton.style.display = `none`; // hides button
*/