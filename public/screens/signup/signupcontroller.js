kanbanApp.controller('SignupController',function($scope, $state, DataService){
	$scope.add=function(){
		if($scope.pass1!=$scope.pass2){
	      console.log("error");
	    } else {
			var params = {params : {name : $scope.user, email : $scope.email, password : $scope.pass1}};
			DataService.postWebService($scope, '/user/signup', params, function(err,data){
				if(err){
					console.log(err);
				} else {
					console.log(data);
				}
			});
	 	}
	}
})