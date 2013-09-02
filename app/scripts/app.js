'use strict';

var app = angular.module('remixApp', ['ui.router']);
app.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
  //$locationProvider.html5Mode(true);
  $urlRouterProvider
    .when("", "/")
    .otherwise("/");
    
  $stateProvider
  .state("app", {
    url: "/",
    abstract: true,
    views: {
      '': {
        templateUrl: 'views/nav.html',
        controller: "NavCtrl"
      }
    }
  })
  .state("app.home", {
    url: "",
    views: {
      '' : {
        templateUrl: 'views/home.html',
        controller: "HomeCtrl"
      }
    }
  })
  .state("app.playlists", {
    url: "playlists",
    views: {
      '' : {
        templateUrl: 'views/playlists.list.html',
        controller: "PlaylistsCtrl"
      }
    }
  })
  .state("app.song", {
    url: "s/{id}",
    views: {
      '' : {
        templateUrl: 'views/song.html',
        controller: "SongCtrl"
      }
    }
  })
  .state("app.playlist", {
    url: "p/{id}",
    views: {
      '' : {
        templateUrl: 'views/playlist.html',
        controller: "PlaylistCtrl"
      }
    }
  });
})
.run(function(Rdio, $rootScope){
  R.ready(function(){
    $rootScope.user = Rdio.currentUser();
    $rootScope.$apply();
  });
});
