"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var _state = Lyngk.State.VACANT;
    var _pieces = [];

    this.getState = function () {
        return _state;
    };
    var updateState = function () {
        _state = Lyngk.State.VACANT;
        if (_pieces.length === 1) {
            _state = Lyngk.State.ONE_PIECE;
        } else if (_pieces.length > 1 && _pieces.length <= 4) {
            _state = Lyngk.State.STACK;
        } else if (_pieces.length > 4) {
            _state = Lyngk.State.FULL_STACK;
        }
    };
    this.putPiece = function (colo) {
        _pieces.push(new Lyngk.Piece(colo));
        updateState();
    };
    this.remove = function (i) {
        _pieces = _pieces.slice(i, i);
        updateState();
    };
    this.getColor = function () {
        return _pieces[_pieces.length - 1].getColor();
    };
    this.getHeight = function () {
        return _pieces.length;
    };
    this.getTopPiece = function () {
        return _pieces[_pieces.length - 1];
    };
    this.getAllPiece = function () {
        return _pieces;
    };


};
