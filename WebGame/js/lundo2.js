var turn = 1;
var dieroll = 0;
var user1 = new User("regirock", [0, 1, 1, 1, 1, 0, 0, 0, 0], 1);
var user2 = new User("regice", [0, 27, 27, 27, 27, 0, 0, 0, 0], 27);
var winningsound = new Audio("./audio/win.mp3");
var movingsound = new Audio("./audio/unununun.mp3");
var wincounter = 0;
var numberofrolls = 0;

function User(regi, position_array,starting_position) {
    this.regi = regi;
    //Array values are as follows: Number of pawns at finish, Location pawn 1, Location pawn 2, Location pawn 3, Location pawn 4, Is pawn 1 in field, Is pawn 2 in field, Is pawn 3 in field, Is pawn 4 in field.
    this.position_array = position_array;
    this.starting_position = starting_position;
}

function pass() {
    if(turn===1){
        turn = 2;
        document.getElementById("game_message").innerHTML = "It is now Player 2's turn.";
        numberofrolls=0;
    }else{
        turn = 1;
        document.getElementById("game_message").innerHTML = "It is now Player 1's turn.";
        numberofrolls=0;
    }
}

function diceRoll() {
    var user = null;
    if(turn === 1){
        user = "Player 1"
    }else{
        user = "Player 2";
    }
    if(numberofrolls===0) {
        document.getElementById("game_message").innerHTML = user + " rolled the die!";
        dieroll = Math.floor(Math.random() * 6) + 1;
        document.getElementById("roll").value = dieroll;
        numberofrolls++;
    }
}

function new_game() {
    user1.position_array = [0, 1, 1, 1, 1, 0, 0, 0, 0];
    user2.position_array = [0, 27, 27, 27, 27, 0, 0, 0, 0];
    turn = 1;
    dieroll = 0;
    numberofrolls=0;
}

function engage_Pawn() {
    if(turn === 1){
        if(user1.position_array[5] === 1 && user1.position_array[6] === 1 && user1.position_array[7] === 1 && user1.position_array[8] === 1){
            document.getElementById("game_message").innerHTML = "Oops, there aren't any pawns left to bring out.";
            numberofrolls=0;
            return;
        }else if(user1.position_array[5] === 0){
            moveOntoBoard(1);
        }else if(user1.position_array[6] === 0){
            moveOntoBoard(2);
        }else if(user1.position_array[7] === 0){
            moveOntoBoard(3);
        }else if(user1.position_array[8] === 0){
            moveOntoBoard(4);
        }
    }else{
        if(user2.position_array[5] === 1 && user2.position_array[6] === 1 && user2.position_array[7] === 1 && user2.position_array[8] === 1){
            document.getElementById("game_message").innerHTML = "Oops, there aren't any pawns left to bring out.";
            numberofrolls=0;
            return;
        }else if(user2.position_array[5] === 0){
            moveOntoBoard(1);
        }else if(user2.position_array[6] === 0){
            moveOntoBoard(2);
        }else if(user2.position_array[7] === 0){
            moveOntoBoard(3);
        }else if(user2.position_array[8] === 0){
            moveOntoBoard(4);
        }
    }

}

function choose(x) {
    var arr = null;
    switch (turn) {
            case 1:
                arr = user1.position_array;
                break;
            case 2:
                arr = user2.position_array;
                break;
        }
        if (x === 1 && arr[5] === 1) {
            move(1);
        } else if(x === 1 && arr[5] !== 1){
            document.getElementById("game_message").innerHTML = "Oops, that wasn't a valid move.";
            numberofrolls=0;
        }
        if (x === 2 && arr[6] === 1) {
            move(2);
        } else if(x === 2 && arr[6] !== 1){
            document.getElementById("game_message").innerHTML = "Oops, that wasn't a valid move.";
            numberofrolls=0;
        }
        if (x === 3 && arr[7] === 1) {
            move(3);
        } else if(x === 3 && arr[7] !== 1){
            document.getElementById("game_message").innerHTML = "Oops, that wasn't a valid move.";
            numberofrolls=0;
        }
        if (x === 4 && arr[8] === 1) {
            move(4);
        } else if(x === 4 && arr[8] !== 1){
            document.getElementById("game_message").innerHTML = "Oops, that wasn't a valid move.";
            numberofrolls=0;
        }

}

