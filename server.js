const express = require('express');
const morgan = require('morgan');
const path = require('path');
const  request = require('request');
const app = express();
const socketIo = require("socket.io");
const axios = require("axios");
const cors = require('cors');
const crypto = require('crypto');
const shortid = require('shortid');
const PORT = process.env.PORT || 9000;
//*************test apiai****************//
const apiai = require('apiai');
const appbot = apiai("892dca81d44c433bbb30aa43d2163b6e");
const localStorage = require('localStorage')

//**********KEY && SECRET************************//
/*const API_KEY = '4e6de04c89bf48af86abbd873c2a5a81'
const API_SECRET = '1081c8ab87b742f2b6c64bc046c5da82'*/


const API_KEY = '4e6de04c89bf48af86abbd873c2a5a81'
const API_SECRET = '1081c8ab87b742f2b6c64bc046c5da82'



//****************************************//



//console.log(api_sign);
//*********************************************//
//*********************************************//
//*******************************************//



//***********************//
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'src')));
//********************************//
app.use(cors());
app.use(function(req, res, next) {$
  console.log("hi hi");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//*******Define a CallBack***********//

var myCallback = function(data) {
  return data ;
};



function MakeConvertAPI(exchange_id ,pair,currency,amount,callback)
{


  var message = '/api/v1/utils/converter';
  var hash = crypto.createHmac('sha256', API_SECRET).update(message);
  const api_sign = hash.digest('hex') ;

  var options = {
    url: 'https://test.bmybit.com/api/v1/utils/converter?exchange=1&pair='+pair +
    '&currency='+ currency + '&amount=2.2',
    headers: {
      'X-Api-Key': API_KEY,
      'X-Api-Sign': api_sign
    }
  };


  request(options,function (error, response, body) {
    console.log("err" + error + "response" + typeof(response.body)
  + "body" + body);
  var data = JSON.parse(response.body);
  console.log(data.data.total);
 callback(data.data.total)


} )



//return response ;

}









function GET_EXCHANGES()
{

  //  'https://test.bmybit.com/api/v1/utils/converter?exchange='+ exchange_id +'&pair='+ pair + '&currency='+currency + '&amount='+amount,

 request.get(
'https://test.bmybit.com/api/v1/exchanges',
  headers={
    'X-Api-Key': '4e6de04c89bf48af86abbd873c2a5a81',
    'X-Api-Sign': api_sign
  },function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body: body EXHANGES', body); // Print the HTML for the Google homepage.
});



//return response ;

}


//GET_EXCHANGES();




//**************************  GET PRICES

function GET_PAIRS(callback)
{


    var message = '/api/v1/exchanges/pairs';
    var hash = crypto.createHmac('sha256', API_SECRET).update(message);
    const api_sign = hash.digest('hex') ;

    var options = {
      url: 'https://test.bmybit.com/api/v1/exchanges/pairs?exchange=1',
      headers: {
        'X-Api-Key': API_KEY,
        'X-Api-Sign': api_sign
      }
    };


    request(options,function (error, response, body) {
    /*  console.log("err" + error + "response" + typeof(response.body)
    + "body" + body);*/
    var data = JSON.parse(response.body);
    console.log(data.data);
    nbbuy=0 ;
    nb_sell = 0 ;

    if(data.data.time_series_analysis=='BUY')
    {
       nbbuy++ ;
    }else{
      nb_sell++ ;
    }

//*************************//
if(data.data.montecarlo_simulation=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}

if(data.data.ask_bid_forecast=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}



if(data.data.three_doors_game=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}


if(data.data.bmybit_analysis=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}


console.log("nb buys" + nbbuy + "sells" + nb_sell);

/*
time_series_analysis: 'BUY',
     montecarlo_simulation: 'BUY',
     bayes_analysis: 'BUY',
     ask_bid_forecast: 'SELL',
     three_doors_game: 'BUY',
     bmybit_analysis: 'BUY' }*/


   callback(1)


  } )

}



/*GET_PAIRS(function(data){
console.log(data);
})*/





//***********GET TRADES**************************//



function GET_Forecast(callback)
{


    var message = '/api/v1/forecasts';
    var hash = crypto.createHmac('sha256', API_SECRET).update(message);
    const api_sign = hash.digest('hex') ;

    var options = {
      url: 'https://test.bmybit.com/api/v1/forecasts?exchange=1&pair=BTC-BCC',
      headers: {
        'X-Api-Key': API_KEY,
        'X-Api-Sign': api_sign
      }
    };


    request(options,function (error, response, body) {
    /*  console.log("err" + error + "response" + typeof(response.body)
    + "body" + body);*/
    var data = JSON.parse(response.body);
    console.log(data);

    nbbuy=0 ;
    nb_sell = 0 ;

    if(data.data.time_series_analysis=='BUY')
    {
       nbbuy++ ;
    }else{
      nb_sell++ ;
    }

//*************************//
if(data.data.montecarlo_simulation=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}

if(data.data.ask_bid_forecast=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}



if(data.data.three_doors_game=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}


if(data.data.bmybit_analysis=='BUY')
{
   nbbuy++ ;
}else{
  nb_sell++ ;
}


console.log("nb buys" + nbbuy + "sells" + nb_sell);

if(nbbuy>nb_sell){

}
   callback(1)


  } )

}

GET_Forecast(function (data) {
  console.log("forcase" + data);
})





//****************GET LIST OF PRICES**********************//


/*function GET_PAIRS(pair)
{

  //  'https://test.bmybit.com/api/v1/utils/converter?exchange='+ exchange_id +'&pair='+ pair + '&currency='+currency + '&amount='+amount,

 request.get(
'https://test.bmybit.com/api/v1/exchanges/pairs?exchange=1&pair='+ pair,
  headers={
    'X-Api-Key': '4e6de04c89bf48af86abbd873c2a5a81',
    'X-Api-Sign': api_sign
  },function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});



//return response ;

}*/



//************GET FORCEASTS************//

function GET_Strategies()
{

  //  'https://test.bmybit.com/api/v1/utils/converter?exchange='+ exchange_id +'&pair='+ pair + '&currency='+currency + '&amount='+amount,

 request.get(
'https://test.bmybit.com/api/v1/forecasts?exchange=1&pair='+ pair,
  headers={
    'X-Api-Key': '4e6de04c89bf48af86abbd873c2a5a81',
    'X-Api-Sign': api_sign
  },function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});



//return response ;

}



