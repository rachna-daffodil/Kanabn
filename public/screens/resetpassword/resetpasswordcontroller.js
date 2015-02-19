kanbanApp.controller('ResetPasswordController', function($scope, $state, DataService){
	$scope.reset = function(){
		DataService.putWebService($scope, '/user/resetpassword/' + $scope.user5, params, function(err, data){
			if(err){
				console.log(err);
			} else {
				console.log(data);
			}
		});
	}
});