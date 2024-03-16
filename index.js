const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { Group } = require("./models/group")
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const mongoose = require('mongoose');
// const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/litter';
app.use('/public', express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected !");
})

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/location", (req, res) => {
  res.render("Getlocation")
})


app.post("/location", async (req, res) => {
  const location = req.body.location
  const groups = await Group.find({ pinCode: `${location}` })
  res.render("Groups", { groups });

})
app.get("/location/:groupid", async (req, res) => {
  const gId = req.params.groupid
  const group = await Group.findById(gId);
  const images = [{ url: "https://as1.ftcdn.net/v2/jpg/03/58/54/86/1000_F_358548675_OWiuGttT2nV4HcJknRO4WWfKLDa8e29s.jpg" }]
  // const { images } = group;
  console.log(images);
  res.render("Group", { images })

})
// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});