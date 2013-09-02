'use strict';

app.factory('SoundCloud', function ($q, $rootScope) {
  var remix = function(song){
    var d = $q.defer();
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

  var stream = function(remix){
    var d = $q.defer();
    SC.stream('/tracks/' + remix.id, function(sound){
      d.resolve(sound);
      $rootScope.$apply();
    });
    return d.promise;
  }

  return {
    remix: remix,
    stream: stream
  };
});