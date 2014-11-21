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
		when("/drivers/:id/year/:year", {
			templateUrl:"partials/driver.html", 
			controller: "driverController",
			resolve: {
				driver: function (ergastAPIservice, $route) {
					return ergastAPIservice.getDriverDetails($route.current.params.id, $route.current.params.year);
				},
				races: function (ergastAPIservice, $route) {
					return ergastAPIservice.getDriverRaces($route.current.params.id, $route.current.params.year);
				},
				year: function ($route) {
					return $route.current.params.year;
				}
			}
		}).
		otherwise({redirectTo: '/'});
}]);