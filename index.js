const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send("Hello from Atmik Shettys and his excellent coding brains Node API");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update api
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete API
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

mongoose
  .connect(
    "YOUR MONGO DATABASE"
  )
  .then(() => {
    console.log("Connected to database!!");
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  })
  .catch(() => {
    console.log("Connection Failed!!!");
  });
