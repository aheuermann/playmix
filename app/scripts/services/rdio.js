'use strict';

app.factory('Rdio', function ($q, $rootScope) {
  var auth = function(){
    var d = $q.defer();
    if (R.authenticated()) {
      d.resolve(R.currentUser.attributes);
      $rootScope.$apply();
    }else{
      R.authenticate(function(success){
       if(success){
        d.resolve(R.currentUser.attributes);
       }else{
        deferred.reject();
       }
       $rootScope.$apply();
      });
    }
    return d.promise;
  }

  var currentUser = function(){
    if (R.authenticated()) {
      return R.currentUser.attributes;
    }
  }
  
  var currentTrack = function(){
    if (R.player.playingTrack()){
      return R.player.playingTrack().attributes;
    }
  }

  var getSong = function(id) {
    var d = $q.defer();
    R.request({
      method: "get", 
      content: {
        keys: [id]
      },
      success: function(response) {
        d.resolve(response.result[id]);
        $rootScope.$apply();
      },
      error: function(response) {
        console.error(response);
        d.reject("ERRRRR");
        $rootScope.$apply();
      }
    });
    return d.promise;
  }

  var getPlaylists = function(id) {
    var d = $q.defer();
    R.request({
      method: "getPlaylists", 
      success: function(response) {
        console.log(response);
        d.resolve(response.result);
        $rootScope.$apply();
      },
      error: function(response) {
        console.error(response);
        d.reject("ERRRRR");
        $rootScope.$apply();
      }
    });
    return d.promise;
  }

  var getPlaylist = function(id) {
    var d = $q.defer();
    R.request({
      method: "get", 
      content: {
        keys: [id],
        type: "Playlist",
        extras: "tracks,Track.playCount"
      },
      success: function(response) {
        d.resolve(response.result[id]);
        $rootScope.$apply();
      },
      error: function(response) {
        console.error(response);
        d.reject("ERRRRR");
        $rootScope.$apply();
      }
    });
    return d.promise;
  }

  return {
    auth: auth,
    currentUser: currentUser,
    currentTrack: currentTrack,
    getSong: getSong,
    getPlaylists: getPlaylists,
    getPlaylist: getPlaylist
  };
});