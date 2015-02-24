var kanbanApp = angular.module('KanBanApp', ['ui.router', 'ngCookies', 'ngDraggable','ngDialog']);

kanbanApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('signin', {
            url: '/user/signin',
			controller:'SigninController',
			templateUrl: '/screens/signin/signin.html'
        })
        
        .state('signup', {
            url: '/user/signup',
			controller: 'SignupController',
            templateUrl: '/screens/signup/signup.html'       
        })
		.state('resetpassword', {
            url: '/user/resetpassword',
			controller: 'ResetPasswordController',
            templateUrl: '/screens/resetpassword/reset.html'     
        })
		.state('dashboard', {
            url: '/dashboard',
			controller: 'DashboardController',
            templateUrl: '/screens/dashboard/dashboard.html'       
        })
        .state('dashboard.project', {
            url: '/project',
            controller: 'DashboardController',
            templateUrl: '/screens/dashboard/project.html'       
        })
		.state('verify', {
            url: '/user/verify/:token',
			controller: 'VerifyController',
            templateUrl: '/screens/verify/verify.html'       
        })
		.state('invite', {
            url: '/user/invite/:token',
			controller: 'SignupController',
            templateUrl: '/screens/signup/signup.html'       
        })

        $urlRouterProvider.otherwise('/user/signin');
});

