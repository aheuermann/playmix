'use strict';

app.factory('SoundCloud', function ($q, $rootScope) {
  var _filter  = function(tracks) {
    return _.filter(tracks, function(track){
      return track.streamable;
    });
  }

  var remix = function(song){
    var d = $q.defer();
    SC.get('/tracks', {
        q: song.albumArtist + " " + song.name + " remix",
        filter: 'streamable',
        order: 'hotness',
        limit: 50
      }, function(tracks) {
        d.resolve(_filter(tracks));
        $rootScope.$apply();
    });
    return d.promise;
  }

  var stream = function(remix){
    var d = $q.defer();
    SC.stream('/tracks/' + remix.id, function(sound){
      d.resolve(sound);
      if(!$rootScope.$$phase) $rootScope.$apply();
    });
    return d.promise;
  }

  return {
    remix: remix,
    stream: stream
  };
});