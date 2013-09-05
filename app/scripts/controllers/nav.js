'use strict';

app.controller('NavCtrl', function ($scope, $rootScope, Rdio) {
  $scope.signIn = function() {
    Rdio.auth().then(function(user) {
      $rootScope.user = user;
    }, function(){
      console.log("eerrrrrrr");
    });
  }
})
.controller('PlayerCtrl', function ($scope, Player) {
  $scope.isPlaying = Player.isPlaying;

  $scope.next = Player.next;

  $scope.prev = Player.prev;

  $scope.togglePlay = Player.togglePlay;

});
