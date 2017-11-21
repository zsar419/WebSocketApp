# Websocket Web App
A web socket which allows client-server communication and broadcast functionality
- Web-socket client link: ws://web-socket-app.herokuapp.com
    - connect to this using web-socket client

## Instructions ##
- npm install
- npm start
- Connect to: ws://localhost:3000/
    - using web-socket client such as Smart Websocket Client (chrome extension)
        - https://chrome.google.com/webstore/detail/smart-websocket-client/omalebghpgejjiaoknljcfmglgbpocdp
- To send messages to all clients type: "broadcast: <your-message>"

## Web Sockets ##
- Web socket lib: https://github.com/websockets/ws
- A communications protocol that provides a full-duplex communication channels over a single TCP connection established between a web browser (client) and a web server (this take place through the “classic HTTP mechanism” of handshaking, implemented using request/response headers)
- This allows the server to send content to the browser without being called by the client, pushing data through the opened connection, defining ws and wss as URI schemes used respectively for unencrypted and encrypted connections
- Since using http under the hood, WS can use authorization headers