"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var tab = {};

    var init = function()
    {
        var coordok = Lyngk.valtab;
        for(var i = 0; i < coordok.length; i++)
        {
            tab[coordok[i]] = new Lyngk.Intersection();
        }
    };

    this.init_OnePiece = function()
    {
        for (var coor in tab) {
            if (tab.hasOwnProperty(coor)) {
                tab[coor].pose(Lyngk.Color.IVORY);
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
    this.init_multi_color = function()
    {
        var dispo = [8,8,8,8,8,3];
        for (var coor in tab) {
            if (tab.hasOwnProperty(coor))
            {
                var randomColor;
                do{
                    randomColor = Math.floor(Math.random() * 6);
                }while(dispo[randomColor] <= 0)
                dispo[randomColor]--;
                tab[coor].pose(randomColor);
            }
        }
    };

    this.plateau = function() {
        return tab;
    };
    this.deplace = function(a,b) {

        if (tab[b].getState()!=Lyngk.State.VACANT && deplaceok(a,b)) {
            var piece = tab[a].getpiece();
            for (var psolo in piece) {
                tab[b].pose(piece[psolo].getColor());
                tab[a].remove(parseInt(psolo));

            }
        }else {
            console.log("erreur déplacement de "+a+" -> "+b+" non effectuer")
        }
    };

    var deplaceok = function (a,b) {
        var ok = false;
        var test;
        if (a.charAt(0) === b.charAt(0)){

            test = parseInt(a.charAt(1)) - parseInt(b.charAt(1));
           if(test == 1 || test == -1){
               ok =true ;
           }
        }else if (a.charAt(0) > b.charAt(0)){
            test = parseInt(a.charAt(1)) - parseInt(b.charAt(1));
            if(test == 1 || test == 0){
                ok =true ;
            }
        }else if (a.charAt(0) < b.charAt(0)){
            test = parseInt(a.charAt(1)) - parseInt(b.charAt(1));
            if(test == 0 || test == -1){
                ok =true ;
            }
        }
        return ok;
    }

    init();

};
