kanbanApp.controller('VerifyController', function($scope, $state, $stateParams, DataService){
	$scope.result = "false";
	var params = {verify : true};
	DataService.putWebService($scope, '/user/verify/' + $stateParams.token, params, function(err,data){
		if(err){
			console.log("error",err);
		} else {
			$scope.result = data;
			console.log("result in controller "+$scope.result);
		}
	});
	
});