'use strict';

app.controller('NavCtrl', function ($scope, $rootScope, Rdio) {
  $scope.signIn = function() {
    Rdio.auth().then(function(user) {
      $rootScope.user = user;
    }, function(){
      console.log("eerrrrrrr");
    });
  }
})
.controller('PlayerCtrl', function($scope, $rootScope, SoundCloud) {
  $rootScope.$watch('playlist', function(newVal, oldVal) {
    console.log("Playlist", newVal);
    if (!_.isEmpty($rootScope.playlist)){
      $rootScope.trackIndex = 0;//Math.floor(Math.random()*$rootScope.playlist.tracks.length);
      updateTrack();
    }
  });

  $rootScope.$watch('track', function(){
    console.log("track", $rootScope.track);
    if($rootScope.track){
      SoundCloud.remix($rootScope.track).then(function(tracks){
        if(!_.isEmpty(tracks)){
          $rootScope.remix = tracks[Math.floor(Math.random()*tracks.length)];
        }else{
          console.log("NO REMIXES FOUND");
        }
      });
    }
  });

  $rootScope.$watch('remix', function(){
    if($rootScope.remix){
      $scope.play();
    }
  });

  var updateTrack = function(){
    if($scope.sound) $scope.sound.stop();
    $rootScope.track = $rootScope.playlist.tracks[$rootScope.trackIndex];
  }

  $scope.isPlaying = function() {
    if (!$scope.sound) return false;
    return $scope.sound.playState === 1 && !$scope.sound.paused;
  }

  $scope.next = function() {
    $rootScope.trackIndex = ($rootScope.trackIndex + 1) % $rootScope.playlist.tracks.length;
    console.log("newIndex", $rootScope.trackIndex);
    updateTrack();
  }

  $scope.prev = function() {
    $rootScope.trackIndex = ($rootScope.trackIndex - 1 + $rootScope.playlist.tracks.length) % $rootScope.playlist.tracks.length;
    updateTrack();
  }

  $scope.togglePlay = function() {
    console.log("toggle");
    if ($scope.sound){
      //$scope.sound.togglePause();
    }else{
      $scope.play();
      console.log("no sound");
    }
    console.log("sound", $scope.sound);
  }

  $scope.play = function() {
    if ($scope.remix){
      console.log("remix", $scope.remix);
      SC.stream('/tracks/' + $scope.remix.id, function(sound){
        console.log("playing");
        $scope.sound = sound;
        sound.play();
        $rootScope.$apply();
      });
    }
  }
});
