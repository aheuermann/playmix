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
    },
    resolve: {
      playlists: 'playlists'
    }
  })
  .state("app.song", {
    url: "s/{id}",
    views: {
      '' : {
        templateUrl: 'views/song.html',
        controller: "SongCtrl"
      }
    },
    resolve: {
      songData: ['$stateParams', 'songData', function($stateParams, songData) {
        return songData.get($stateParams.id);
      }]
    }
  })
  .state("app.playlist", {
    url: "p/{id}",
    views: {
      '' : {
        templateUrl: 'views/playlist.html',
        controller: "PlaylistCtrl"
      }
    },
    resolve: {
      playlist: ['$stateParams', 'playlist', function($stateParams, playlist) {
        return playlist.get($stateParams.id);
      }]
    }
  });
})
.run(function(Rdio, $rootScope){
  R.ready(function(){
    $rootScope.user = Rdio.currentUser();
    $rootScope.$apply();
  });
})
.run(function($rootScope, Alert){
  $rootScope.$on("$stateChangeStart", function (event, next, current){
    Alert.info("Loading...");
  });

  $rootScope.$on("$stateChangeSuccess", function (event, current, previous){
    $(document.body).removeClass("bootstrappin");
    Alert.clear();
  });
  
  $rootScope.$on("$stateChangeError", function (event, current, previous, rejection){
    Alert.error("Error, please refresh and try again");
  });

});
