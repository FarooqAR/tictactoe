$(document).ready(function() {
    var user = [],
        comp = [];
    var user_choice = null;//nought or cross
    var pcomb = {//all the possible combinations
        0: [
            [1, 2],
            [3, 6],
            [4, 8]
        ],
        1: [
            [0, 2],
            [4, 7]
        ],
        2: [
            [0, 1],
            [5, 8],
            [4, 6]
        ],
        3: [
            [0, 6],
            [4, 5]
        ],
        4: [
            [0, 8],
            [2, 6],
            [3, 5],
            [1, 7]
        ],
        5: [
            [2, 8],
            [3, 4]
        ],
        6: [
            [0, 3],
            [7, 8],
            [2, 4]
        ],
        7: [
            [6, 8],
            [1, 4]
        ],
        8: [
            [0, 4],
            [2, 5],
            [6, 7]
        ]
    };
    var all = [0,1,2,3,4,5,6,7,8];
    showStartDialog();
    $("button").click(function(){
        var key = parseInt($(this).val());
        $(this).attr("disabled",true);
        user.push(key);

        //get the available moves
        var unmarked = all.filter(function(a){
            return user.indexOf(a) == -1 && comp.indexOf(a) == -1;
        });
        $(this).css({"background-image":"url('"+user_choice+".png')"});
        if(user.length + comp.length == 9){//if no moves are available
            showMsgDialog("It's a tie!");
        }
        if(mark(comp,user)){//if computer can win, don't lose the opportunity
            markUi(mark(comp,user));
            showMsgDialog("You Lose!");
        }
        else if(mark(user,comp)){//if user can win, don't let him
            markUi(mark(user,comp));
        }
        else{
            if(unmarked.indexOf(4) !== -1){//if move 4 is available then mark it
                markUi(4);
            }
            else{//otherwise mark the first of the available moves
                markUi(unmarked[0]);
            }
        }
    });
    $(".dialog .choice").on("click",function(){
        user_choice = this.classList[1];
        hideStartDialog();
    });
    $(".start_again").on("click",function(){
        hideMsgDialog();
        showStartDialog();
    });
    function showStartDialog(){
        clearMoves();
        $(".dialog_main.start").fadeIn(300);
        $("button").attr("disabled",true);
    }
    function hideStartDialog(){
        $(".dialog_main.start").fadeOut(300);
        $("button").attr("disabled",false);
    }
    function showMsgDialog(msg){
        $(".dialog_main.msg").fadeIn(300);
        $(".dialog_main.msg .title").text(msg);
    }
    function hideMsgDialog(){
        $(".dialog_main.msg").fadeOut(300);
        $(".dialog_main.msg .title").text("");
        showStartDialog();
    }
    function clearMoves(){
        user = [];
        comp = [];
        $("button").attr("disabled",false).css({"background-image":"none","opacity":"1"});
    }
    //go for the available move
    function markUi(num){
        $('button[value="'+num+'"]').attr("disabled",true).css({"background-image":"url('"+((user_choice=="cross")?"nought":"cross")+".png')","opacity":"0.6"});
        comp.push(num);
    }

    //returns move number if p1 can win
    //or false if p1 can't
    function mark(p1, p2) {
        for (var i = 0; i < p1.length; i++) {
            for (var j = 0; j < p1.length; j++) {
                if (p1[i] !== p1[j]) {
                    for (var k = 0; k < pcomb[p1[i]].length; k++) {
                        var c = pcomb[p1[i]][k].indexOf(p1[j]);
                        if (c !== -1 && p2.indexOf(pcomb[p1[i]][k][not(c)]) == -1) {
                            return pcomb[p1[i]][k][not(c)];
                        }
                    }
                }
            }
        }
        return false;
    }
    function not(num) {
        return (num == 1) ? 0 : 1;
    }

});