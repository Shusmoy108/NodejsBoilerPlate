const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const config = require("./settings/config");
const app = express();




mongoose.Promise = require("bluebird");
mongoose
    .connect(
        config.dbUrl,
		{ useNewUrlParser: true 
		}
    )
    .then(() => {
        // if all is ok we will be here
        console.log("Db initialized");
    })
    .catch(err => {
        // if error we will be here
        console.error("DB starting error");
        //process.exit(1);
    });
// parse request bodies

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allow cross origin requests

app.use(
    cors({
        exposedHeaders: "*"
    })
);
// Serve static files from the React app after npm run build
app.use("/public", express.static(__dirname + "/public"));

app.use(express.static(path.join(__dirname, "public")));

//app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
    res.send("express server running");
});
//declaring routes
const authRouter = require("./routes/api");
app.use("/api", authRouter);


app.use(express.static(process.cwd() + "/public"));
// serving routes

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
});
// run server
app.listen(port);
console.log(`BoilerPlate listening on ${port}`);
