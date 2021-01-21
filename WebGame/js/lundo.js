var k = 0,
    turn = 0,
    allow = 1,
    player_assign_allow = 1,
    sel = 1,
    no = 0,
    allow_part = 1;
var control=1;
var user1, user2, user3, user4;


function user(color, position_array, parts_in,color_half,starting_position) {
    this.color= color;
    this.position_array = position_array;
    this.starting_position=starting_position;
    this.parts_in=parts_in;
    this.color_half=color_half;

}

var game = {
    roll : function() {
        no = Math.ceil(Math.random() * 6);
        document.getElementById("roll").value = no;
        allow = 1;
        allow_part = 1;
    },
    roll_cracked : function() {
        no = document.getElementById("roll").value;
        allow = 1;
        allow_part = 1;
    },
    user_assign : function() {
        if (player_assign_allow == 1) {
            k = parseInt(document.getElementById("user").value);
            switch (k) {
                case 4:
                    user4 = new user("yellow", [0, 40, 40, 40, 40, 0, 0, 0, 0], 4,"yel-",40);
                    general_operation.dead("yel-1");
                    user4.position_array[5] = 1;
                    general_operation.make("40", user4.color);
                /*user4_playing_parts--;*/
                case 3:
                    user3 = new user("blue", [0, 27, 27, 27, 27, 0, 0, 0, 0], 4,"blu-",27);
                    general_operation.dead("blu-1");
                    general_operation.make("27", user3.color);
                    user3.position_array[5] = 1;
                /*user3_playing_parts--;*/
                case 2:
                    user2 = new user("red", [0, 14, 14, 14, 14, 0, 0, 0, 0], 4,"red-",14);
                    general_operation.dead("red-1");
                    general_operation.make("14", user2.color);
                    user2.position_array[5] = 1;
                /*user2_playing_parts--;*/
                case 1:
                    user1 = new user("green", [0, 1, 1, 1, 1, 0, 0, 0, 0], 4,"gre-",1);
                    general_operation.dead("gre-1");
                    general_operation.make("1", user1.color);
                    user1.position_array[5] = 1;
                /*user1_playing_parts--;*/

            }
        }
        player_assign_allow = 0;
    },
    pass : function() {
        turn = (turn + 1) % k;
    },
    new_game : function() {
        window.location = "ludo.html";
    },
    choose : function(x) {
        if(user1 ){
            switch (turn) {
                case 0:
                    var arr = user1.position_array;
                    break;
                case 1:
                    var arr = user2.position_array;
                    break;
                case 2:
                    var arr = user3.position_array;
                    break;
                case 3:
                    var arr = user4.position_array;
                    break;
            }
            if (x == 1 && arr[5] == 1) {
                sel = 1;
                game.move();
            }
            if (x == 2 && arr[6] == 1) {
                sel = 2;
                game.move();
            }
            if (x == 3 && arr[7] == 1) {
                sel = 3;
                game.move();
            }
            if (x == 4 && arr[8] == 1) {
                sel = 4;
                game.move();
            }}

    },
    uniKeyCode : function (event) {
        var key_num =  event.keyCode;
        if(key_num==82){
            game.roll();
            document.getElementById("demo").innerHTML = "rolling the dice";
        }
        if(key_num==78){
            game.allow_new_part();
            document.getElementById("demo").innerHTML = "allowing new part";
        }
        if(key_num==96){
            game.pass();
            document.getElementById("demo").innerHTML = "passed the chance to the new player";
        }
        if(key_num==70){
            document.getElementById("user").focus();
            document.getElementById("user").value="";
            document.getElementById("demo").innerHTML = "enter the number of players";

        }
        if(key_num==83){
            game.user_assign();
            document.getElementById("user").value="";
            document.getElementById("user").blur();
            document.getElementById("demo").innerHTML = "the number of players is selected";

        }
        if(key_num==97){
            game.choose(1);
            document.getElementById("demo").innerHTML = "moving the part 1";

        }
        if(key_num==98){
            game.choose(2);
            document.getElementById("demo").innerHTML = "moving the part 2";

        }
        if(key_num==80){
            game.pass();
            document.getElementById("demo").innerHTML = "passing the chance";

        }
        if(key_num==99){
            game.choose(3);
            document.getElementById("demo").innerHTML = "moving the part 3";

        }
        if(key_num==100){
            game.choose(4);
            document.getElementById("demo").innerHTML = "moving the part 4";

        }

    },


    allow_new_part:function(){
        if (no == 6 && allow_part == 1) {
            switch (turn) {
                case 0:
                    general_operation.del_insert(user1);
                    break;
                case 1:
                    general_operation.del_insert(user2);
                    break;
                case 2:
                    general_operation.del_insert(user3);

                    break;
                case 3:
                    general_operation.del_insert(user4);
                    break;
            }

            /*next_player();*/
            /*allow_part=0;*/
        }
    },
    move:function () {
        if (allow == 1 && control == 1) {
            control=0;
            var t = 0;
            var color = "";
            switch (turn) {
                case 0:
                    t = user1.position_array[sel];
                    color = user1.color;
                    /*color1 = "rgb(0, 128, 0)";*/
                    color1 = "green";
                    break;
                case 1:
                    t = user2.position_array[sel];
                    color = user2.color;
                    /*color1 = "rgb(255, 0, 0)";*/
                    color1 = "red";
                    break;
                case 2:
                    t = user3.position_array[sel];
                    color = user3.color;
                    /*color1 = "rgb(0, 0, 255)";*/
                    color1 = "blue";
                    break;
                case 3:
                    t = user4.position_array[sel];
                    color = user4.color;
                    /*color1 = "rgb(255, 255, 0)";*/
                    color1 = "yellow";
                    break;
            }
            console.log(t);
            for (i = 1; i <= no; i++) {
                if(!(t>405||(t>105&&t<200)||(t>205&&t<300)||(t>305&&t<400))){

                    setTimeout(
                        (function(x, sel) {
                            var ele_color = document.getElementById(x.toString());
                            for (i = 0; i < ele_color.childNodes.length; i++) {
                                console.log(color1);
                                console.log(ele_color.childNodes[i].style.backgroundColor);
                                if (ele_color.childNodes[i].innerHTML == sel && ele_color.childNodes[i].style.backgroundColor == color1) {
                                    ele = ele_color.childNodes[i];
                                    break;
                                }
                            }
                            console.log(ele);
                            document.getElementById(x.toString()).removeChild(ele);

                        }).bind(this, t, sel), 500 * i - 250);

                    t++;
                    if (t == 53) {
                        t = 1;
                    }
                    if (t == 52 && color == "green") t = 101;
                    if (t == 13 && color == "red") t = 201;

                    if (t == 26 && color == "blue") t = 401;

                    if (t == 39 && color == "yellow") t = 301;

                    setTimeout(function(y, color, sel) {
                        general_operation.make(y, color, sel);
                    }.bind(this, t, color, sel), 500 * i);}
            }


            setTimeout(
                (function(turn1,t) {
                    if (document.getElementById(t).childNodes[1] != null)
                        var ele_2_die = document.getElementById(t).childNodes[1].innerHTML;
                    /*us1p is like is for whether the player is playing or not*/
                    if (t == 1 || t == 14 || t == 27 || t == 40) {} else
                        for (sel1 = 1; sel1 <= 4; sel1++)

                            if ( user1 &&turn1 != 0 && t == user1.position_array[sel1] )

                            {
                                general_operation.lose_part(t,ele_2_die,user1);
                            } else if (user2  &&turn1 != 1 && t == user2.position_array[sel1] )

                            {
                                general_operation.lose_part(t,ele_2_die,user2);
                            } else if (user3 &&turn1 != 2 && t == user3.position_array[sel1])

                            {
                                general_operation.lose_part(t,ele_2_die,user3);
                            } else if (user4 &&turn1 != 3 && t == user4.position_array[sel1] )

                            {
                                general_operation.lose_part(t,ele_2_die,user4);
                            }
                    control = 1;
                }).bind(this, turn,t), 500 * i - 250);
            switch (turn) {
                case 0:
                    user1.position_array[sel] = t;
                    break;
                case 1:
                    user2.position_array[sel] = t;
                    break;
                case 2:
                    user3.position_array[sel] = t;
                    break;
                case 3:
                    user4.position_array[sel] = t;
                    break;
            }



            if(no!=6)
                game.next_player();

            sel = 1;
        }
    },
    next_player: function () {
        allow = 0;
        turn++;
        turn %= k;
    }




};

