import app from "./app";
const http = require('http').createServer(app);
export const io = require('socket.io')(http);
/**
 * Start Express server.
 */
const server = http.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});


const documents = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => { console.log('user disconnected'); });
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
    });

});
export default server;