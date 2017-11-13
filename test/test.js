'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
LyngkTestCase.prototype.testcoorok = function () {
    var testcase = new Lyngk.Coordinates("A", 1);
    assertFalse(testcase.validate());
};
LyngkTestCase.prototype.testhist2 = function () {
    var compteur = 0;
    var testcase;
    for (var c = 65; c <= 74; c++) {
        for (var l = 1; l <= 9; l++) {
            testcase = new Lyngk.Coordinates(String.fromCharCode(c), l);
            if (testcase.validate()) {
                compteur++;
            }
        }
    }
    assertEquals(compteur, 43);
};
LyngkTestCase.prototype.testhist3 = function () {
    var testcase = new Lyngk.Coordinates("A", 3);
    assertEquals(testcase.toString(), "A3");
};
LyngkTestCase.prototype.testhist4 = function () {
    var testcase = new Lyngk.Coordinates("A", 1);
    assertEquals(testcase.toString(), "invalid");
};
LyngkTestCase.prototype.testhist5 = function () {
    var testcase = new Lyngk.Coordinates("A", 3);
    var testcaseclone = testcase.clone();
    assertEquals(testcase.toString(), testcaseclone.toString());
};
LyngkTestCase.prototype.testhist6 = function () {
    var testcase = new Lyngk.Coordinates("A", 3);
    assertEquals(testcase.hash(), 653);
};
LyngkTestCase.prototype.testhist7 = function () {
    var intersect = new Lyngk.Intersection();
    assertEquals(intersect.getState(),Lyngk.State.VACANT);
};
LyngkTestCase.prototype.testhist8 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.putPiece(Lyngk.Color.BLUE);
    assertEquals(intersect.getState(),Lyngk.State.ONE_PIECE);
    assertEquals(intersect.getColor(),Lyngk.Color.BLUE);
};
LyngkTestCase.prototype.testhist9 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.putPiece(Lyngk.Color.BLUE);
    intersect.putPiece(Lyngk.Color.RED);
    assertEquals(intersect.getState(),Lyngk.State.STACK);
    assertEquals(intersect.getColor(),Lyngk.Color.RED);
};
LyngkTestCase.prototype.testhist10 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.putPiece(Lyngk.Color.BLUE);
    intersect.putPiece(Lyngk.Color.RED);
    intersect.putPiece(Lyngk.Color.BLACK);
    intersect.putPiece(Lyngk.Color.GREEN);
    intersect.putPiece(Lyngk.Color.IVORY);
    assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
};
LyngkTestCase.prototype.testhist11 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initOnePiece();
    assertTrue(plateau.fullOnePiece());
};


LyngkTestCase.prototype.testhist12 = function()
{
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();

    var colorNumber = [0,0,0,0,0,0];

    for (var coor in plateau) {
        if (plateau.hasOwnProperty(coor))
        {
            colorNumber[plateau[coor].getColor()]++;
        }
    }

    var ok = true;
    for(var i = 0; i < colorNumber.length; i++)
    {
        if(i <= 4 && colorNumber[i] != 8)
            ok = false;
        else if(i == 5 && colorNumber[i] != 3)
            ok = false;
    }
    assertTrue(ok);
};

