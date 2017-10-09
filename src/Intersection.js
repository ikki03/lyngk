"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var piece;

    this.getState=function(){
        return state;
    };

    this.pose=function(colo){
        if(!piece) {
            piece = new Lyngk.Piece(colo);
            state = Lyngk.State.ONE_PIECE;
        }else {
            piece = new Lyngk.Piece(colo);
            state = Lyngk.State.STACK;
        }
    };

    this.getColor=function(){
        return piece.getColor();
    };


};