/*const req = appbot.textRequest('convert for me', {
    sessionId: '<unique session id>'
});

req.on('response', function(response) {


  console.log(response);

  /*console.log(response.parameters.amount);
    console.log(response.parameters.currency);
      console.log(response.parameters.pair);*/




    //console.log(response);
//});

/*req.on('error', function(error) {
    console.log(error);
});

req.end();*/


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.json("ok")
});





function ResponseWithParams(sessionId,msg,params)


{

  var options = {
  sessionId: sessionId,
  parameters: {
  'city':"hi",
  'name': params,
  }
  };

  var request = app.textRequest(msg, options); // user sends “Test for Parameters” as text in chat
  request.on('response', function(response) {
  console.log(response);
  });

  request.on('error', function(error) {
  console.log(error);
  });

  request.end();



}

//*************Real time functionality *******************//

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on("connection", socket => {
  console.log("New client connected")


  socket.on("disconnect", () => console.log("Client disconnected"));



//************************************//

  socket.on('sendMessage', function(data) {
    console.log(data.What);




    const req = appbot.textRequest(data.What, {
        sessionId: '<unique session id>'
    });

    req.on('response', function(response) {
        console.log(response);


//the uset ask to convert his currency




//********WHEN THE REESPONSE IS YOUR TOTAL IS
if(response.result.fulfillment.speech=='Your TOTAL is')
{
  //HERE THE CALCUL

  MakeConvertAPI(1,'BTC-LTC','BTC',1 , function(data){

    console.log('data callback' + data);

    socket.emit('send:message',
    {What:response.result.fulfillment.speech +' ' + data,
    Who : 'BmyBitBot',When : new Date() ,
    id :shortid.generate()
  })

 });


}


//**********************************//






else if(response.result.fulfillment.speech=='Give me the name of the pair')
{

  var data =[];
  const list_pairs  =[ {id :1, pair :'BTC-BCC'},{id:2,
  pair :'BTC-BSD'},{id:3,pair :'BTC-ETH'}]


//**********here we will get params *****/
socket.emit('send:message',
{What:response.result.fulfillment.speech,
Who : 'BmyBitBot',When : new Date() , type :1, list :list_pairs,
id :shortid.generate()
}
)//end socket emit


}
else{

  socket.emit('send:message', {What:response.result.fulfillment.speech,
    type :0, Who : 'BmyBitBot',When :new Date(),id :shortid.generate()})

}

});

//***************************//



    req.on('error', function(error) {
        console.log(error);
    });

    req.end();





   });


   socket.on('disconnect', () => {
      console.log('user disconnected');
    });


});










/*app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});*/


http.listen(9000, function(){
  console.log('listening on *:3000');
});
