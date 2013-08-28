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

  return {
    auth: auth,
    currentUser: currentUser,
    currentTrack: currentTrack
  };
});