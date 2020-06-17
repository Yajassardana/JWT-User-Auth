const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
  res.json({ //converts its non json arguments to json too before calling res.send || https://medium.com/@punitkmr/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
       message:'Hello Coder, Welcome to the club'
  });
});


app.post('/api/login',(req,res)=>{
  // in generlal, all auth, getting user from data base and checking password would be here
  const user = {
    id:1,
    username:'yajas',
    email:'yajassardana1@gmail.com' 
  }//mock user
  jwt.sign({user:user},'secretKey',(err,token)=>{ //generating the token, senging the user as a payload, a secret key string of choice and getting the token back as callback
    res.json({
      token:token
    });
  })
});



app.listen(5000,()=>{
  console.log('listening on 5000')
})