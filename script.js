// 7/27/25
// daily-challenges.html

// variables

// score
let myScore = Number(localStorage.getItem('myScore')) || 0; // begining score is 0

// DOI elements
const scoreMessage = document.getElementById(`userScore`);
const refreshMessage = document.getElementById(`refreshError`);
const refreshLeftMessage = document.getElementById(`refreshLeft`);
const resetButton = document.getElementById(`resetButton`);
const refreshButton = document.getElementById(`refreshButton`);

//counters
let generateCounter = 0;
let refreshLeft = 2;
let dailyChallengesDone = 0; // TODO: make a limit to daily challenges done (3), would need to figure out time keeping first ?
let days = 0; // TODO: days you completed all tasks

//challenge list
const challengeList = [
    `Go for a walk 🚶`,
    `Reflect on your day ✏️`,
    `Compliment a stranger 💐`,
    `Make a new friend 💛`,
    `Donate an item 🎁`,
    `Volunteer at a local shelter 🤝`,
    `Call someone you haven't talked to in a while ☎️`,
    `Help a stranger 🤝`,
    `Try a new food 🍔`,
    `Catch up with old friends 🧑‍🤝‍🧑`,
    `Learn a new game 🎲`,
    `Play a sport 🏓`,
    `Pick up an old hobby 🖍️`,
    `Grow a plant 🌱`,
    `Clean your home 🏠`,
    `Go out of your comfort zone 🪂`,
    `Explore a new area 🚗`,
    `Try a new recipe 🥘`
]

// runs on page load
document.addEventListener("DOMContentLoaded", function(){
    // permanent score display
    scoreMessage.textContent = `Score: ` + myScore;

    if(myScore == 0){
        resetButton.disabled = true;
    }

    if(generateCounter == 0){
        refreshButton.disabled = true;
    }
});

///////////////////////////////////////////////////////////

function generateTodaysChallenges(){
    generateChallenges();
    document.getElementById(`todaysChallengesButton`).style.display = `none`;
    refreshButton.disabled = false;
}

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
        <button onclick="markAsDone(this)" id="doneButton" class="challengeButtons">✅ Mark as Done</button>
        `; // note 1 // TODO: future, want doneButton to be in challengeButtons class to delete extra css (they have same func...)
        challengeListContainer.appendChild(box)
    });
}

function markAsDone(button){
    button.disabled = true;
    button.parentElement.classList.add('disabledBox');
    button.textContent = `Challenge Completed! 🎉`;

    myScore++;
    localStorage.setItem(`myScore`, myScore)
    scoreMessage.textContent = `Score: ` + myScore;
    resetButton.disabled = false;
}

function refresh(){
    if(refreshLeft > 0){
        refreshLeft--;
        refreshLeftMessage.textContent = `You have ${refreshLeft} refresh left.`;
        generateChallenges();
    }
    else{
        refreshMessage.textContent = ``;
        generateChallenges();
    }

    if(refreshLeft == 0){
        refreshLeftMessage.textContent = ``;
        refreshMessage.textContent = `You don't have any refreshes left! Please attempt the current challenges.`;
        refreshButton.disabled = true;
    }
}

function resetScore(){
    const resetMessage = document.getElementById(`resetMessage`);

    if(myScore > 0){
        myScore = 0;
        localStorage.setItem(`myScore`, myScore);

        scoreMessage.textContent = `Score: ${myScore}`;
        resetMessage.textContent = `Your score has been reset.`;
        resetButton.disabled = true;
    }
    else{
        resetButton.disabled = true;
        console.log(`reset else caught`); // todo: test if this works, if not delete
    }
}
    
/*
    NOTES:

    Note 1
        - .innerHTML allows you to set what appears in the html from the js file :D

    Note 2
        - myButton.style.display = `none`; // hides button
*/