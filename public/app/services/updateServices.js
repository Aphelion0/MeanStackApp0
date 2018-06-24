angular.module('updateServices',[])

.factory('Upd',function($http){
		updateFactory={};

		updateFactory.update=function(updateData){
			return $http.post('/update',updateData);
		};

		return updateFactory;
});