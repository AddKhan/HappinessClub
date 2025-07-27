// 7/27/25
// daily-challenges.html

let myScore = Number(localStorage.getItem('myScore')) || 0; // begining score is 0
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

function generateChallenges(){
    let shuffledChallengeList = challengeList.sort(() => Math.random() - 0.5); // shuffle
    const selectedChallengeList = shuffledChallengeList.slice(0, 3); // choose first 3 in shuffled list

    console.log('hello1'); // delete

    generateChallengeBoxes(selectedChallengeList);
}

function generateChallengeBoxes(selectedChallengeList){
    const challengeListContainer = document.getElementById(`displayChallengeList`);
    challengeListContainer.innerHTML = ``;

    selectedChallengeList.forEach(action => {
        const box = document.createElement(`div`);
        box.className = `challenge-box`;
        box.textContent = action;
        challengeListContainer.appendChild(box)
    });

    console.log('hello2'); // delete
}