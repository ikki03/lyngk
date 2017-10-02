'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
LyngkTestCase.prototype.testcoorok = function () {
    var testcase = new Lyngk.Coordinates("A", 1);
    assertFalse(testcase.valid());
}
LyngkTestCase.prototype.testhist2 = function () {
    var compteur = 0;
    var testcase;
    for (var c = 65; c <= 74; c++) {
        for (var l = 1; l <= 9; l++) {
            testcase = new Lyngk.Coordinates(String.fromCharCode(c), l);
            if (testcase.valid()) {
                compteur++
            }
        }
    }
    assertEquals(compteur, 43);
}