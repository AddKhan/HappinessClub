// 7/27/25
// daily-challenges.html

let myScore = Number(localStorage.getItem('myScore')) || 0; // begining score is 0
let refreshMessage = document.getElementById(`refreshError`);
let generateCounter = 0;
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
document.getElementById(`userScore`).textContent = `Score: ` + myScore;


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
    if(generateCounter == 0){
        refreshMessage.textContent = `Please generate today's challenges first!`;
        // TODO: add button blackedout ?
    }
    else if(generateCounter > 2){
        refreshMessage.textContent = `You don't have any refreshes left! Please attempt the current challenges.`;
        // TODO: add button blackedout ?
        return;
    }
    else{
        refreshMessage.textContent = ``;
        generateChallenges();
    }
}

function markAsDone(button){
    button.disabled = true;
    button.textContent = `Challenge Completed!`;

    myScore++;
    localStorage.setItem(`myScore`, myScore)
    document.getElementById(`userScore`).textContent = `Score: ` + myScore;
}
    

/*
    NOTES:

    Note 1
        - .innerHTML allows you to set what appears in the html from the js file :D
*/