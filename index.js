// const http = require("http");
const WebSocket = require('ws');
const app = require("express")();
app.get("/", (req,res) => res.sendFile(__dirname + "/index.html"));
app.get("/style.css", (req,res) => res.sendFile(__dirname + "/style.css"));
app.get("/main.js", (req,res) => res.sendFile(__dirname + "/main.js"));
app.listen(8081, () => console.log("listening on https port 8081"));
// const websocketServer = require("websocket").server;
// const httpServer = http.createServer();
// httpServer.listen(8080, () => console.log("listening on https port 8080"))
const PORT = 8080;

const clients = {};
const games = {};

const wsServer = new WebSocket.Server({
    // "httpServer": httpServer
    port: PORT
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin)
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        //i have received a message from the client

        //user wants to create a new game
        if(result.method === "create") {
            const clientId = result.clientId;
            const gameId = guid();
            games[gameId] = {
                "id": gameId,
                "board": this.matrix,
                "clients": []
            }

            const payLoad = {
                "method": "create",
                "game": games[gameId]
            }

            const con = clients[clientId].connection;
            con.send(JSON.stringify(payLoad));
        }

         //client wants to join game
         if(result.method === "join") {
            const clientId = result.clientId;
            const gameId = result.gameId;
            const game = games[gameId];
            if(game.clients.length >= 2)
            {
                //max players reached
                return;
            }
            //gives the color to the client based on if u are the first to join or second
            const color = {"0": "red", "1": "yellow"}[game.clients.length];
            game.clients.push({
                "clientId": clientId,
                "color": color
            })

            const payLoad = {
                "method": "join",
                "game": game
            }

            //loop through all game clients and tell them that people have joined
            game.clients.forEach(c => {
                clients[c.clientId].connection.send(JSON.stringify(payLoad));
            })
        }

         //client wants to play game
         if(result.method === "play") {
            const clientId = result.clientId;
            const gameId = result.gameId;
            const board = result.board;
            const color = result.color;
            const state = result.state;
            
            games[gameId].board = board;
            games[gameId].turn = color;
            games[gameId].state = state;
            updateGameState();
            
         }
    })

    //generate a new clientId
    const clientId = guid();
    clients[clientId] = {
        "connection": connection
    }

    const payLoad = {
        "method":"connect",
        "clientId": clientId
    }

    //send back the client connect
    connection.send(JSON.stringify(payLoad))
})

function updateGameState() {
    
    for(const g of Object.keys(games)) {
        const game = games[g];
        const payLoad = {
            "method": "update",
            "game": game
        }
  
        games[g].clients.forEach(c => {
            clients[c.clientId].connection.send(JSON.stringify(payLoad));
        })
    }
}



function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();