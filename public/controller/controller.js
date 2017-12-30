var app = angular.module('app', ['autocomplete']);

//service
app.factory('dataRetriever', function($http,$q, $timeout){

  var dataRetriever = new Object();

 dataRetriever.getdatas = function(languages,inputdata) {
    var data = $q.defer();
    var datas=null;
    var dataFromRemote;
  $http.get('/auto/'+languages+'/'+inputdata).then(function(response){
       dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.word }));
       var datas=JSON.parse(dataFromRemote);

    $timeout(function(){
      data.resolve(datas);
    },1000);
  })
    return data.promise
}
  return dataRetriever;
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
//controller
app.controller('MyCtrl',['$scope','$http','dataRetriever', function($scope,$http, dataRetriever){
          $scope.myData=[];
          $scope.fromSwitchTranslation=null;
          $scope.toswitchTranslation=null;
  //retrieve languages
      $http.get('/languages').success(function(response){
       $scope.myData=response;
      });
//filling data from data base to autocomplete textfield
  $scope.fillData = function(typedthings,fromSelectedLanguageId,inputdata){
    $scope.fromSelectedLanguageId=fromSelectedLanguageId;

   if($scope.languages===null){
       document.getElementById("remainderLangSelector").innerHTML="Select language from the above.ኣብ ላዕሊ ካብዘለዉ ቛንቛታት ምረጹ"
       document.getElementById("infoToLang").innerHTML="";
     }else if($scope.inputdata===""){
        document.getElementById("infoToLang").innerHTML="";
     }
     else{
      var dataPromise = dataRetriever.getdatas($scope.languages,$scope.inputdata);
        $scope.datas=null;
        dataPromise.then(function(data){
        $scope.datas = data;

       });
     }
   }
//data selection from autocomplete
  $scope.dataSelection = function(suggestion){
    $scope.datas=null;
     $http.get('/word/'+$scope.languages+'/'+suggestion).then(function(response){
       valueFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.wordValueId }));
       $scope.datas=JSON.parse(valueFromRemote);
      $scope.value=response.data[0].wordValueId;
  })
}
$scope.onEnter=function(suggestion){
     $scope.dataSelection = function(suggestion){
    $scope.datas=null;
     $http.get('/word/'+$scope.languages+'/'+suggestion).then(function(response){
       valueFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.wordValueId }));
       $scope.datas=JSON.parse(valueFromRemote);
      $scope.value=response.data[0].wordValueId;
  })
}
}
  //from languages
  $scope.fromSwitchTranslation=function(fromSelectedLanguageId){
    $scope.languages=fromSelectedLanguageId;
  }
//to languages
    $scope.toswitchTranslation=function(toswitchTranslationId){
      $scope.languagesTo=toswitchTranslationId;
      if($scope.inputdata==null){
        document.getElementById("infoToLang").innerHTML="Select language. ቋንቋ ምረጹ።";
      }else if($scope.value==null){
          $scope.outPut=''
          $http.get('/word3/'+$scope.languages+'/'+toswitchTranslationId+'/'+$scope.inputdata).success(function(response){
           $scope.outPut=response;
           });
      }

    else{
         $scope.outPut='';
         $http.get('/word2/'+toswitchTranslationId+'/'+$scope.value).success(function(response){
          $scope.outPut=response;
       });
       //document.getElementById("infoToLang").innerHTML="";
      }
    }
}]);


function changeStyle(id) {
  //var buttons = document.querySelectorAll('div[role=button]');
  var buttons = document.getElementsByClassName("butns");
  for(var i = 0; i < buttons.length; i++) {
     if (buttons[i].id == id) {
       document.getElementById(id).style.color='red';
     } else {
      buttons[i].style.color='black';
     }
  }
}
