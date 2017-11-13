"use strict";

Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var _board = {};
    var _player ;
    var _colorTakenByP1 = [] ;
    var _colorTakenByP2 = [] ;
    var _numberOfPIeceInTheBoard=0;
    var _score = [0,0];
    
    var init = function()
    {
        _player = 1;
        var validCoordinates = Lyngk.valtab;

        for(var i = 0; i < validCoordinates.length; i++)
        {
            _board[validCoordinates[i]] = new Lyngk.Intersection();
        }
    };

    this.initOnePiece = function()
    {
        for (var cordinateInBoard in _board) {
            if (_board.hasOwnProperty(cordinateInBoard)) {
                _board[cordinateInBoard].putPiece(Lyngk.Color.IVORY);
                _numberOfPIeceInTheBoard++;
            }
        }
    };

    this.fullOnePiece = function()
    {
        for (var cordinateInBoard in _board) {
            if (_board.hasOwnProperty(cordinateInBoard) && _board[cordinateInBoard].getState() !== Lyngk.State.ONE_PIECE)
            {
                    return false;
            }
        }
        return true;
    };
    this.initmulticolor = function()
    {
        var colorAvailables = [8,8,8,8,8,3];
        for (var cordinateInBoard in _board) {
            if (_board.hasOwnProperty(cordinateInBoard))
            {
                var randomColor;
                do{
                    randomColor = Math.floor(Math.random() * 6);
                }while(colorAvailables[randomColor] <= 0);
                colorAvailables[randomColor]--;
                _board[cordinateInBoard].putPiece(randomColor);
                _numberOfPIeceInTheBoard++;
            }
        }
    };

    this.getBoard = function() {
        return _board;
    };
    this.move = function(entry, exit) {

        if (_board[exit].getState()!==Lyngk.State.VACANT && moveok(entry,exit) && _board[entry].getState()!==Lyngk.State.FULL_STACK && _board[entry].getHeight() >= _board[exit].getHeight() && colorok(entry,exit)) {
            var entryPieces = _board[entry].getAllPiece();
            for (var counterForPiecesToMove in entryPieces) {
                _board[exit].putPiece(entryPieces[counterForPiecesToMove].getColor());
                _board[entry].remove(parseInt(counterForPiecesToMove));
            }

            if(_board[exit].getState()===Lyngk.State.FULL_STACK){
                console.log("full stack");
                var colorToCHeck;
                if(this.getPlayer()===1){
                    colorToCHeck = _colorTakenByP1[0];
                }else {
                    colorToCHeck =_colorTakenByP2[0];
                }
                for(var counterOfPieces in _board[exit].getAllPiece()){
                    var piecesToTest = _board[exit].getAllPiece();
                    if(piecesToTest[counterOfPieces].getColor() === colorToCHeck){
                        console.log("touchdown");
                        _score[this.getPlayer()]++;
                        for (var counterForRemoving in _board[exit].getAllPiece()){
                            _board[exit].remove(counterForRemoving);
                            _numberOfPIeceInTheBoard--;
                        }
                    }
                }
            }
            nextPlayer();
        }else {
            console.log("erreur déplacement de "+entry+" -> "+exit+" non effectuer");
        }
    };

    var moveok = function (entry,exit) {
        var flag = false;
        var row =entry.charCodeAt(0)-exit.charCodeAt(0);
        var column = parseInt(entry.charAt(1)) - parseInt(exit.charAt(1));
        if(row ===0 || column ===0 || row===column){
            flag=true;
        }
        return flag;
    };

    var colorok = function (entry,exit) {
        var flag = true;
        var piecesAtEntry = _board[entry].getAllPiece();
        var piecesAtExit = _board[exit].getAllPiece();
        for (var counterAtEntry in piecesAtEntry){
            for (var counterAtExit in piecesAtExit){
                if(piecesAtExit[counterAtExit].getColor() === piecesAtEntry[counterAtEntry].getColor() && piecesAtExit[counterAtExit].getColor()!==Lyngk.Color.WHITE){
                    flag=false;
                }
            }
        }
        return flag;
    };

    this.getPlayer = function (){
        return _player;
    };

    var nextPlayer = function (){
        if(_player===1){
            _player =2;
        }else{
            _player =1;
        }
    };

    this.getColorTaken = function (player){
        if(player ===1){
            return _colorTakenByP1;
        }else{
            return _colorTakenByP2;
        }
    };

    this.setColorTaken = function (color){
        if(_colorTakenByP1.indexOf(color) ===-1 && _colorTakenByP2.indexOf(color) ===-1){
            if(this.getPlayer() ===1){
                _colorTakenByP1.push(color);
            }else{
                _colorTakenByP2.push(color);
            }
        }else{
            console.log("la couleur n'a pas pu etre reclammer");
        }
    };

    this.getCounterOfPiecesInTheBoard = function (){
        return _numberOfPIeceInTheBoard;
    };

    this.getScore= function (i){
        return _score[1];
    };

    init();

};
