'use strict';

app.controller('SongCtrl', function ($scope, $rootScope, $stateParams, Rdio, SoundCloud) {
  Rdio.getSong($stateParams.id).then(function(song){
    $scope.song = song;
    if (song) {
      SoundCloud.remix(song).then(function(tracks){
        $scope.tracks = tracks;
      });
    }
  });
})
app.controller('TrackCtrl', function ($scope, $rootScope) {
  $scope.play = function() {
    $rootScope.track = $scope.song;
    $rootScope.remix = $scope.track;
  }
});