function move(x){
    var elementid = null;
    var childid = null;
    if(turn === 1){
        elementid = user1.position_array[x]+dieroll;
        if(elementid >51){
            elementid = 100 + (elementid-51);
        }else if(elementid === 106){
            user1.position_array[0]++;
            document.getElementById("game_message").innerHTML = "A Regirock made it to the finish line!";
            document.getElementById("player-1-count").value = user1.position_array[0];
            elementid="void";
            numberofrolls=0;
        }else if(elementid > 106){
            document.getElementById("game_message").innerHTML = "Too bad Player 1! You can't make that move.";
            turn = 2;
            numberofrolls=0;
            return;
        }
        childid = "rock-"+x;
        document.getElementById(elementid).appendChild(document.getElementById(childid));
        user1.position_array[x] = elementid;
        numberofrolls=0;
        if (dieroll !== 6) {
            turn = 2;
        }
        movingsound.play();
        if (user1.position_array[0] === 4) {
            gamewinner(1);
        }
    }else{
        elementid = user2.position_array[x]+dieroll;
        if(user2.position_array[x] < 25 && elementid > 25){
            elementid = 400 + (elementid-25);
        }else if(user2.position_array[x] === 25){
            elementid = 400 + dieroll;
        }else if(elementid > 52 && elementid < 400){
            elementid = elementid-52;
        }else if(elementid === 406){
            user2.position_array[0]++;
            document.getElementById("game_message").innerHTML = "A Regice made it to the finish line!";
            document.getElementById("player-2-count").value = user2.position_array[0];
            elementid="void";
            numberofrolls=0;
        }else if(elementid > 406){
            document.getElementById("game_message").innerHTML = "Too bad Player 2! You can't make that move.";
            numberofrolls=0;
            turn = 1;
            numberofrolls=0;
            return;
        }
        childid = "ice-"+x;
        document.getElementById(elementid).appendChild(document.getElementById(childid));
        user2.position_array[x] = elementid;
        if (dieroll !== 6) {
            turn = 1;
        }
        movingsound.play();
        if (user1.position_array[0] === 4) {
            gamewinner(2);
        }
    }
}

function moveOntoBoard(x){
    if(dieroll !== 6){
        document.getElementById("game_message").innerHTML = "Oops, that wasn't a valid move.";
        return;
    }
    var elementid = null;
    var childid = null;
    if(turn === 1){
        elementid = user1.position_array[x];
        childid = "rock-"+x;
        document.getElementById(elementid).appendChild(document.getElementById(childid));
        user1.position_array[x+4] = 1;
        movingsound.play();
        numberofrolls=0;
    }
    if(turn === 2){
        elementid = user2.position_array[x];
        childid = "ice-"+x;
        document.getElementById(elementid).appendChild(document.getElementById(childid));
        user2.position_array[x+4] = 1;
        movingsound.play();
        numberofrolls=0;
    }
}

function gamewinner(x){
    winningsound.play();
    if(x===1){
        document.getElementById("game_message").innerHTML = "Regirock (Player 1) has won!";
        wincounter++;
        document.getElementById("game-count").value = wincounter;
        turn = 3;
    }else{
        document.getElementById("game_message").innerHTML = "Regice (Player 2) has won!";
        wincounter++;
        document.getElementById("game-count").value = wincounter;
        turn = 3;
    }
}

function moveLegality(elementid, pawn){
    var arr;
    var allowed = "allowed";
    var targetstring;
    if(turn===1){
        arr = user1.position_array;
        targetstring = "ice";
    }else{
        arr = user2.position_array;
        targetstring = "rock";
    }
    for(i = arr[pawn]; i < elementid-1; i++){
        if(document.getElementById(i).includes(targetstring)===true){
            allowed="not";
        }
    }
    if(document.getElementById(elementid).includes(targetstring)===true){
        allowed="take";
    }
    return allowed;
}



