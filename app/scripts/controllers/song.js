'use strict';

app.controller('SongCtrl', function ($scope, $rootScope, $stateParams, Rdio, SoundCloud) {
  Rdio.getSong($stateParams.id).then(function(song){
    $scope.song = song;
    if (song) {
      SoundCloud.remix(song).then(function(tracks){
        console.log(tracks.length);
        $scope.tracks = _.reject(tracks, function(t){ console.log(t.track_type);return t.track_type === "original" });
        console.log($scope.tracks);
      });
    }
  });
});
