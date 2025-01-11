async function run() {
    try {
      // Import the app from the ES module
      const server = await import("./dist/sandboxrau/server/server.mjs");
      // const app = (await import("./dist/sandboxrau/server/server.mjs"));
      
      const app = server.reqHandler;
      console.log(app);
      const port = process.env["PORT"] || 4000;
  
      // Start up the Node server
      app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
      });
    } catch (error) {
      console.error("Failed to import app:", error);
    }
  }
  
  run();