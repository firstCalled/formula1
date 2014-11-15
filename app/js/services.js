angular.module('F1FeederApp.services', []).
	factory('ergastAPIservice', function ($http, $q) {

		var ergastAPI = {};

		ergastAPI.getDrivers = function() {
			var deferred = $q.defer();
			
			$http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
			}).success(function(data) {
				var drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				deferred.resolve(drivers);
			}).error(function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		ergastAPI.getDriverDetails = function (id){
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getDriverRaces = function (id){
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/drivers/' + id + '/results.json?callback=JSON_CALLBACK'
			});
		}		
		return ergastAPI;
	});