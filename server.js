const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/user", (req, res) => {
   res.send("Server is Listening!!");
 });

app.use(bodyParser.json());
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));