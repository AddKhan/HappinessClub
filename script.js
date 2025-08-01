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
    { category: `health`, text: `Go for a walk 🚶`},
    { category: [`health`, `social`], text: `Play a sport 🏓`},
    { category: `health`, text: `Clean your home 🏠`},
    { category: [`health`, `social`], text: `Go out of your comfort zone 🪂`},
    { category: `health`, text: `Reflect on your day ✏️`},
    { category: `social`, text: `Compliment a stranger 💐`},
    { category: `social`, text: `Make a new friend 💛`},
    { category: `social`, text: `Donate an item 🎁`},
    { category: `social`, text: `Volunteer at a local shelter 🤝`},
    { category: `social`, text: `Call someone you haven't talked to in a while ☎️`},
    { category: `social`, text: `Help a stranger 🤝`},
    { category: `creative`, text: `Try a new food 🍔`},
    { category: `social`, text: `Catch up with old friends 🧑‍🤝‍🧑`},
    { category: [`social, creative`], text: `Learn a new game 🎲`},
    { category: [`health`, `creative`], text: `Pick up an old hobby 🖍️`},
    { category: `creative`, text: `Grow a plant 🌱`},
    { category: [`health`, `social`], text: `Explore a new area 🚗`},
    { category: `social`, text: `Join a club ♣️`},
    { category: `social`, text: `Attend an event at the local library 📖`},
    { category: [`health`, `creative`], text: `Try a new recipe 🥘`} //TODO: 5:50 pm 8/1 --> extract categories and work on general challenges first, then do specific challenge list generation
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

function generateTodaysChallenges(challengeCategory, targetContainer, thisButton){
    generateChallenges(challengeCategory, targetContainer, thisButton);
    document.getElementById(`todaysChallengesButton`).style.display = `none`;
    refreshButton.disabled = false;
}

function generateChallenges(challengeCategory, targetContainer, thisButton){
    let filteredList = challengeList;
    let shuffledChallengeList;
    
    if([`health`, `social`, `creative`].includes(challengeCategory)){
        filteredList = challengeList.filter(action => action.category.includes(challengeCategory) && action.category)
        thisButton.disabled = true;
    }
    
    shuffledChallengeList = filteredList.sort(() => Math.random() - 0.5); // shuffle
    const selectedChallengeList = shuffledChallengeList.slice(0, 3); // choose first 3 in shuffled list

    generateChallengeBoxes(selectedChallengeList, targetContainer);
    generateCounter++;
}

function generateChallengeBoxes(selectedChallengeList, targetContainer){
    const challengeListContainer = document.getElementById(targetContainer);
    challengeListContainer.innerHTML = ``;

    selectedChallengeList.forEach((action, i) => { // for each challenge (action) in the selected list of 3
        const box = document.createElement(`div`);
        box.className = `challengeBox`;
        // box.textContent = `${i + 1}. ${action}`;
        box.innerHTML = `
        ${i + 1}. ${action.text}
        <!-- TODO: optional, add ${action.description} if want descp of challenge-->
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

function refresh(challengeCategory, targetContainer, thisButton){
    if(refreshLeft > 0){
        refreshLeft--;
        refreshLeftMessage.textContent = `You have ${refreshLeft} refresh left.`;
        generateChallenges(challengeCategory, targetContainer, thisButton);
    }
    else{
        refreshMessage.textContent = ``;
        generateChallenges(challengeCategory, targetContainer, thisButton);
    }

    if(refreshLeft == 0){
        refreshLeftMessage.textContent = ``;
        refreshMessage.textContent = `You don't have any refreshes left! Please attempt the current challenges or generate by category.`;
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