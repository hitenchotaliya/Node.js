const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");
const hbs = require("hbs")
const path = require("path")

const app = express();

// Initialize client.

const redisClient = createClient();
redisClient.connect().then(()=>{
   console.log("redis client is connected"); 
}).catch((error)=>{
    console.log("not connected ",error)
});

// Initialize store.
const RedisStore = require("connect-redis").default
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "Expressredis:",
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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"/src/views"))
app.set("view engine",hbs)



const routes = require("./src/Routes/routes")
app.use("/",routes)

  
 
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
