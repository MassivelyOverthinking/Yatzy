const game = new Logic();
let holds = [false, false, false, false, false];
const maxThrows = 3;

const rollBtn = document.getElementById("rollBtn");
const throwsLeftText = document.getElementById("throwsLeft");

// Kast-knap
rollBtn.addEventListener("click", function () {

    if (game.getThrowCount() >= maxThrows) return;

    game.throwDice(holds);
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