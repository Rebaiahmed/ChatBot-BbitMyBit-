import React, { Component } from 'react';
import logo from './logo.svg';

import {Button, Icon,Navbar,NavItem,Row,Input} from 'react-materialize'
import ReactDOM from 'react-dom';
import io from 'socket.io-client'

class ChatHistory extends Component {



  constructor(props) {
        super(props);
    }




   componentDidMount() {


   }




   /*  { props.history.map((messageObj) => {
     const messageDate = new Date(messageObj.When);
         const messageDateTime = messageDate.toLocaleDateString() +
           ' at ' + messageDate.toLocaleTimeString();
       return (
         <li className="collection-item avatar" key={ messageObj.When }>
           <img src="https://cdn3.iconfinder.com/data/icons/bold-blue-glyphs-free-samples/32/82_Bitcoin_Exchange_Money_Symbol_Currency-128.png" alt="107378" className="circle" />
           <span className="title">Anonymous robot #{ messageObj.Who }</span>
           <p>

             <i className="prefix mdi-action-alarm" />
             <span className="message-date">{messageObj.When}</span>
             <br />
             <span>{ messageObj.What }</span>
           </p>
         </li>
     ); })
   }*/













//****************************//
SelectPair = (id) =>{
  console.log("id pair is " + id);

  /*[ {id :1, pair :'BTC-BCC'},{id:2,
  pair :'BTC-USD'},{id:3,pair :'BTC-ETH'}]*/
/// ici send the PAIR
let pair = ''
switch(id) {
   case 1: {
      pair ='BTC-BCC';
      break;
   }
   case 2: {
      pair ='BTC-BSD';
      break;
   }
   case 3: {
      pair ='BTC-ETH';
      break;
   }

}///end of switch
console.log("the pair will be " + pair);
console.log(JSON.stringify(this.props));


localStorage.setItem('pair', pair);

const messageObj = {
Who: 'Me',
What: 'currency',
When: new Date().valueOf(),
};
this.scrollToBottom();
this.props.sendMessage(messageObj);

//this.props.sendMessage("My Pair is " + pair);

}

//*************************//



scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

componentDidMount() {
     this.scrollToBottom();
}

componentDidUpdate() {
     this.scrollToBottom();
}




  render() {

const { props , SelectPair } = this;



    return (
      <ul className="collection" ref={(el) => { this.messagesContainer = el; }}>



        { props.messages.map((messageObj) => {
          console.log("histor" + messageObj);
        const messageDate = new Date(messageObj.When);
            const messageDateTime = messageDate.toLocaleDateString() +
              ' at ' + messageDate.toLocaleTimeString();


if(messageObj.type==1)
{



  const listBadges = messageObj.list.map((number) =>
  {
 let boundItemClick = this.SelectPair.bind(this, number.id);
      return   <a href="#!" className="collection-item"
        onClick={ boundItemClick }><span className="new badge"></span>{number.pair}</a>
      }
    );



  return(
    <li className="collection-item avatar" key={ messageObj.id }>
      <img src="https://cdn3.iconfinder.com/data/icons/bold-blue-glyphs-free-samples/32/82_Bitcoin_Exchange_Money_Symbol_Currency-128.png" alt="107378" className="circle" />
      <span className="title"> #{ messageObj.Who }</span>
      <p>

        <i className="prefix mdi-action-alarm" />
        <span className="message-date">{messageObj.When}</span>
      </p>
        <br />
        <p>{ messageObj.What }</p>



        <div className="collection">

         { listBadges }
            </div>

    </li>
  )
}else{

  return (
    <li className="collection-item avatar" key={ messageObj.id }>
      <img src="https://cdn3.iconfinder.com/data/icons/bold-blue-glyphs-free-samples/32/82_Bitcoin_Exchange_Money_Symbol_Currency-128.png" alt="107378" className="circle" />
      <span className="title"> #{ messageObj.Who }</span>
      <p>

        <i className="prefix mdi-action-alarm" />
        <span className="message-date">{messageObj.When}</span>
      </p>
        <br />
        <p>{ messageObj.What }</p>

    </li>
);
}


})
      }



  </ul>
    );
  }
}

export default ChatHistory;
