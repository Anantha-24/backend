const app = require("./app");
const http = require("http");
const cloudinary = require("cloudinary")
const connectDatabase = require("./apps/config/database");            
//const ErrorHandler = require("./apps/utils/errorhandler");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(` Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if(process.env.NODE_ENV !=="PRODUCTION"){
  require("dotenv").config({ path: "apps/config/config.env" });
}

// Create server using http module
const server = http.createServer(app);

// Connecting to the database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Moved the unhandledRejection listener outside of the server.listen callback
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.error(err.stack); // Log the full error stack trace
  
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  // Close the server only if it's defined
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
