angular.module('starter.controllers', ['ionic'])
  .factory('login', function () {
    var logueado = false;
    var login = {};
    login.setLogueado = function (valor) {
      logueado = valor;
    };
    login.getLogueado = function () {
      return logueado;
    };
    return login;
  })
  .controller("FooterCtrl", ['$scope', '$rootScope', 'login', function ($scope, $state, login) {
    $scope.getLogueado = login.getLogueado;
  }])
  .controller('MiCuentaCtrl', ['$scope', '$state', 'login', "$ionicPopup", function ($scope, $state, login, $ionicPopup) {
    $scope.getLogueado = login.getLogueado;
    $scope.setLogueado = login.setLogueado;
    $scope.form = {}
    $scope.error = false;
    $scope.form.usuario = "";
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Trivia',
        template: 'Error al iniciar sesi\u00f3n'
      });
    }
    $scope.Ingresar = function () {
      console.log("usuario: " + $scope.form.usuario);
      if ($scope.form.usuario == 1) {
        $scope.setLogueado(true);
        $state.go('tab.trivia');
      } else {
        $scope.showAlert();
      }
    }

  }])

  .controller('TriviaCtrl', [
    '$scope', '$state', 'login', "$ionicPopup", function ($scope, $state, login, $ionicPopup) {
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
      var ctrl = $scope.ctrl = {};
      ctrl.preguntaActual = 0;
      ctrl.preguntasCorrectas = 0;
      ctrl.preguntaSeleccionada = null;
      ctrl.siguiente = function (pregunta) {
        ctrl.preguntaSeleccionada = pregunta;
        if (pregunta.active) {
          ctrl.preguntasCorrectas++;
        } else {

        }
        if (ctrl.preguntaActual == 6) {
          $scope.showAlert();
        }
        ctrl.preguntaActual++;

      }
      $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Trivia',
          template: 'Preguntas correctas: ' + ctrl.preguntasCorrectas
        });
      }
      ctrl.preguntas = [{
        pregunta: 1,
        img: '<img src="img/higrometro.jpg" style="width:200px; margin-top:15%; margin-left:20%;">',
        descripcionPregunta: "Cual es el numero at\u00f3mico del hidr\u00f3geno?",
        respuestas: [{
          id: 1,
          name: '1',
          active: true
        }, {
            id: 2,
            name: '24',
            active: false
          }, {
            id: 3,
            name: '12',
            active: false
          }]
      }, {
          pregunta: 2,
          img: 'img/programming.jpg',
          descripcionPregunta: "Cual de estos lenguajes fue inventado en los laboratorios Bell?",
          respuestas: [{
            id: 1,
            name: 'C',
            active: true
          }, {
              id: 2,
              name: 'Basic',
              active: false
            }, {
              id: 3,
              name: 'Cobol',
              active: false
            }]
        }, {
          pregunta: 3,
          img: 'img/sun.jpg',
          descripcionPregunta: "Que tipo de rayos broncean la piel?",
          respuestas: [{
            id: 1,
            name: 'Infrarrojo',
            active: false
          }, {
              id: 2,
              name: 'Gamma',
              active: false
            }, {
              id: 3,
              name: 'Ultravioleta',
              active: true
            }]
        }, {
          pregunta: 4,
          img: 'img/stars.jpg',
          descripcionPregunta: "Cual es la escala que mide el brillo de las estrellas?",
          respuestas: [{
            id: 1,
            name: 'Magnitud',
            active: true
          }, {
              id: 2,
              name: 'Alboreda',
              active: false
            }, {
              id: 3,
              name: 'Densidad',
              active: false
            }]
        },
        {
          pregunta: 5,
          img: 'img/electronic.jpg',
          descripcionPregunta: "En electronica, cual es el nombre del componente que consiste de dos platos separados por un dialectrico y puede almacenar una carga?",
          respuestas: [{
            id: 1,
            name: 'Transformador',
            active: false
          }, {
              id: 2,
              name: 'Inductor',
              active: false
            }, {
              id: 3,
              name: 'Capacitor',
              active: true
            }]
        },
        {
          pregunta: 6,
          img: 'img/higrometro.jpg',
          descripcionPregunta: "Que mide un higrometro?",
          respuestas: [{
            id: 1,
            name: 'Terremotos',
            active: false
          }, {
              id: 2,
              name: 'Humedad',
              active: true
            }, {
              id: 3,
              name: 'Presion',
              active: false
            }]
        },
        {
          pregunta: 7,
          img: 'img/flower.jpg',
          descripcionPregunta: "La parte masculina de una flor es...",
          respuestas: [{
            id: 1,
            name: 'Estigma',
            active: false
          }, {
              id: 2,
              name: 'Pistillo',
              active: false
            }, {
              id: 3,
              name: 'Estambre',
              active: false
            }]
        }
      ];
      $scope.colorBoton = "button-energized";
      $scope.color1 = "blue";
      $scope.color2 = "blue";
      $scope.color3 = "blue";
      $scope.Incorrecto = function () {
        console.log("holaboton");
        $scope.color1 = "red";
      }

      $scope.Correcto = function () {
        $scope.colorBoton = "button-balanced";
      }
    }])

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AcercaDeCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
