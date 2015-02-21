kanbanApp.controller('ResetPasswordController', function($scope, $state, DataService){
	$scope.reset = function(){
		var params = {"email" : $scope.user5};
		DataService.putWebService($scope, '/user/resetpassword/' + $scope.user5, params, function(err, data){
			if(err){
				console.log(err);
			} else {
				alert("Your password has been changed");
				$state.go('signin');
				console.log(data);
			}
		});
	}
});