LyngkTestCase.prototype.testhist13 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    for (var coor in plateau) {
        assertEquals(plateau[coor].getHeight(),1);
    }
};
LyngkTestCase.prototype.testhist14 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    for (var coor in plateau) {
        assertEquals(plateau[coor].getColor(),plateau[coor].getTopPiece().getColor());
    }
};
LyngkTestCase.prototype.testhist15 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    var coloratest = plateau["A3"].getColor();
    jeu.move("A3","B3");
    assertEquals(plateau["A3"].getHeight(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B3"].getHeight(),2 );
};
LyngkTestCase.prototype.testhist16 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();

    var coloratest = plateau["A3"].getColor();
    jeu.move("A3","B3");
    assertEquals(plateau["A3"].getHeight(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B3"].getHeight(),2);
    coloratest = plateau["B3"].getColor();
    jeu.move("B3","B2");
    assertEquals(plateau["B3"].getHeight(),0);
    assertEquals(plateau["B3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B2"].getColor(),coloratest);
    assertEquals(plateau["B2"].getHeight(),3);
};
LyngkTestCase.prototype.testhist17 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    var coloratest = plateau["B2"].getColor();
    jeu.move("B2","B3");
    jeu.move("B3","B2");
    assertEquals(plateau["B3"].getHeight(),2);
    assertEquals(plateau["B3"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B2"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getHeight(),0);
};
LyngkTestCase.prototype.testhist18 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.move("C2","B3");
    assertEquals(plateau["B3"].getHeight(),1);
    assertEquals(plateau["B3"].getState(),Lyngk.State.ONE_PIECE);
    assertEquals(plateau["C2"].getState(),Lyngk.State.ONE_PIECE);
    assertEquals(plateau["C2"].getHeight(),1);
};
LyngkTestCase.prototype.testhist19 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.move("I7","H6");
    jeu.move("H6","H5");
    jeu.move("H5","H8");
    jeu.move("H5","F3");
    assertEquals(plateau["H5"].getHeight(),3);
    assertEquals(plateau["H8"].getHeight(),1);
    jeu.move("H5","F5"); // c'est un coup qui est possible .
};
LyngkTestCase.prototype.testhist20 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.move("B2","C2");
    jeu.move("C2","D3");
    jeu.move("D3","D2");
    jeu.move("D2","E2");
    jeu.move("E2","E3");
    assertEquals(plateau["E2"].getHeight(),5);
    assertEquals(plateau["E2"].getState(),Lyngk.State.FULL_STACK);
    assertEquals(plateau["E3"].getHeight(),1);
};
LyngkTestCase.prototype.testhist21 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.move("A3","B3");
    jeu.move("C3","B3");
    assertEquals(plateau["B3"].getHeight(),2);
    assertEquals(plateau["C3"].getHeight(),1);
};
LyngkTestCase.prototype.testhist22 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.move("I7","H6");
    jeu.move("G4","G5");
    jeu.move("G5","G6");
    jeu.move("H6","G6");
    assertEquals(plateau["H6"].getHeight(),2);
    assertEquals(plateau["G6"].getHeight(),3);
};
LyngkTestCase.prototype.testhist23 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    plateau["I7"].remove(1);
    plateau["H6"].remove(1);
    plateau["I7"].putPiece(Lyngk.Color.BLUE);
    plateau["I7"].putPiece(Lyngk.Color.WHITE);
    plateau["H6"].putPiece(Lyngk.Color.BLUE);
    plateau["H6"].putPiece(Lyngk.Color.WHITE);
    jeu.move("I7","H6");
    assertEquals(plateau["H6"].getHeight(),2);
    assertEquals(plateau["I7"].getHeight(),2);
};
LyngkTestCase.prototype.testhist24 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    assertEquals(jeu.getPlayer(),1);
};
LyngkTestCase.prototype.testhist25 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    jeu.move("G4","G5");
    assertEquals(jeu.getPlayer(),2);
};
LyngkTestCase.prototype.testhist26 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    jeu.setColorTaken(Lyngk.Color.RED);
    jeu.move("A3","B3");
    jeu.setColorTaken(Lyngk.Color.GREEN);
    assertEquals(jeu.getColorTaken(1),Lyngk.Color.RED);
    assertEquals(jeu.getColorTaken(2),Lyngk.Color.GREEN);
};
LyngkTestCase.prototype.testhist27 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initmulticolor();
    var plateau = jeu.getBoard();
    jeu.setColorTaken(Lyngk.Color.BLUE);
    plateau["A3"].remove(1);
    plateau["A3"].putPiece(Lyngk.Color.BLUE);
    plateau["B3"].remove(1);
    plateau["B3"].putPiece(Lyngk.Color.WHITE);
    plateau["H6"].remove(1);
    plateau["H6"].putPiece(Lyngk.Color.WHITE);
    plateau["G5"].remove(1);
    plateau["G5"].putPiece(Lyngk.Color.WHITE);
    plateau["G6"].remove(1);
    plateau["G6"].putPiece(Lyngk.Color.WHITE);
    plateau["C3"].remove(1);
    plateau["C3"].putPiece(Lyngk.Color.WHITE);
    plateau["C2"].remove(1);
    plateau["C2"].putPiece(Lyngk.Color.WHITE);
    plateau["G7"].remove(1);
    plateau["G7"].putPiece(Lyngk.Color.WHITE);
    plateau["D2"].remove(1);
    plateau["D2"].putPiece(Lyngk.Color.RED);
    jeu.move("A3","B3");
    jeu.move("H6","G5");
    jeu.move("B3","C3");
    jeu.move("G5","G6");
    jeu.move("C3","C2");
    jeu.move("G6","G7");
    jeu.move("C2","D2");
    assertEquals(jeu.getColorTaken(1),Lyngk.Color.BLUE);
    assertEquals(jeu.getScore(1),1);
    assertEquals(jeu.getCounterOfPiecesInTheBoard(),38);
    assertEquals(plateau["D2"].getState(),Lyngk.State.VACANT);
};