

const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8080 });


let score = {
  player1: 0,
  player2: 0
};

// Broadcast the score to all clients
const broadcastScore = () => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(score));
    }
  });
};


wss.on('connection', ws => {
  // Send the current score to the newly connected client
  ws.send(JSON.stringify(score));

  // Handle messages from clients
  ws.on('message', message => {
    try {
      const playersData = JSON.parse(message);
      playersData.forEach(({ player, runs }) => {
        score[player] = runs;
      });
      broadcastScore();
    } catch (error) {
      console.error('Invalid message:', message);
    }
  });
});
