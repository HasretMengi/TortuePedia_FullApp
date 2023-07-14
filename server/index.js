import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import apiV1Router from "./routers/apiV1Router.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//Deploiement 
app.use(express.static(`./dist`))

mongoose
  .connect(process.env.DB_Atlass_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error) => {
    console.log("Erreur de connexion à la base de données : " + error);
  });

app.use("/api/v1", apiV1Router);

app.listen(port, () =>
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`)
);
