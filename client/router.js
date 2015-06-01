App = angular.module('App')
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('teams', {
          url: '/',
          templateUrl: 'client/modules/teams/views/index.ng.html',
          controller: 'TeamsController',
        })

      $urlRouterProvider.otherwise("/");
    }
  ])
