'use strict';

app.controller('NavCtrl', function ($scope, $rootScope, Rdio) {
  $scope.signIn = function() {
    Rdio.auth().then(function(user) {
      $rootScope.user = user;
    }, function(){
      console.log("eerrrrrrr");
    });
  }
});
