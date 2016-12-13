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
    $scope.fromSelectedLanguageId=fromSelectedLanguageId
    
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
     document.getElementById("infoToLang").innerHTML="";
  } 
//to languages 
    $scope.toswitchTranslation=function(toswitchTranslationId){
      if($scope.inputdata==null){
        document.getElementById("infoToLang").innerHTML="Please select language from the top and fill word at the input field and then click this button.ካብ ኣብ ላዕሊ ዘለዉ መልጎም ቛንቛ ምረጹ ብድሕሪኡ ኣብ ትሕቲኡ ዘሎ መምልኢ ቦታ ዝደለኹሞ ቃላት ናይቲ ዝመረጽኩሞ ቛንቛ ድሕሪ ምጽሓፍ፣ካብቶም ዝመጽኹም ምርጫታት ውጽኢት ናይቲ ዝጸሓፍኩሞ መረጹ ኣብ መወዳእታ ናብቲ ክትርኮመልኩም ዝደለኹሞ ኣብ ታሕቲ ዘለዉ መልጎም ቛንቛታት ህረሙ።"
      }else if($scope.value==null){
          $http.get('/word3/'+$scope.languages+'/'+toswitchTranslationId+'/'+$scope.inputdata).success(function(response){
           $scope.outPut=response
           });
      }

    else{
         $http.get('/word2/'+toswitchTranslationId+'/'+$scope.value).success(function(response){
          $scope.outPut=response;
       });
       document.getElementById("infoToLang").innerHTML=""
      }
    }
}]);


function toEnglish(){
  document.getElementById("to1").style.color='red';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
  document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';

}
function toArabic(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
  document.getElementById("to9").style.color='red';
  document.getElementById("to10").style.color='black';

}
function toIsrael(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
  document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='red';

}
function toDutch(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='red';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
  document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';

}
function toTigrigna(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='red';
  document.getElementById("to8").style.color='black';
 document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';
}
function toFrench(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='red';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
 document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';
}
function toGerman(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='red';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
   document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';

}
function toItalian(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='red';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
   document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';
}
function toNorway(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='red';
  document.getElementById("to7").style.color='black';
  document.getElementById("to8").style.color='black';
   document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';
}
function toSweeden(){
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  document.getElementById("to4").style.color='black';
  document.getElementById("to5").style.color='black';
  document.getElementById("to6").style.color='black';
  document.getElementById("to7").style.color='black';
   document.getElementById("to8").style.color='red';
    document.getElementById("to9").style.color='black';
  document.getElementById("to10").style.color='black';
}

function english(){
  document.getElementById("1").style.color='red';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function arabic(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='red';
  document.getElementById("10").style.color='black';
}
function israel(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='black';
  document.getElementById("10").style.color='red';
}
function dutch(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='red';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
   document.getElementById("8").style.color='black';
    document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';

}
function tigrigna(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='red';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function french(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='red';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function germen(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='red';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
  document.getElementById("8").style.color='black';
   document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function italian(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='red';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
   document.getElementById("8").style.color='black';
    document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function norway(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='red';
  document.getElementById("7").style.color='black';
   document.getElementById("8").style.color='black';
    document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}
function sweeden(){
  document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  document.getElementById("4").style.color='black';
  document.getElementById("5").style.color='black';
  document.getElementById("6").style.color='black';
  document.getElementById("7").style.color='black';
   document.getElementById("8").style.color='red';
    document.getElementById("9").style.color='black';
   document.getElementById("10").style.color='black';
}