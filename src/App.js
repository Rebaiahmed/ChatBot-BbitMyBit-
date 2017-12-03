import React, { Component } from 'react';
import logo from './logo.svg';
import {Button, Icon,Navbar,NavItem,Row,Input} from 'react-materialize'
import './App.css';

//import io from 'socket.io-client'

import ChatInput from './ChatInput' ;
import ChatHistory from './ChatHistory';
import PubNub from 'pubnub';
import axios from 'axios' ;
import { Picker,Emoji  } from 'emoji-mart'

//import openSocket from 'socket.io-client';
//const socket = openSocket('http://localhost:9000');
//import io from 'socket.io-client/socket.io'
//const io = require('socket.io-client');


import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:9000');




class App extends Component {



  constructor() {
     super();
     this.state = {
       response: false,
       endpoint: "http://127.0.0.1:9000",
       messages :[] ,
     };
this.socket = openSocket('http://localhost:9000');

 this.socket.on('send:message',function(data){
   console.log(data);
 });

   }









   componentDidMount() {

this.socket = openSocket('http://localhost:9000');


 this.socket.on('send:message', this._messageRecieve);

 /*socket.on(`server:event`, data => {
       this.setState({ data })
     })*/

     /*var socket = io();
     console.log(socket);*/

    //const socket = io('http://localhost:9000');


     /*const socket = io('http://localhost:9000/', {
           transports: ['websocket'],
           rejectUnauthorized: false
         })

         socket.on('connect', () => {
           console.log("socket connected")
           socket.emit('YOUR EVENT TO SERVER', {})
           socket.on('EVENT YOU WANNA LISTEN', (r) => {
           })
         })

         socket.on('connect_error', (err) => {
           console.log(err)
         })

         socket.on('disconnect', () => {
           console.log("Disconnected Socket!")
         })*/








    /* this.PubNub = PubNub.init({
       publish_key: 'Enter-your-pub-key',
       subscribe_key: 'Enter-your-sub-key',
       //ssl: (location.protocol.toLowerCase() === 'https:'),
     });*/

     /*this.pubnub = new PubNub({
           publishKey : 'pub-c-56d20d61-892c-45b5-b514-55482e91804a',
           subscribeKey : 'sub-c-1effeca2-d1b0-11e7-b83f-86d028961179'
       })


       console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
              var publishConfig = {
                  channel : "hello_world",
                  message : "Hello from PubNub Docs!"
              }
              this.pubnub.publish(publishConfig, function(status, response) {
                  console.log(status, response);
              })*/


         //this.socket = io.connect('http://localhost:9000/');

   }


//**************Define the function sendMessage************//

sendMessage = (message) => {
  // for now this will let us know things work.  `console` will give us a
  // warning though
  console.log('sendMessage', message);


  var {messages} = this.state;
       messages.push(message);
       this.setState({messages :messages});

  this.socket.emit('sendMessage', message);





}



//****************************//





//************************//


_messageRecieve = (msg)=> {






console.log("we reeceibe  message " + JSON.stringify(msg) + "type" + msg.type);
  var {messages} = this.state;
       messages.push(msg);
       this.setState({messages :messages});

}






  render() {
    const { sendMessage, state } = this;
    return (
      <div class="demo-layout-transparent mdl-layout mdl-js-layout">




        <header class="mdl-layout__header mdl-layout__header--transparent">
          <div class="mdl-layout__header-row">

            <span class="mdl-layout-title">Title</span>

            <div class="mdl-layout-spacer"></div>

            <nav class="mdl-navigation">
              <a class="mdl-navigation__link" href="">Link</a>
              <a class="mdl-navigation__link" href="">Link</a>
              <a class="mdl-navigation__link" href="">Link</a>
              <a class="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
        </header>


        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Title</span>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>




<main class="mdl-layout__content">

   <ChatHistory messages={ state.messages } _messageRecieve={this._messageRecieve} sendMessage={ sendMessage } />
      <ChatInput sendMessage={ sendMessage } />

      <Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />




<Picker title='Pick your emoji…' emoji='point_up' />


     </main>
     </div>


    );
  }
}

export default App;
