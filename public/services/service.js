kanbanApp.service('DataService',['$http', function ($http) {
    var result;
   this.getWebService = function ($scope, webServiceUrl, callback) {
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
      $http.get(webServiceUrl).
      success(function(data){
              console.log("data is "+data);
              result = data;
              console.log("result in service ",result);
              callback(null,data);
            }).error(function(data){
               alert("error is ");
               result = data;
            });
        return result;
   };

   this.postWebService = function ($scope, webServiceUrl, params, callback) {
        console.log("in service"+webServiceUrl+'/'+JSON.stringify(params));
       var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
            $http.post(webServiceUrl, params).
            success(function(data){
              console.log("data is "+data);
              result = data;
              console.log("result in service ",result);
              callback(null,data);
            }).error(function(data){
               alert("error is ");
               result = data;
            });
        return result;
    };
   this.putWebService = function ($scope, webServiceUrl, params, callback ){
      console.log("in service"+webServiceUrl+'/'+$scope);
      
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
       $http.put(webServiceUrl, params).
        success(function(data){
          console.log("data is "+data);
          result = data;
          console.log("result in service ",result);
          callback(null,data);
        }).error(function(data){
          alert("error is "+data);
          result = data;
        });
        return result;
   };
   this.deleteWebService = function ($scope, webServiceUrl, params) {
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
      return $http.delete(webServiceUrl,params);
   };
}]);