kanbanApp.controller('SigninController', function($scope,  $state, DataService) {
    $scope.username = "";
    $scope.submit = function(){
        console.log("in signin controller");
    	var params = {email : $scope.loginemail, password : $scope.pass};
    	DataService.postWebService($scope, '/user/signin', params, function(err, data){
    		if(err){
    			alert(err.message);
    		} else {
    			if(data && data.length > 0){
		 			if(data[0].verify == false){
		 				alert("You are not verified");
		 			} else {
		 				window.localStorage.setItem("email", data[0].email);
                        window.localStorage.setItem("name", data[0].name);
                        $scope.username = window.localStorage.getItem("name");
                        $state.go('dashboard');
                        console.log("successfully logged in"+data[0].name+'/'+$scope.username);
		     		}
    			}
    		}
    	});
	}
});