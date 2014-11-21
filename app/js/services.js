angular.module('F1FeederApp.services', []).
	factory('ergastAPIservice', function ($http, $q) {

		var ergastAPI = {};

		ergastAPI.getDrivers = function(year) {
			var deferred = $q.defer()
				year = year || 'current';
			
			$http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/' + year + '/driverStandings.json?callback=JSON_CALLBACK'
			}).success(function (data) {
				var drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				deferred.resolve(drivers);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		ergastAPI.getDriverDetails = function(id, year){

			var deferred = $q.defer(),
				year = year || 'current';

			$http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/' + year +'/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
			}).success(function (data) {

				var driver = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
				deferred.resolve(driver);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		ergastAPI.getDriverRaces = function (id, year){
			var deferred = $q.defer(),
			year = year || 'current';

			$http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/results.json?callback=JSON_CALLBACK'
			}).success(function (data) {
				var races = data.MRData.RaceTable.Races;
				deferred.resolve(races);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}		
		return ergastAPI;
	});