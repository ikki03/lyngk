'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
 LyngkTestCase.prototype.testcoorok = function () {
     var testcase = new Lyngk.Coordinates("A",1);
     assertFalse(testcase.valid());
 }