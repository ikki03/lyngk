"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Engine = function () {
    var tab = {};
    var player ;
    var coloreclamer1 = [] ;
    var coloreclamer2 = [] ;
    var nbpiecestotal=0;
    var score = [0,0];
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
                nbpiecestotal++;
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
                nbpiecestotal++;
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
            if(tab[b].getState()==Lyngk.State.FULL_STACK){
                console.log("full stack");
                var colorcheck;
                if(this.getPlayer()==1){
                    colorcheck = coloreclamer1;
                }else {
                    colorcheck =coloreclamer2;
                }
                var i =0;
                for(var comte in tab[b].getpiece()){
                    var piecs = tab[b].getpiece();
                    if(piecs[comte].getColor() == colorcheck && i ==0){
                        console.log("touchdown");
                        score[this.getPlayer()]++;
                        for (var compte in tab[b].getpiece()){
                            tab[b].remove(compte);
                            nbpiecestotal--;
                        }
                        i++;
                    }
                }
            }
            nextPlayer();
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
    };

    var nextPlayer = function (){
        if(player==1){
            player =2;
        }else{
            player =1;
        }
    };

    this.getReclame = function (i){
        if(i ==1){
            return coloreclamer1;
        }else{
            return coloreclamer2;
        }
    };
    this.reclame = function (couleur){
        if(coloreclamer1.indexOf(couleur) ==-1 && coloreclamer2.indexOf(couleur) ==-1){
            if(this.getPlayer() ==1){
                coloreclamer1.push(couleur);
            }else{
                coloreclamer2.push(couleur);
            }
        }else{
            console.log("la couleur n'a pas pu etre reclammer");
        }
    };
    this.getNbPieceTotale = function (){
        return nbpiecestotal;
    };
    this.getScore= function (i){
        return score[1];
    };
    init();

};
