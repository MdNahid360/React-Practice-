const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// ================================

// ======== MIDDLEWARE ========
app.use(cors());
app.use(express.json());
// ======== MIDDLEWARE ========

// ======== DB CONNECTION ========

// const uri1 = `mongodb+srv://fcwin-4:<password>@fcwin4.emg8ba2.mongodb.net/?retryWrites=true&w=majority`

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fcwin4.emg8ba2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function dbConnection() {
  client.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Connected !!");
    }
  });
}
dbConnection();
// ======== DB CONNECTION ========

// ======== DB COLLECTION ========
const UserCollection = client.db("FcWin4").collection("users");

// ======== DB COLLECTION ========

// ======== JWT TOKEN ========
app.get("/jwt", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const user = await UserCollection.find(query);

  if (user) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7days",
    });
    return res.status(200).send({ accesToken: token });
  } else {
    res.status(401).send({ accesToken: "No token found" });
  }
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    console.log(err);
    if (err) {
      return res.status(403).send({ message: "forbidden access hey this " });
    }
    req.decoded = decoded;
    next();
  });
}

const verifyAdmin = async (req, res, next) => {
  const decoded = req.decoded.email;
  console.log(decoded);

  const users = await UserCollection.findOne({ email: decoded });
  console.log(users);
  if (users?.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
};

// ======== JWT TOKEN ========

// ======== ROUTES ========
app.get("/", (req, res) => {
  res.send("Hey Welcome FCWIN4 !!");
});

// ============= User Routes =============

app.post("/users", async (req, res) => {
  const user = req.body;
  const result = UserCollection.insertOne(user);
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data inserted successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not inserted",
    });
  }
});

app.get("/users", async (req, res) => {
  const query = {};
  const cursor = UserCollection.find(query);
  const result = await cursor.toArray();
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data found successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not found",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await UserCollection.deleteOne(query);
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not deleted",
    });
  }
});

app.get("/users/user/", async (req, res) => {
  const query = { role: "user" };
  const cursor = UserCollection.find(query);
  const result = await cursor.toArray();
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data found successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not found",
    });
  }
});

app.delete("/users/user/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await UserCollection.deleteOne(query);
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not deleted",
    });
  }
});

app.get("/users/subadmin/", async (req, res) => {
  const query = { role: "subadmin" };
  const cursor = UserCollection.find(query);
  const result = await cursor.toArray();
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data found successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not found",
    });
  }
});

app.get("/users/myuser/", async (req, res) => {
  const decoded = req.decoded.email;
  const query = { role: "user", email: decoded };
  const cursor = UserCollection.find(query);
  const result = await cursor.toArray();
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data found successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not found",
    });
  }
});

app.delete("/users/myuser/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await UserCollection.deleteOne(query);
  try {
    res.send({
      sucess: true,
      data: result,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      data: [],
      message: "Data not deleted",
    });
  }
});

app.get("/users/admin/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await UserCollection.findOne(query);
  res.send({ isAdmin: user?.role === "admin" });
});

app.put("/users/admin/:id", async (req, res) => {
  const id = req.params.id;
  const filters = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await UserCollection.updateOne(filters, updateDoc, options);
  res.send(result);
});

app.get("/users/subadmin/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await UserCollection.findOne(query);
  res.send({ isSubAdmin: user?.role === "subadmin" });
});

app.get("/users/user/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await UserCollection.findOne(query);
  res.send({ isUser: user?.role === "user" });
});


// Sharuar vai ===================================

const depositCollection = client.db("FcWin4").collection("deposit");
const withdrawCollection = client.db("FcWin4").collection("withdraw");
const clubsCollection = client.db("FcWin4").collection("clubs");
const transferCollection = client.db("FcWin4").collection("transfer");

app.get("/deposit", async (req, res) => {
  const query = {};
  const deposit = await depositCollection.find(query).toArray();
  res.send(deposit);
});
app.get("/withdraw", async (req, res) => {
  const query = {};
  const withdraw = await withdrawCollection.find(query).toArray();
  res.send(withdraw);
});

app.get("/transfer", async (req, res) => {
  const query = {};
  const balance = await transferCollection.find(query).toArray();
  res.send(balance);
});

app.post("/addclub", async (req, res) => {
  const club = req.body;
  const result = await clubsCollection.insertOne(club);
  res.send(result);
});

app.get("/totalCLubs", async (req, res) => {
  const query = {};
  const deposit = await clubsCollection.find(query).toArray();
  res.send(deposit);
});

app.delete("/deleteClub", async (req, res) => {
  const clubId = req.body._id;
  const query = { _id: ObjectId(clubId) };
  console.log(query);
  const deleteResult = await clubsCollection.deleteOne(query);
  res.send(deleteResult);
});

// ======== ROUTES ========

app.listen(port, () => {
  console.log(`FCWs On ${port}`);
});
