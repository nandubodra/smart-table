const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let orders = [];

app.post("/order", (req, res) => {
  const order = req.body;
  orders.push(order);
  console.log("New Order:", order);
  res.send({ message: "Order received" });
});

app.get("/orders", (req, res) => {
  res.send(orders);
});

app.listen(3000, () => console.log("Server running on port 3000"));