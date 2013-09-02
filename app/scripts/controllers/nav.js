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
.controller('PlayerCtrl', function($scope, $rootScope) {
  console.log("player");
  

  $rootScope.$watch('playlist', function(newVal, oldVal) {
    console.log("newVal", newVal);
    if (!_.isEmpty($rootScope.playlist)){
      console.log("playlist", $rootScope.playlist);
      $scope.track = $rootScope.playlist.tracks[0];
    }
  });


  SC.stream('/tracks/78167093', function(sound){
    $scope.playing = true;
    console.log("sound", sound);
    $scope.sound = sound;
    console.log("sound", $scope.sound);
    //sound.play();
    $rootScope.$apply();
  });

  $scope.isPlaying = function() {
    if (!$scope.sound) return false;
    return $scope.sound.playState === 1 && !$scope.sound.paused;
  }
  $scope.next = function() {
    console.log("next");
  }

  $scope.prev = function() {
    console.log("prev");
  }

  $scope.togglePlay = function() {
    console.log("toggle");
    if ($scope.sound){
      //$scope.sound.togglePause();
    }else{
      console.log("no sound");
    }
    console.log("sound", $scope.sound);
  }

});
