'use strict';

angular.module('remixApp', ['ui.state'])
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.when("", "/")
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/collection', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    */
    $stateProvider
    .state("home", {
      url: "/",
      views: {
        'nav': {
          templateUrl: 'views/nav.html'
        },
        '' : {
          templateUrl: 'views/home.html'
        }
      },
    })
    .state("collection", {
      url: "/collection",
      views: {
        'nav': {
          templateUrl: 'views/nav.html'
        },
        '' : {
          templateUrl: 'views/collection.html'
        }
      },
      
    });
  });
