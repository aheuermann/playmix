'use strict';

app.controller('PlayerCtrl', function ($scope, $filter, Player) {
  $scope.isPlaying = Player.isPlaying;

  $scope.next = Player.next;

  $scope.prev = Player.prev;

  $scope.togglePlay = Player.togglePlay;

  $scope.radius = 55;

  var startX = 62.5;
  var startY = 8.5;
  var halfX = startX;
  var halfY = startY + $scope.radius;
  $scope.x1 = startX;
  $scope.y1 = startY;
  $scope.x2 = halfX;
  $scope.y2 = halfY;
  
  $scope.$watch('sound.position', _.throttle(function(){
    $scope.percent = Player.percentComplete();
    if(!$scope.percent){
      $scope.percent = 0;
    }
    var percent1 = $scope.percent <= 50 ? $scope.percent : 50;
    var percent2 = $scope.percent > 50 ? $scope.percent : 50;

    var d = percent1/100*360+270;
    var d2 = percent2/100*360+90;
    $scope.x1 = 62.5 + $scope.radius*Math.cos(d*(Math.PI/180));
    $scope.y1 = 63.5 + $scope.radius*Math.sin(d*(Math.PI/180));
    $scope.x2 = 62.5 - $scope.radius*Math.cos(d2*(Math.PI/180));
    $scope.y2 = 63.5 - $scope.radius*Math.sin(d2*(Math.PI/180));
  }, 1000));

});
