angular
	.module('Florish')
	.factory('potsFactory', potsFactory)

potsFactory.$inject = ['$http']

function potsFactory($http){
	var potsUrl = 'https://florish-app.herokuapp.com/api/pots'
	var pots = {}

	pots.list = function(){
		return $http.get(potsUrl)
	}

	// pots.show = function(potId){
	// 	return $http.get(potsUrl + '/' + potId)
	// }

	pots.addPot = function(data){
		return $http.post(potsUrl, data)
	}

	// pots.updatePot = function(potId,data){
	// 	return $http.patch(potsUrl + '/' + potId, data)
	// }

	// pots.removePot = function(potId){
	// 	return $http.delete(potsUrl + '/' + potId)
	// }

	return pots
}
