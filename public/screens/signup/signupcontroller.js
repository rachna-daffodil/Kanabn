kanbanApp.controller('SignupController', function($scope, $state, $stateParams, DataService){
	$scope.add=function(){
		console.log("in signup controller");
		if($scope.pass1!=$scope.pass2){
	      console.log("error");
	    } else {
			var params =  {name : $scope.user, email : $scope.email, password : $scope.pass1};
			DataService.postWebService($scope, '/user/signup', params, function(err,data){
				 if(err){
				 	console.log(err);
				 } else {
					$state.go('signin');
					console.log(data+"dvdv"+$stateParams.token);
					if($stateParams.token){
						var params = {"email" : data.email };
	   					DataService.putWebService($scope, '/project/updateemail/' +$stateParams.token +'/'+data.email, params, function(err,data1){
	    					if(err){
	    						console.log(err);
	    					} else { console.log(data.email);
	    						console.log("result of array update "+data1);
	    					}
	   					});
					}
				}
			});
	 	}
	}
})