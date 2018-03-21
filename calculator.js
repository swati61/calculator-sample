var myApp = angular.module('calculatorPrj', []);



//filter to format values for further calculation

myApp.filter('removeCommasFromNum', function () {

  return function(input) {

return input.replace(/,\s?/g, "");

  };

});



function MyCtrl($scope, $filter) {

  $scope.output = "0";

  $scope.inOperation = false;

$scope.inOperationUse = false;

  $scope.num1 = 0;

$scope.num2 = 0;

  $scope.result = 0;

$scope.operator = "";



$scope.flag = 0;

  $scope.disableClick = function(n) {    

    if (String($scope.output).length > 1) {

var newStringvalue = ($scope.output).slice(0, -1);

$scope.output = $filter('removeCommasFromNum')(newStringvalue);

    }

else{

$scope.output = 0;

$scope.inOperation = false;

$scope.isDisabled = false;

}

  

    return false;

  }



  $scope.sendValue = function(btn) {

$scope.numLimit = 28;

$scope.isDisabled = false;

console.log(String($scope.output).length >= $scope.numLimit)

if (String($scope.output).length >= $scope.numLimit) {

console.log("$scope.inOperation ");

$scope.isDisabled = true;

}



if($scope.inOperation == false){

if ($scope.output == "0") {

$scope.output = btn;

$scope.num1 = String(btn);

} else {

$scope.output += String(btn);

$scope.num1 += String(btn);

}

}

else{

$scope.output += String(btn);

if($scope.num2 == 0){

$scope.num2 = String(btn);

}

else{

$scope.num2 += String(btn);

}

}

  };



  $scope.operate = function(op) {

    if ($scope.output && !$scope.inOperationUse) {

$scope.operator = op;

$scope.num1 = $filter('removeCommasFromNum')($scope.output);

$scope.output += op;

      $scope.inOperation = true;

$scope.inOperationUse = true;

    }

  };



  $scope.equal = function() {

if ($scope.inOperationUse) {

switch($scope.operator){

case "+":

console.log("Plus.. "+($scope.num1)+'  '+$scope.num2);

$scope.result = Number($scope.num1) + Number($scope.num2);

break;

case "-":

console.log("Minus.. "+($scope.num1)+'  '+$scope.num2);

$scope.result = Number($scope.num1) - Number($scope.num2);

break;

case "*":

console.log("Multiply.. "+($scope.num1)+'  '+$scope.num2);

$scope.result = Number($scope.num1) * Number($scope.num2);

break;

case "/":

console.log("Division.. "+($scope.num1)+'  '+$scope.num2);

$scope.result = Number($scope.num1) / Number($scope.num2);

break;

}



console.log("Before Formatting:: "+$scope.output);

$scope.output = $filter('number')($scope.result);

console.log("After Formatting:: "+$scope.output);

$scope.num2 = 0;

$scope.inOperationUse = false;

}

  };



$scope.resetDisplayBox = function() {

$scope.output = "0";

$scope.num1 = 0;

$scope.result = 0;

$scope.num2 = 0;

$scope.operator = "";

}

}

myApp.controller('MyCtrl', MyCtrl);