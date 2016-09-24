angular.module('starter.controllers', ['ionic', 'ngCordova'])
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
    '$scope', '$state', 'login', "$ionicPopup", '$cordovaVibration', '$cordovaNativeAudio',
     '$cordovaFile', function ($scope, $state, login, $ionicPopup, $cordovaVibration, $cordovaNativeAudio, $cordovaFile) {
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
      $scope.fileName = 'data0.json'
      $cordovaNativeAudio.preloadSimple('inc', 'sounds/wrong.mp3');
      $cordovaNativeAudio.preloadSimple('corr', 'sounds/correct.mp3');
      $scope.mostrarPreguntas = true;

      var ctrl = $scope.ctrl = {};
      ctrl.preguntaActual = 0;
      ctrl.respuestasCorrectas = 0;
      ctrl.respuestaSeleccionada = null;
      var baseDatos = new Firebase("https://triviaionic-114c5.firebaseio.com/");

      //$cordovaFile.createFile(cordova.file.dataDirectory, "pyr.txt", true);
      
      ctrl.siguiente = function (respuesta) {
        
        ctrl.respuestaSeleccionada = respuesta;
        if (respuesta.active) {
          ctrl.respuestasCorrectas++;
          $scope.Correcto();
        } else {
          $scope.Incorrecto();  
        }
        if (ctrl.preguntaActual == 6) {
          $scope.showAlert();
        }
        ctrl.preguntaActual++;

        
        var question = ctrl.preguntaActual;
        var selectedAnswer = ctrl.respuestaSeleccionada.name;
        var entrada = {pregunta: question, respuesta: selectedAnswer}
        baseDatos.push(entrada);        
        //$cordovaFile.writeFile(cordova.file.dataDirectory, "pyr.txt", JSON.stringify(entrada), true);
        //console.log(JSON.stringify($cordovaFile.readAsText(cordova.file.dataDirectory, "pyr.txt")));
        $cordovaFile.checkFile(cordova.file.applicationStorageDirectory,
          $scope.fileName).then(function(success){
          console.log("successCF" + JSON.stringify(success));
              $cordovaFile.writeExistingFile(cordova.file.applicationStorageDirectory,
                $scope.fileName,JSON.stringify(entrada)+",").then(function(successWF){
              },function(errorWF){
            })
        },function(error){
          console.log("Error CheckF" + JSON.stringify(error))
          $cordovaFile.createFile(cordova.file.applicationStorageDirectory,
            $scope.fileName,false).then(function(successCF){
              console.log("Successs createF" + JSON.stringify(successCF))
              $cordovaFile.writeExistingFile(cordova.file.applicationStorageDirectory,
                $scope.fileName,JSON.stringify(entrada)+",").then(function(successWF){
                  console.log("Successs WF" + JSON.stringify(successWF))
              },function(errorWF){
                console.log("Error WF" + JSON.stringify(errorWF))
              })
            },function(errorCF){
               console.log("Error CreateF" + JSON.stringify(successCF)) 
            });
          
        })
      }
      $scope.datosGuardados ="";
      $scope.leerArchivo = function(){
        $cordovaFile.readAsText(cordova.file.applicationStorageDirectory,
                $scope.fileName).then(function(success){
                  $scope.datosGuardados = success;
                  },function(error){
                  console.log("errorRAT: " + JSON.stringify(error));
                })
      }
      $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Trivia',
          template: 'Respuestas correctas: ' + ctrl.respuestasCorrectas
        });
        //$state.go('tab.chat-detail');
        $scope.mostrarPreguntas = false;
      }

      $scope.reiniciar = function(){
          $scope.mostrarPreguntas=true; 
          ctrl.preguntaActual=0
      }
      ctrl.preguntas = [{
        pregunta: 1,
        img: 'img/atom.jpg',
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
              active: true
            }]
        }
      ];
      
      $scope.Incorrecto = function () {
        console.log("holaboton");
        $cordovaVibration.vibrate([100, 50, 100]);
        $cordovaNativeAudio.play('inc');

      }

      $scope.Correcto = function () {
        $cordovaNativeAudio.play('corr');
        $cordovaVibration.vibrate(100);
      }
    }])

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    
  })

  .controller('AcercaDeCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
