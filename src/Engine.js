"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var tab = [];

    this.init_OnePiece = function()
    {
        for (var coor in tab) {
            if (tab.hasOwnProperty(coor))
            {
                tab[coor].poser(Lyngk.Color.IVORY);
            }
        }
    };

    this.full_One_Piece = function()
    {
        for (var coor in tab) {
            if (tab.hasOwnProperty(coor))
            {
                if(tab[coor].getState() != Lyngk.State.ONE_PIECE)
                    return false;
            }
        }
        return true;
    };

};
