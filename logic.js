const game = new Logic();

let yatziModel = [
    {value: 0, hold: false, rollDice: clickDice()},
    {value: 0, hold: false, rollDice: clickDice()},
    {value: 0, hold: false, rollDice: clickDice()},
    {value: 0, hold: false, rollDice: clickDice()},
    {value: 0, hold: false, rollDice: clickDice()}

]

let throwCount = 0;

function throwDice() {
    for (const die of yatziModel) {
        if(die.hold === false) {
            die[value] = Math.floor(Math.random() * 6) + 1;
        }
        throwCount++
    }
}

const rollBtn = document.getElementById("rollBtn");
const throwsLeftText = document.getElementById("throwsLeft");

// Kast-knap
rollBtn.addEventListener("click", function () {
    const maxThrows = 3;

    if (game.getThrowCount() >= maxThrows) return;

    game.throwDice();
    updateDice();

    let throwsLeft = maxThrows - game.getThrowCount();
    throwsLeftText.textContent = throwsLeft;

    if (throwsLeft === 0) {
        rollBtn.disabled = true;
    }
});

// Opdater billeder
function updateDice() {
    const values = game.getValues();

    for (let i = 0; i < 5; i++) {
        const die = document.getElementById("die" + i);
        die.src = "dice" + values[i] + ".jpg";

        die.classList.toggle("held", holds[i]);
    }
}

// Klik på terning = hold
for (let i = 0; i < 5; i++) {
    document.getElementById("die" + i)
        .addEventListener("click", function () {
            holds[i] = !holds[i];
            updateDice();
        });
}