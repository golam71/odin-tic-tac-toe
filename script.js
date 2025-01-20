let p1name, p2name, currentMove;
let data = {};

document.getElementById("btn").onclick = () => {
    p1name = document.getElementById("player1").value || "Player 1";
    p2name = document.getElementById("player2").value || "Player 2";

    currentMove = document.getElementById("first-move").value;

    document.getElementById("main").classList.remove("hidden");
    document.getElementById("dialog").classList.add("hidden");
};

function checkWinner() {
    // Winning combinations (indexing starts from 1)
    const winningCombinations = [
        [1, 2, 3], // top row
        [4, 5, 6], // middle row
        [7, 8, 9], // bottom row
        [1, 4, 7], // first column
        [2, 5, 8], // second column
        [3, 6, 9], // third column
        [1, 5, 9], // diagonal from top-left to bottom-right
        [3, 5, 7], // diagonal from top-right to bottom-left
    ];

    // Check each winning combination
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
            alert(`${data[a]} wins!`);
            return true; // Stop checking if there's a winner
        }
    }
    return false;
}

function addMove(number) {
    return function (number) {
        // Check if the square is already taken
        if (!(number in data)) {
            // Store the current move in the data object
            data[number] = currentMove;

            // Update the UI with the current move
            document.querySelector(`[data-num="${number}"]`).innerText = currentMove;

            // Check if someone won after this move
            if (checkWinner()) return;

            // Switch the current player (X or O)
            currentMove = (currentMove === "X") ? "O" : "X";
        }
    };
}

const moveHandeler = addMove();

document.querySelectorAll(".square").forEach((item) => {
    item.addEventListener("click", () => {
        moveHandeler(item.getAttribute("data-num"));
    });
});
