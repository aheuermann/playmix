'use strict';

app.factory('SoundCloud', function ($q, $rootScope) {
  var remix = function(song){
    var d = $q.defer();
    console.log(song);
    SC.get('/tracks', {
        q: song.albumArtist + " " + song.name + " remix",
        filter: 'streamable',
        order: 'hotness'
      }, function(tracks) {
        d.resolve(tracks);
        $rootScope.$apply();
    });
    return d.promise;
  }
  return {
    remix: remix
  };
});