"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var pieces=[];

    this.getState=function(){
        return state;
    };
    var updateState=function(){
        if(pieces.length==0) {
            state = Lyngk.State.VACANT;
        }else if(pieces.length==1){
            state = Lyngk.State.ONE_PIECE;
        }else if(pieces.length >  1 && pieces.length <= 4){
            state = Lyngk.State.STACK;
        }else if(pieces.length > 4){
            state = Lyngk.State.FULL_STACK;
        }
    };

    this.pose=function(colo){
        pieces.push(new Lyngk.Piece(colo));
        updateState();
    };

    this.remove=function(i){
        pieces = pieces.slice(i,i);
        updateState();
    };


    this.getColor=function(){
        return pieces[pieces.length-1].getColor();
    };
    this.getHauteur=function(){
        return pieces.length;
    };
    this.topiece=function(){
        return pieces[pieces.length-1];
    };
    this.getpiece=function(){
        return pieces;
    };


};
