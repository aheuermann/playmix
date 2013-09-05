'use strict';

app.controller('SongCtrl', function ($scope, $stateParams, Rdio, SoundCloud, Player) {
  Rdio.getSong($stateParams.id).then(function(song){
    $scope.song = song;
    if (song) {
      SoundCloud.remix(song).then(function(tracks){
        $scope.tracks = tracks;
      });
    }
  });

  $scope.playAll = function() {
    Player.queue($scope.tracks, $scope.song);
  }
})
app.controller('TrackCtrl', function ($scope, Player) {
  $scope.play = function() {
    Player.queue($scope.track, $scope.song);
  }
});
