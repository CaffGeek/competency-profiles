'use strict';
(function() {
	var myApp = angular.module('consultingServices');
    
    myApp.service('competencyLevelsService', competencyLevelsService);
    
    competencyLevelsService.$inject = ['$http', '$q'];
    
    function competencyLevelsService ($http, $q) {
        // I transform the successful response, unwrapping the application data
        // from the API response payload.

		function handleSuccess(response) {
			return (response.data);
		}

		// I transform the error response, unwrapping the application data from
		// the API response payload.

		function handleError(response) {
		// The API response from the server should be returned in a
		// normalized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.
			if (!angular.isObject(response.data) ||
				!response.data.message) {
				return ($q.reject('An unknown error occurred.'));
			}
		// Otherwise, use expected error message.
			return ($q.reject(response.data.message));
		}

		this.getCompetencyLevels = function() {
			var request = $http({
				method: 'get',
				url: '/api/competencyLevels/'
			});
			return (request.then(handleSuccess, handleError));
			};
			
		this.getCompetencyLevel = function (id) {
				var request = $http({
					method: 'get',
					url: '/api/competencyLevels/' + id
			});
				return (request.then(handleSuccess, handleError));
			};

		this.save = function(competencyLevel) {
			var request = $http({
				method: 'put',
				url: '/api/competencyLevels/' + competencyLevel._id,
				data: {
					level: competencyLevel
				}
			});
			return (request.then(handleSuccess, handleError));
		};
	}
})();
