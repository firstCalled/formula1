angular.module("F1FeederApp",[
	'F1FeederApp.controllers',
	'F1FeederApp.services',
	'ngRoute'
]).
config(['$routeProvider', function ($routeProvider){
	$routeProvider.
		when("/drivers", {
			templateUrl: "partials/drivers.html", 
			controller: "driversController",
			resolve: {
				drivers: function (ergastAPIservice) {
					return ergastAPIservice.getDrivers();
				}
			}
		}).
		when("/drivers/:id", {
			templateUrl:"partials/driver.html", 
			controller: "driverController",
			resolve: {
				driver: function (ergastAPIservice) {
					return ergastAPIservice.getDriverDetails();
				},
				races: function (ergastAPIservice) {
					return ergastAPIservice.getDriverRaces();
				}
			}
		}).
		otherwise({redirectTo: '/'});
}]);