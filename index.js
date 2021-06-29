const positionSkip = {
  4: 25,
  13: 46,
  27: 5,
  33: 49,
  40: 3,
  42: 63,
  43: 18,
  50: 69,
  54: 31,
  62: 81,
  66: 45,
  74: 92,
  76: 58,
  89: 53,
  99: 41,
};

let movesPlayer1 = [1];
let movesPlayer2 = [1];
let counter = 1;

function rollDice() {
  return Math.floor(Math.random() * 6 + 1);
}

function chance() {
  console.log(`inside cha`);
  if (counter % 2 === 0) {
    document.getElementById("now-player").innerHTML = "NOW: Player 2";
    document.getElementById("next-player").innerHTML = " NEXT: Player 1";
    console.log("play2");
    counter++;
    return 2;
  } else {
    // player1 plays
    document.getElementById("now-player").innerHTML = "NOW: Player 1";
    document.getElementById("next-player").innerHTML = " NEXT: Player 2";
    console.log("play1");
    counter++;
    return 1;
  }
}

let diceBtn = document.getElementById("btn");
diceBtn.addEventListener("click", () => {
  console.log(`chance start`);
  const c = chance();
  let playerNumber = `position${c}`;
  console.log(`chce end`);

  let diceNumber = rollDice();
  document.getElementById("dice").innerHTML = diceNumber;
  let currentPosition = document.getElementById(playerNumber).innerHTML;
  document.querySelector(`.div${currentPosition} > #p${c}`).innerHTML = "";
  //   console.log(currentPosition + "currentPosition");
  //   console.log(diceNumber + "rolldice");

  let newPosition = parseInt(currentPosition) + parseInt(diceNumber);

  //to check if someone wins
  if (newPosition >= 100) {
    document.querySelector(`.div${100} > #p${c}`).innerText = `${c}`;
    alert(`${playerNumber} wins the game`);
    return;
  } else {
    if (positionSkip[newPosition]) {
      alert(
        `${playerNumber} went to position ${newPosition}. There was snake/ladder on this position, player will be skipped to position ${positionSkip[newPosition]}`
      );

      document.querySelector(
        `.div${positionSkip[newPosition]} > #p${c}`
      ).innerText = `${c}`;

      document.getElementById(playerNumber).innerHTML =
        positionSkip[newPosition];
      newPosition = positionSkip[newPosition];
    } else {
      document.querySelector(`.div${newPosition} > #p${c}`).innerText = `${c}`;
      document.getElementById(playerNumber).innerHTML = newPosition;
    }
    if (counter % 2 == 0) {
      movesPlayer2.push(newPosition);
    } else {
      movesPlayer1.push(newPosition);
    }
  }
  if (movesPlayer1.length > 5 || movesPlayer2.length > 5) {
    document.getElementById("movesPlayer1").innerHTML = movesPlayer1.slice(-5);
    document.getElementById("movesPlayer2").innerHTML = movesPlayer2.slice(-5);
  }
  document.getElementById("movesPlayer1").innerHTML = movesPlayer1;
  document.getElementById("movesPlayer2").innerHTML = movesPlayer2;
});
