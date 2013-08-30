'use strict';

var app = angular.module('remixApp', ['ui.state']);
app.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.when("", "/");
  $stateProvider
  .state("home", {
    url: "/",
    views: {
      'nav': {
        templateUrl: 'views/nav.html',
        controller: "NavCtrl"
      },
      '' : {
        templateUrl: 'views/home.html',
        controller: "HomeCtrl"
      }
    },
  })
  .state("playlists", {
    url: "/playlists",
    views: {
      'nav': {
        templateUrl: 'views/nav.html',
        controller: "NavCtrl"
      },
      '' : {
        templateUrl: 'views/playlists.html',
        controller: "PlaylistsCtrl"
      }
    },
  })
  .state("song", {
    url: "/s/{id}",
    views: {
      'nav': {
        templateUrl: 'views/nav.html',
        controller: "NavCtrl"
      },
      '' : {
        templateUrl: 'views/song.html',
        controller: "SongCtrl"
      }
    },
  });
})
.run(function(Rdio, $rootScope){
  R.ready(function(){
    $rootScope.user = Rdio.currentUser();
    $rootScope.$apply();
  });
});
