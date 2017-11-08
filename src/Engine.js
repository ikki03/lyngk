"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var tab = {};
    var player ;
    var init = function()
    {
        player = 1;
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

        if (tab[b].getState()!=Lyngk.State.VACANT && deplaceok(a,b) && tab[a].getState()!=Lyngk.State.FULL_STACK && tab[a].getHauteur() >= tab[b].getHauteur() && colorok(a,b)) {
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
    };

    var colorok = function (a,b) {
        var ok = true;
        var piecea = tab[a].getpiece();
        var pieceb = tab[b].getpiece();
        for (var compteur in piecea){
            for (var compt2 in pieceb){
           // console.log("colorok -> couleur i7 : "+piecea[compteur].getColor()+" couleur h6 : "+pieceb[compt2].getColor());
                if(pieceb[compt2].getColor() == piecea[compteur].getColor() && pieceb[compt2].getColor()!=Lyngk.Color.WHITE){
                    ok=false;
                }
            }
        }
 //       console.log("couleur : "+ok)
        return ok;
    };

    this.getPlayer = function (){
        return player;
    }

    init();

};
