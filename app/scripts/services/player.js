'use strict';

app.factory('Player', function ($q, $rootScope, SoundCloud, Alert) {
  var _index = 0
    , _tracks = null
    , _track = null
    , _stream = null;
  
  var _cancelCurrent = function() {
    if (_stream) {
      _stream.then(null);
      _stream=null;
      if($rootScope.sound) {
        $rootScope.sound.stop();
      }
    }
  }

  var _play = function(){
    _cancelCurrent();
    _track = _tracks[_index];
    Alert.info('Buffering...');
    _stream = SoundCloud.stream(_track.mix);
    _stream.then(function(sound){
      Alert.clear();
      if(sound){
        $rootScope.track = _track;
        $rootScope.sound = sound;
        sound.play({
          whileplaying: _.throttle(function() {
            $rootScope.$apply(); //to update the sound percent...
          }, 500),
          onFinish: function() {
            next();
          }
        });
      }
    });
  }

  var lookupAndPlay = function(tracks) {
    Alert.info('Remixin\'...');
    var results = [];
    tracks = _.clone(tracks);
    var lookupTrack = function(items) {
      if(_.isEmpty(items)) return;
      SoundCloud.remix(items[0]).then(function(mixes){
        if(!_.isEmpty(mixes)){
          results.push({
            original: items[0],
            mix: mixes[Math.floor(Math.random()*mixes.length)]
          });
          if(results.length == 1) {
            _queue(results); //start playing if it exists
          }
        }
        items.shift();
        lookupTrack(items);
      });
    }
    _cancelCurrent();
    if (!_.isArray(tracks)) tracks = [tracks];
    lookupTrack(tracks);
  }

  var next = function() {
    _index =  (_index + 1) % _tracks.length;
    _play();
  }

  var prev = function() {
    _index = (_index + _tracks.length - 1) % _tracks.length;
    _play();
  }

  var _queue = function(tracks) {
    _tracks = tracks;
    _index = 0;
    _play();
  }

  var queue = function(tracks, original) {
    if (!_.isArray(tracks)) tracks = [tracks];
    if(!tracks[0].mix){
      tracks = _.map(tracks, function(t){
        return {mix:t, original:original};
      });
    }
    _queue(tracks);
  }

  var isPlaying = function () {
    if (!$rootScope.sound) return false;
    return $rootScope.sound.playState === 1 && !$rootScope.sound.paused;
  }

  var togglePlay = function() {
    if ($rootScope.sound){
      $rootScope.sound.togglePause();
    }
  }

  var getTracks = function () {
    return _tracks;
  }

  return {
    queue: queue,
    lookupAndPlay: lookupAndPlay,
    next: next,
    prev: prev,
    isPlaying: isPlaying,
    togglePlay: togglePlay,
    getTracks: getTracks
  }
});
