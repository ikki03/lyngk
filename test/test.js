'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
LyngkTestCase.prototype.testcoorok = function () {
    var testcase = new Lyngk.Coordinates("A", 1);
    assertFalse(testcase.valid());
};
LyngkTestCase.prototype.testhist2 = function () {
    var compteur = 0;
    var testcase;
    for (var c = 65; c <= 74; c++) {
        for (var l = 1; l <= 9; l++) {
            testcase = new Lyngk.Coordinates(String.fromCharCode(c), l);
            if (testcase.valid()) {
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
    intersect.pose(Lyngk.Color.BLUE);
    assertEquals(intersect.getState(),Lyngk.State.ONE_PIECE);
    assertEquals(intersect.getColor(),Lyngk.Color.BLUE);
};
LyngkTestCase.prototype.testhist9 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.pose(Lyngk.Color.BLUE);
    intersect.pose(Lyngk.Color.RED);
    assertEquals(intersect.getState(),Lyngk.State.STACK);
    assertEquals(intersect.getColor(),Lyngk.Color.RED);
};
LyngkTestCase.prototype.testhist10 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.pose(Lyngk.Color.BLUE);
    intersect.pose(Lyngk.Color.RED);
    intersect.pose(Lyngk.Color.BLACK);
    intersect.pose(Lyngk.Color.GREEN);
    intersect.pose(Lyngk.Color.IVORY);
    assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
};
LyngkTestCase.prototype.testhist11 = function () {
    var plateau = new Lyngk.Engine();
    plateau.init_OnePiece();
    assertTrue(plateau.full_One_Piece());
};


LyngkTestCase.prototype.testhist12 = function()
{
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();

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
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    for (var coor in plateau) {
        assertEquals(plateau[coor].getHauteur(),1);
    }
};
LyngkTestCase.prototype.testhist14 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    for (var coor in plateau) {
        assertEquals(plateau[coor].getColor(),plateau[coor].topiece().getColor());
    }
};
LyngkTestCase.prototype.testhist15 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    var coloratest = plateau["A3"].getColor();
    jeu.deplace("A3","B3");
    assertEquals(plateau["A3"].getHauteur(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B3"].getHauteur(),2 );
};
LyngkTestCase.prototype.testhist16 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();

    var coloratest = plateau["A3"].getColor();
    jeu.deplace("A3","B3");
    assertEquals(plateau["A3"].getHauteur(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B3"].getHauteur(),2);
    coloratest = plateau["B3"].getColor();
    jeu.deplace("B3","B2");
    assertEquals(plateau["B3"].getHauteur(),0);
    assertEquals(plateau["B3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B2"].getColor(),coloratest);
    assertEquals(plateau["B2"].getHauteur(),3);
};
LyngkTestCase.prototype.testhist17 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    var coloratest = plateau["B2"].getColor();
    jeu.deplace("B2","B3");
    jeu.deplace("B3","B2");
    assertEquals(plateau["B3"].getHauteur(),2);
    assertEquals(plateau["B3"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B3"].getColor(),coloratest);
    assertEquals(plateau["B2"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getHauteur(),0);
};
LyngkTestCase.prototype.testhist18 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    jeu.deplace("C2","B3");
    assertEquals(plateau["B3"].getHauteur(),1);
    assertEquals(plateau["B3"].getState(),Lyngk.State.ONE_PIECE);
    assertEquals(plateau["C2"].getState(),Lyngk.State.ONE_PIECE);
    assertEquals(plateau["C2"].getHauteur(),1);
};
LyngkTestCase.prototype.testhist19 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    jeu.deplace("I7","H6");
    jeu.deplace("H6","H5");
    jeu.deplace("H5","H8");
    jeu.deplace("H5","F3");
    assertEquals(plateau["H5"].getHauteur(),3);
    assertEquals(plateau["H8"].getHauteur(),1);
    jeu.deplace("H5","F5"); // c'est un coup qui est possible .
};
LyngkTestCase.prototype.testhist20 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    jeu.deplace("B2","C2");
    jeu.deplace("C2","D3");
    jeu.deplace("D3","D2");
    jeu.deplace("D2","E2");
    jeu.deplace("E2","E3");
    assertEquals(plateau["E2"].getHauteur(),5);
    assertEquals(plateau["E2"].getState(),Lyngk.State.FULL_STACK);
    assertEquals(plateau["E3"].getHauteur(),1);
};
LyngkTestCase.prototype.testhist21 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    jeu.deplace("A3","B3");
    jeu.deplace("C3","B3");
    assertEquals(plateau["B3"].getHauteur(),2);
    assertEquals(plateau["C3"].getHauteur(),1);
};
LyngkTestCase.prototype.testhist22 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    jeu.deplace("I7","H6");
    jeu.deplace("G4","G5");
    jeu.deplace("G5","G6")
    jeu.deplace("H6","G6")
    assertEquals(plateau["H6"].getHauteur(),2);
    assertEquals(plateau["G6"].getHauteur(),3);
};
LyngkTestCase.prototype.testhist23 = function () {
    var jeu = new Lyngk.Engine();
    jeu.init_multi_color();
    var plateau = jeu.plateau();
    plateau["I7"].remove(1);
    plateau["H6"].remove(1);
    plateau["I7"].pose(Lyngk.Color.BLUE);
    plateau["I7"].pose(Lyngk.Color.WHITE);
    plateau["H6"].pose(Lyngk.Color.BLUE);
    plateau["H6"].pose(Lyngk.Color.WHITE);
    jeu.deplace("I7","H6");
    assertEquals(plateau["H6"].getHauteur(),2);
    assertEquals(plateau["I7"].getHauteur(),2);
};