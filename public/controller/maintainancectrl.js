var myApp=angular.module('myApp2',[]);
myApp.controller('mycontrolleradmin',function($scope,$http,$window){
	var word=$scope.word
	var value=$scope.value
	var languageId=$scope.languageId
	var id=$scope.id
	//update and delete from collectedwords table
	$scope.allwordssearch=function(){
		$http.get('/listOfAllWords/'+$scope.allwordsword+'/'+$scope.allwordslanguageId).success(function(response){
			$scope.getAllwords=response;
		})
	}
	$scope.allwordsclicked=function(words){
        $scope.allwordsword=words.word
        $scope.allwordsvalue=words.wordValueId;
        $scope.allwordslanguageId=words.language_id
        $scope.allwordsid=words.id
	}
	$scope.allwordsupdate=function(){
		$http.put('/listOfAllWords/'+$scope.allwordsword+'/'+$scope.allwordsvalue+'/'+$scope.allwordslanguageId).success(function(response){
                 alert("success upddated")
		})
	}
	$scope.allwordsdelete=function(){
		$http.delete('/listOfAllWords/'+$scope.allwordsvalue+'/'+$scope.allwordslanguageId).success(function(response){
			alert("deleted success")
		})
	}

//update and delete from contact table.........................................................................
	$scope.contactsearch=function(){
		$http.get('/contactmessages').success(function(response){
			$scope.messages=response;
		})
	}
	$scope.contactclicked=function(words){
        $scope.name=words.name
        $scope.message=words.message;
        $scope.id=words.id
        
	}
	$scope.contactdelete=function(){
		$http.delete('/contactmessages/'+$scope.name+'/'+$scope.id).success(function(response){
			alert("deleted success")
		})
	}
	//new words..............................................................................................

	$scope.newwordssearch=function(){
		$http.get('/listOfnewwords/').success(function(response){
			$scope.getnewwords=response;
		})
	}
	$scope.newwordsclicked=function(words){
        $scope.newwordsenglish=words.english
        $scope.newwordstigrigna=words.tigrigna;
        $scope.newwordsuserId=words.userId
        $scope.newwordsid=words.id
	}
	$scope.newwordsupdate=function(){
		$http.put('/listOfnewwords/'+$scope.newwordsenglish+'/'+$scope.newwordstigrigna+'/'+$scope.newwordsid).success(function(response){
                 alert("success upddated")
		})
	}
	$scope.newwordsdelete=function(){
		$http.delete('/listOfnewwords/'+$scope.newwordsid).success(function(response){
			alert("deleted success")
		})
	}

	//update and delete test1 words--------------------------------------------------------------------------

	$scope.test1search=function(){
		$http.get('/listOftest1/').success(function(response){
			$scope.allT1words=response;
		})
	}
	$scope.test1clicked=function(words){
        $scope.test1word=words.word
        $scope.test1wordTig=words.wordTig;
        $scope.test1value=words.value
        $scope.test1userId=words.userId
	}
	
	$scope.test1delete=function(){
		$http.delete('/listOftest1/'+$scope.test1value).success(function(response){
			alert("deleted success")
		})
	}
	// update users............................................................................................
	$scope.usersearch=function(){
		$http.get('/listOfusers/').success(function(response){
			$scope.users=response;
		})
	}
	$scope.clicked=function(words){
        $scope.userName=words.userName
        $scope.password=words.password;
        $scope.id=words.id
	}
	$scope.update=function(){
		$http.put('/listOfusers/'+$scope.userName+'/'+$scope.password+'/'+$scope.id).success(function(response){
                 alert("success upddated")
		})
	}
	$scope.delete=function(){
		$http.delete('/listOfusers/'+$scope.id).success(function(response){
			alert("deleted success")
		})
	}
	$scope.add=function(){
		$http.post('/adduser/'+$scope.userName+'/'+$scope.password).success(function(response){
			alert("add")
		})
	}
	//admin pages controlls.....................................................................................
	$scope.hiden=true;
	$scope.adminlogin=function(){
              var username=$scope.adminusername;
              var password=$scope.adminpassword;
              if(username==null || password==null){
                document.getElementById("userinfo").innerHTML="pls fill user name and password"
              }else{
               $http.get('/admin/'+$scope.adminusername+'/'+$scope.adminpassword).success(function(response){
              $scope.data=response;
              var id=$scope.id;
              var usernamefromdatabase=$scope.data[0].fielduser
              var passwordfromdatabase=$scope.data[0].fieldpassword
              var id=$scope.data[0].id
               $scope.id=$scope.data[0].id
              $scope.userName=$scope.userName;
              if(username==null || password==null){
                document.getElementById("userinfo").innerHTML=" Please enter user name and password"
                $scope.hiden=true;
                $scope.showed=false;
              }
              else if(username===usernamefromdatabase && password===passwordfromdatabase){
                      $scope.showed=true;
              }else{
                document.getElementById("userinfo").innerHTML="user name and password are mismatch"
                $scope.hiden=true;
                $scope.showed=false;
              }
            })
          }
    }
})