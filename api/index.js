const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction");
const { mongoose } = require("mongoose");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

//Adding transaction to the database
app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { price, name, description, datetime } = req.body;
  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
  });
  res.json(transaction);
});

//Fetching all transactions from database
app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000"); // Logs a message to indicate the server is running
});
