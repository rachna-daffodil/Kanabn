kanbanApp.service('DataService', function ($http) {

   this.getWebService = function ($scope, webServiceUrl, params) {
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
      return $http.get(completeWebServiceUrl, params);
   };

   this.postWebService = function ($scope, webServiceUrl, params, token) {
       var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
       if (token) {
           return $http.post(completeWebServiceUrl, (params && params.data ? params.data : null), { headers: {"X-CSRF-Token": token, "Content-Type": "application/json"} });
       } else {
           return $http.post(completeWebServiceUrl, (params && params.data ? params.data : null));
       }
   };
   this.putWebService = function ($scope, webServiceUrl, params) {
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
      return $http.put(completeWebServiceUrl,params);
   };
   this.deleteWebService = function ($scope, webServiceUrl, params) {
      var completeWebServiceUrl = $scope.BASE_URL + webServiceUrl;
      return $http.delete(completeWebServiceUrl,params);
   };
});