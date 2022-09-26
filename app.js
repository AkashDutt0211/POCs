
const express = require('express');
const initMongo = require('./mongo');
const app = express();
const PORT = 3000;

const Redis = require("ioredis");

const Posts = require("./models/posts");

const redis = new Redis();

const cache = (req, res, next) => {
  const { id } = req.params;
  redis.get(id, (error, result) => {
    if (error) throw error;
    console.log('::::::::::Cache', result);
    if (result !== null) {
      return res.json(JSON.parse(result));
    } else {
      return next();
    }
  });
};

app.get("/post/:id", cache, async (req, res) => {
  const { id } = req.params;
  const data = await Posts.findById(id);
  await redis.set(id, JSON.stringify(data), "EX", 15);
  return res.json(data);
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

initMongo()
