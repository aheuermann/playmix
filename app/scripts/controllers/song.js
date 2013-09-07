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

  $scope.playTrack = function(track) {
    Player.queue(track, $scope.song);
  }
});
