const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening in port: ${PORT}...`);
  });
}

startServer();
