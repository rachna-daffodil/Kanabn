kanbanApp.controller('SigninController', function($scope,  $state, DataService) {
    $scope.submit = function(){
        console.log("in signin controller");
    	var params = {email : $scope.loginemail, password : $scope.pass};
    	DataService.postWebService($scope, '/user/signin', params, function(err, data){
    		if(err){
    			alert(err.message);
    		} else {
    			console.log(data);
    			if(data && data.length > 0){
		 			if(data[0].verify == false){
		 				alert("You are not verified");
		 			} else {
		 				window.localStorage.setItem("email", data.email);
		 	 			$state.go('dashboard');
                        console.log("successfully logged in"+data);
		     		}
    			}
    		}
    	});
	}
});