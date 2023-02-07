const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORTA;

const url = process.env.URL;
const client = new MongoClient(url);
const dbName = process.env.DBNAME;

async function main() {
  await client.connect();
  console.log("Conexão com servidor estabelecida com sucesso!");
  const db = client.db(dbName);
  const collectionUser = db.collection("users");

  app.use(cors());
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/user", async function (req, res) {
    const users = await collectionUser.find().toArray();

    res.send(users);
  });

  app.get("/user/:id", async function (req, res) {
    const id = req.params.id;
    const user = await collectionUser.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      res.status(400).send({
        message: "Usuario não encontrado",
      });
    } else {
      res.send(user);
    }
  });

  app.post("/user", async function (req, res) {
    const bodyUser = req.body;
    const users = await collectionUser.find().toArray();

    const validateUser = users.some((user) => user.user === bodyUser.user);

    if (validateUser === true) {
      res.status(400).send({
        message: "Usuario já cadastrado!",
      });
    } else {
      if (!bodyUser || !bodyUser.name) {
        res.status(400).send({
          message:
            "Usuario não cadastrado, favor verificar as informações digitadas!",
        });
      } else {
        if (bodyUser.user) await collectionUser.insertOne(bodyUser);
        res.status(201).send({
          message: "Usuario cadastrado com sucesso!",
        });
      }
    }
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

main();
