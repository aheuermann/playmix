'use strict';

app.controller('SongCtrl', function ($scope, $rootScope, $stateParams, Rdio, SoundCloud) {
  Rdio.getSong($stateParams.id).then(function(song){
    $scope.song = song;
    if (song) {
      SoundCloud.remix(song).then(function(tracks){
        $scope.tracks = tracks;
        //$scope.tracks = _.reject(tracks, function(t){ return t.track_type === "original" });
      });
    }
  });
});
