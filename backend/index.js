const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
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
    const user = await collectionUser.find().toArray();

    res.send(user);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

main()
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => client.close());
