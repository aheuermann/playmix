'use strict';

app.controller('SongCtrl', function ($scope, $rootScope, Rdio, $stateParams) {
  Rdio.getSong($stateParams.id).then(function(song){
    $scope.song = song;
  });
});
