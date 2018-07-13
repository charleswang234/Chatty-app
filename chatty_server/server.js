// server.js

const express = require('express');

const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
   .use(express.static('public'))
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// store the userIDs as a set
// const currentUsers = new Set([]);



// generate a random colour
function getRandomColour() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}


// broadcast to all current online users
wss.broadcast = (data, ws) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size);

  // when first connected sends initial data
  const data = {
    type: "postUsersOnline",
    usersOnline: wss.clients.size
  };
  wss.broadcast(data,ws);

  // sends initial colour for current user
  ws.send(JSON.stringify({type: "postUserColour", colour: getRandomColour()}));



  console.log(`one user enter, currently ${wss.clients.size} users`);

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    switch(data.type) {
      case "postMessage":
        // handle incoming message
        data.id = uuid();
        data.type = "incomingMessage";
        break;
        case "postNotification":
        // handle incoming notification
        data.id = uuid();
        data.type = "incomingNotification";
        break;
        default:
        // show an error in the console if the message type is known
        throw new Error("Unknown data type " + data.type);
      }
      wss.broadcast(data, ws);
    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const data = {
      type: "postUsersOnline",
      usersOnline: wss.clients.size
    };
    console.log(`one user left, currently ${wss.clients.size} users`);
    wss.broadcast(data, ws);
    console.log('Client disconnected')});
});