'use strict';

app.controller('NavCtrl', function ($scope, Rdio) {
  $scope.signIn = function() {
    Rdio.auth().then(function(user) {
      $scope.user = user;
    }, function(){
      console.log("eerrrrrrr");
    });
  }
});
