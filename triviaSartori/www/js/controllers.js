angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('MiCuentaCtrl', function($scope) {
  $scope.Ingresar = function(){
    console.log("usuario: " + $scope.usuario);
  }

})

.controller('TriviaCtrl', function($scope, Chats, $cordovaVibration, $cordovaNativeAudio) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/
  $scope.colorBoton = "button-energized";
  $cordovaNativeAudio.preloadSimple('correcto', 'sounds/correct.mp3');
  $cordovaNativeAudio.preloadSimple('incorrecto', 'sounds/wrong.mp3');

  $scope.Incorrecto = function(){
    $scope.colorBoton = "button-assertive";
    $cordovaVibration.vibrate([100, 300, 100]);
    $cordovaNativeAudio.play('incorrecto');
  }

  $scope.Correcto=function(){
    $scope.colorBoton="button-balanced";
    $cordovaVibration.vibrate(100);
    $cordovaNativeAudio.play('correcto');
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AcercaDeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
