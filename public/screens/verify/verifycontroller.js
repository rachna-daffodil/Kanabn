kanbanApp.controller('VerifyController', function($scope, $state, $stateParams, DataService){
	var params = {params : {verification : true}};
	DataService.putWebService($scope, '/user/verify/' + $stateParams.email, params, function(err,data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
});