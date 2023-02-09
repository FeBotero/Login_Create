const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = process.env.PORTA;

const url = process.env.URL;

const dbName = process.env.DBNAME;

async function main() {
  console.log("Conectando com banco de dados...");
  const client = await MongoClient.connect(url);

  const db = client.db(dbName);

  const userCollection = db.collection("users");

  console.log("Conexão com servidor estabelecida com sucesso!");

  const app = express();

  app.use(cors());
  app.use(express.json());

  //Public Routes
  app.get("/", function (req, res) {
    return res.status(201).json({
      message: "Servidor rodando!",
    });
  });
  //Private Routes
  app.get("/user/:id", checkToken, async function (req, res) {
    const id = req.params.id;
    console.log(req);

    const user = await userCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuario não encontrado!",
      });
    }

    res.status(200).json(user);
  });
  function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Acesso negado!" });
    }
    try {
      const secret = process.env.secret;
      jwt.verify(token, secret);

      next();
    } catch (error) {
      res.status(400).json({ message: "Token inválido!" });
    }
  }

  //Create User
  app.post("/user/register", async function (req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const users = await userCollection.find().toArray();

    if (!name) {
      return res.status(422).json({
        message: "Favor inserir nome!",
      });
    }
    if (!email) {
      return res.status(422).json({
        message: "Favor inserir o email!",
      });
    }

    const checkEmail = users.some((user) => user.email === email);
    if (checkEmail) {
      return res.status(422).json({
        message: "Email já cadastrado!",
      });
    }

    if (!password) {
      return res.status(422).json({
        message: "Favor inserir a senha!",
      });
    }
    if (password != confirmPassword) {
      return res.status(422).json({
        message: "Senhas não coicidem!",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: passwordHash,
    };

    await userCollection.insertOne(newUser);
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  });

  //Login User
  app.post("/user/login", async function (req, res) {
    const { email, password, _id } = req.body;
    if (!email) {
      return res.status(422).json({
        message: "Favor inserir o email!",
      });
    }
    if (!password) {
      return res.status(422).json({
        message: "Favor inserir a senha!",
      });
    }
    const checkUser = await userCollection.findOne({ email: email });

    if (!checkUser) {
      return res.status(422).json({
        message: "Usuário não encontrado!",
      });
    }
    const verifyPass = await bcrypt.compare(password, checkUser.password);

    if (!verifyPass) {
      return res.status(422).json({
        message: "A senha inserida não confere!",
      });
    }

    try {
      const secret = process.env.secret;
      const token = jwt.sign(
        {
          id: checkUser._id,
        },
        secret
      );
      res.status(200).json({
        message: "Autenticação realizada com sucesso!",
        token,
        email,
        id: checkUser._id,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Aconteceu algo no servidor, tente novamente mais tarde.",
      });
    }
  });

  app.get("/user", async function (req, res) {
    const users = await userCollection.find().toArray();

    res.json(users);
  });

  app.listen(port, () => {
    console.log("Servidor rodando na porta ", port);
  });
}

main();
