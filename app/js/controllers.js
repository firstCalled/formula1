angular.module('F1FeederApp.controllers', []).

// Drivers controller
controller('driversController', function ($scope, drivers, ergastAPIservice){
	var now = new Date(),
		year = now.getYear() + 1900,
		i = 6;
	
	$scope.years = [];
	while (i--) {
		$scope.years.push(year - i);
	}

	$scope.nameFilter = null;
	$scope.year = 2014;
	$scope.selectedYear = 2014;
	$scope.driversList = drivers;

	$scope.changeYear = function (year) {
		$scope.year = year;
		ergastAPIservice.getDrivers(year).then(function (drivers) {
			$scope.driversList = drivers;
		});

	};


	$scope.getDriver = function(id) {
		ergastAPIservice.getDriverDetails(id);
	};

	$scope.searchFilter = function (driver) {
		var re = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
	};

}).

// Driver controller
controller('driverController', function ($scope, $routeParams, ergastAPIservice, races, driver) {

	$scope.id = $routeParams.id;
	$scope.races = races;
	$scope.driver = driver;
	$scope.year = $routeParams.year;

	});
