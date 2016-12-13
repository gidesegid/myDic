
var express=require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'hykrdb.cmsfrokrxjf7.us-west-2.rds.amazonaws.com',
  user:'dictuser',
  password:'qa2wsedcvr',
  database:'HYKdictionary'
});
connection.connect(function(error){
  if(!!error){
    console.log('Error');
  }else{
    console.log('connected');
  }
})

module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
     app.get('/contact',function(req,res){
        res.render('contactUs.html');
    });
     app.get('/workPage',function(req,res){
        res.render('workPage.html');
    });
      app.get('/contactUs',function(req,res){
        res.render('contactUs.html');
    });
      app.get('/about',function(req,res){
        res.render('about.html');
    });
       app.get('/login',function(req,res){
        res.render('login.html');
    });
       app.get('/admin',function(req,res){
        res.render('maintainance/admin.html');
    });
        app.get('/allwords',function(req,res){
        res.render('maintainance/allwords.html');
    });
         app.get('/contacts',function(req,res){
        res.render('maintainance/contacts.html');
    });
          app.get('/newwords',function(req,res){
        res.render('maintainance/newwords.html');
    });
           app.get('/test1',function(req,res){
        res.render('maintainance/test1.html');
    });
            app.get('/users',function(req,res){
        res.render('maintainance/users.html');
    });
      
       //autocomplete data
     app.get('/auto/:languages/:inputdata',function(req,res){
        var id=req.params.languages;
        var inputdata=req.params.inputdata
        connection.query("select collectedwords.word from collectedwords where collectedwords.word like '"+inputdata+"%"+"' and collectedwords.language_id='"+id+"' LIMIT 10",function(error,row,fields){
        if(!!error){
            console.log(error);
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.json(row);
        }
      })
     })
     //languages data
    app.get('/languages',function(req,res){
  
    connection.query("select * from languages",function(error,row,fields){
        if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.json(row);
        }
      });

   });
    //retrieve inputvalue from mysqltable 
    app.get('/word/:fromLanguageId/:suggestion',function(req,res){
             var fromLanguageId=req.params.fromLanguageId;
             var inputdata=req.params.suggestion;
            connection.query("select collectedwords.wordValueId from collectedwords where collectedwords.word='"+inputdata+"' and collectedwords.language_id='"+fromLanguageId+"'",function(error,row,fields){
                if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.json(row);
                }
              });
   });
