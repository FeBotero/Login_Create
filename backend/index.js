const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = process.env.PORTA;

const url = process.env.URL;
const client = new MongoClient(url);

const dbName = process.env.DBNAME;

async function main() {
  await client.connect();
  console.log("Conexão com servidor estabelecida com sucesso!");
  const db = client.db(dbName);
  const collectionUser = db.collection("users");

  return { collectionUser };
}

main()
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => client.close());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
