var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let firstName, lastName;
absolutePath = __dirname + '/views/index.html'



function re(req, res, next) {
  res.sendFile(absolutePath);
}

app.use(bodyParser.urlencoded({extended: false}))

app.use(function (req, res, next) {
  var str=req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(str);
  next();
});

app.get('/now', function(req,res,next){
  req.time=new Date().toString();
  next();
},function(req,res,next){
  res.json({'time':req.time});
  next();
})

app.route('/name').get(function(req,res){
  if(Object.keys(req.query).length==0){
    if(!firstName==''&&!lastName==''){
    res.json({'name': firstName+' '+lastName});
    }
    else{
      res.json({'name': 'no name registered'});
    }
  }
  else{
    firstName= req.query.first;
    lastName= req.query.last;
    res.json({'name': firstName+' '+lastName});
  }
}).post(function(req,res){
  firstName=req.body.first;
  lastName=req.body.last;
  res.json({'name': firstName+' '+lastName});
});

app.get('/:word/echo',function(req,res,next){
  res.json({'echo':req.params.word})
})

app.get('/', re);

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {

  if (process.env.MESSAGE_STYLE != 'uppercase') {
    res.json({ "message": "Hello json" })
  }
  else {
    res.json({ "message": "HELLO JSON" })
  }

});


























module.exports = app;
