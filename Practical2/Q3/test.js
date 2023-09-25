const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");

const app = express();

// Initialize client.
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
const RedisStore = require("connect-redis").default
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
  })
);

app.get('/', (req, res) => {
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    res.send(`You've visited this page ${req.session.views} times.`);
  });
// Your other routes and middleware can be added here

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