var general_operation = {
    make: function(y, color_, sel = 1, i = 0) {
        console.log(sel);
        var a = document.createElement("div");
        if (i == 0)
            a.setAttribute("class", "circle");
        a.style.backgroundColor=color_;
        a.innerText=sel;
        var y_node = document.getElementById(y);

        if (y_node.childNodes[0] != null) {
            var first_element_i = y_node.childNodes[0];
            y_node.insertBefore(a, first_element_i);
        } else
            y_node.appendChild(a);
    },
    dead: function(x) {
        document.getElementById(x.toString()).removeChild(document.getElementById(x.toString()).firstElementChild);

    },
    dead_last: function(x) {
        document.getElementById(x.toString()).removeChild(document.getElementById(x.toString()).lastElementChild);

    },
    /*del_insert check whether is there a part of the current player which is no out if there then
     del it and produce a part in the starting postion for the player*/
    del_insert:function(user_name){
        if (user_name.parts_in != 0) {
            user_name.parts_in--;
            for (i = 1; i <= 4; i++)
                if (document.getElementById(user_name.color_half + i).childNodes[0] != null) {
                    user_name.position_array[i+4]=1;
                    general_operation.dead(user_name.color_half + i);

                    general_operation.make(user_name.starting_position, user_name.color, i);
                    break;
                }


        }
    },
    lose_part:function(t,ele_2_die,user_name){
        console.log(t);
        general_operation.dead_last(t);
        user_name.position_array[ele_2_die] = 1;
        general_operation.make(user_name.color_half + ele_2_die, user_name.color, ele_2_die);
        user_name.position_array[sel1+4]=0;
        user_name.parts_in++;
    }
};



document.querySelector("#roll_button").addEventListener("click", game.roll);
/*document.querySelector("#assign_user").addEventListener("click", game.user_assign);*/
document.querySelector("#allow_new_part").addEventListener("click", game.new_part);
document.querySelector("#choose_1").addEventListener("click", game.new_part);
document.querySelector("#choose_2").addEventListener("click", game.choose(2));
document.querySelector("#choose_3").addEventListener("click", game.choose(3));
document.querySelector("#choose_4").addEventListener("click", game.choose(4));
document.querySelector("#body").addEventListener("keyup", game.uniKeyCode);
/*document.querySelector("#roll_crack").addEventListener("click", game.roll_cracked);*/
