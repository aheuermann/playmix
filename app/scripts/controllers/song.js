'use strict';

app.controller('SongCtrl', function ($scope, $stateParams, songData, Player) {
  $scope.song = songData.song;
  $scope.tracks = songData.tracks;

  $scope.playAll = function() {
    Player.queue(songData.tracks, songData.song);
  }

  $scope.playTrack = function(track) {
    Player.queue(track, songData.song);
  }
})
.factory('songData', function($q, Rdio, SoundCloud) {
  return {
    get: function(id){
      var d = $q.defer();
      Rdio.getSong(id).then(function(song){
        var rval = {song: song};
        if (song) {
          SoundCloud.remix(song).then(function(tracks){
            rval.tracks = tracks;
            d.resolve(rval)
          });
        }else{
          d.reject("Song not found");
        }
      });
      return d.promise;
    }
  }
});