//output of the translation
    app.get('/word2/:toswitchTranslationId/:datas',function(req,res){
                 var toswitchTranslationId=req.params.toswitchTranslationId;
                 var wordvalue=req.params.datas;
                
              connection.query("select collectedwords.word from collectedwords where collectedwords.wordValueId='"+wordvalue+"' and collectedwords.language_id='"+toswitchTranslationId+"'",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    });

     app.get('/word3/:fromSwitchTranslationId/:toswitchTranslationId/:datas',function(req,res){
                 var fromSwitchTranslationId=req.params.fromSwitchTranslationId;
                 var toswitchTranslationId=req.params.toswitchTranslationId
                 var wordFromInput=req.params.datas;
                
              connection.query("select collectedwords.word from collectedwords where collectedwords.wordValueId=(select collectedwords.wordValueId from collectedwords where collectedwords.word='"+wordFromInput+"' and collectedwords.language_id='"+fromSwitchTranslationId+"') and collectedwords.language_id='"+toswitchTranslationId+"'",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    });
    //retrieve all new words to browther from database newword table
    app.get('/getAllNewWords',function(req,res){
               
              connection.query("select english,tigrigna,userId from newwords",function(error,row,fields){
               if(!!error){
                  console.log('error in query from database maybee')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    });
    //add new word to database newword table
    app.post("/addNewWord/:eng/:tig/:id",function(req,res){
               var eng=req.params.eng;
               var tig=req.params.tig;
               var id=req.params.id;
               console.log(eng)
               console.log(tig)
               console.log(id)
              connection.query("insert into newWords(english,tigrigna,userId) values('"+eng+"'"+","+"'"+tig+"'"+","+"'"+id+"')",function(error,row,fields){
               if(!!error){
                  console.log('error in query ፍሮም ዳታባኤዝ')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
             });
    });
    //authentication
    app.get('/login/:userName/:password',function(req,res){
        var userName=req.params.userName;
        var password=req.params.password;

            connection.query("select userName,password,id from users where userName=?",userName,function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    })
    //retrievd data for updates from table test1
     app.get('/updates',function(req,res){
       
            connection.query("SELECT * from test1 where wordTig='"+"' LIMIT 20",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    })
//update test1 tables
    app.put('/updateword/:langid/:value/:word/:userId',function(req,res){
      var id=req.params.langid;
      var value=req.params.value;
      var word=req.params.word;
      var userId=req.params.userId
     //update to test1 
     connection.query("UPDATE test1 SET wordTig='"+word+"'"+",userId="+userId+"  WHERE value='"+value+"'",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });

    })
//update data in the collectedwords
     app.put('/updatewordInColl/:langid/:value/:word',function(req,res){
      var id=req.params.langid;
      var value=req.params.value;
      var word=req.params.word;
      connection.query("UPDATE collectedwords SET word='"+word+"' WHERE wordValueId='"+value+"'"+"AND language_id=7",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
   }) 
     //add contact message to contacts table in database
   app.post('/contactUs/:name/:message',function(req,res){
    var name=req.params.name;
    var message=req.params.message;
    connection.query("insert into contacts(name,message) value('"+name+"','"+message+"')",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
   }) 
// a di ministratorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

//maintainace======================================================================================================
  
  //list of all words from collectedwords table in database
   app.get('/listOfAllWords/:word/:languageId',function(req,res){
              var word=req.params.word;
              var languageId=req.params.languageId
            connection.query("SELECT word,wordValueId,language_id from collectedwords where collectedwords.language_id="+languageId+" AND collectedwords.word='"+word+"'",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
   })
///update retrieved data from collectedwords table in database
    app.put('/listOfAllWords/:word/:value/:languageId',function(req,res){
              var word=req.params.word;
              var value=req.params.value;
              var languageId=req.params.languageId;
              var id=req.params.id
      connection.query("UPDATE collectedwords SET word='"+word+"' WHERE wordValueId='"+value+"'"+"AND language_id="+languageId+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
   })
    //DELETing data from collectedwords table in database
    app.delete('/listOfAllWords/:value/:languageId',function(req,res){
               var value=req.params.value;
               var languageId=req.params.languageId;
      connection.query("DELETE from collectedwords where wordValueId="+value+" AND language_id="+languageId+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })
    //contact messages.....................................................................................
   //retrieving all contacts message
    app.get('/contactmessages',function(req,res){
      connection.query("select * from contacts",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })
    //delete contact message
     app.delete('/contactmessages/:name/:id',function(req,res){
               var name=req.params.name;
               var id=req.params.id;
      connection.query("DELETE from contacts where name='"+name+"' AND id="+id+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })

     //retrieving words from newword table in database--------------------------------------------------------------------------------------------
     app.get('/listOfnewwords',function(req,res){
           connection.query("select * from newwords",function(error,row,fields){
           if(!!error){
              console.log('error in query')
            }else{
               console.log('succesfully connected');
               console.log(row);
               res.send(row);
            }
  
      });
     })
//updating a word from newwords table
      app.put('/listOfnewwords/:english/:tigrigna/:id',function(req,res){
              var english=req.params.english;
              var tigrigna=req.params.tigrigna
              var id=req.params.id
      connection.query("UPDATE newwords SET english='"+english+"',tigrigna='"+tigrigna+"'  WHERE id="+id+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
   })
    //DELETing a word from newwords table
    app.delete('/listOfnewwords/:id',function(req,res){
               var id=req.params.id;
      connection.query("DELETE from newwords where id="+id+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })
    //retrieving data from test1 table--------------------------------------------------------------------------------
      app.get('/listOftest1',function(req,res){
           connection.query("select * from test1",function(error,row,fields){
           if(!!error){
              console.log('error in query')
            }else{
               console.log('succesfully connected');
               console.log(row);
               res.send(row);
            }
  
      });
     })
       //DELETing data from test1 table
    app.delete('/listOftest1/:value',function(req,res){
               var value=req.params.value;
      connection.query("DELETE from test1 where value="+value+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })

    //retrieving users from user table in database ----------------------------------------------------------
      app.get('/listOfusers',function(req,res){
           connection.query("select * from users",function(error,row,fields){
           if(!!error){
              console.log('error in query')
            }else{
               console.log('succesfully connected');
               console.log(row);
               res.send(row);
            }
  
      });
     })
//updating users from users table
      app.put('/listOfusers/:userName/:password/:id',function(req,res){
              var userName=req.params.userName;
              var password=req.params.password
              var id=req.params.id
      connection.query("UPDATE users SET userName='"+userName+"',password='"+password+"'  WHERE id="+id+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
   })
    //DELETing users from users table
    app.delete('/listOfusers/:id',function(req,res){
               var id=req.params.id;
      connection.query("DELETE from users where id="+id+"",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })
    //adding users to users table
    app.post('/adduser/:userName/:password',function(req,res){
      var userName=req.params.userName;
      var password=req.params.password

      connection.query("insert into users(userName,password) values('"+userName+"','"+password+"')",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })

    //admintable
    app.get('/admin/:adminusername/:adminpassword',function(req,res){
           var userName=req.params.adminusername
           var password=req.params.adminpassword;
       connection.query("select fielduser,fieldpassword from admintable where fielduser='"+userName+"' AND  fieldpassword='"+password+"'",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });
    })
}
   
  //$http.put('/listOfAllWords/'+word+'/'+value+'/'+languageId+'/'+id