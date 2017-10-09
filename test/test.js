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