import app from "./app";
const http = require('http').createServer(app);
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


export default server;