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
  $rootScope.$watch('playlist', function() {
    if (!_.isEmpty($rootScope.playlist)){
      $rootScope.trackIndex = 0;//Math.floor(Math.random()*$rootScope.playlist.tracks.length);
      updateTrack();
    }
  });

  $rootScope.$watch('track', function(){
    if($rootScope.track){
      SoundCloud.remix($rootScope.track).then(function(tracks){
        if(!_.isEmpty(tracks)){
          $rootScope.remix = tracks[Math.floor(Math.random()*tracks.length)];
        }else{
          console.log("NO REMIXES FOUND");
          $scope.next();
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
    $scope.loading = true;
    if($scope.sound) $scope.sound.stop();
    $rootScope.track = $rootScope.playlist.tracks[$rootScope.trackIndex];
  }

  $scope.isPlaying = function() {
    if (!$scope.sound) return false;
    return $scope.sound.playState === 1 && !$scope.sound.paused;
  }

  $scope.next = function() {
    $rootScope.trackIndex = ($rootScope.trackIndex + 1) % $rootScope.playlist.tracks.length;
    updateTrack();
  }

  $scope.prev = function() {
    $rootScope.trackIndex = ($rootScope.trackIndex - 1 + $rootScope.playlist.tracks.length) % $rootScope.playlist.tracks.length;
    updateTrack();
  }

  $scope.togglePlay = function() {
    if ($scope.sound){
      $scope.sound.togglePause();
    }else{
      $scope.play();
    }
  }

  $scope.play = function() {
    if ($scope.remix){
      console.log("remix", $scope.remix);
      SoundCloud.stream($scope.remix).then(function(sound){
        $scope.sound = sound;
        $scope.loading = false;
        sound.play();
      });
    }
  }
});
