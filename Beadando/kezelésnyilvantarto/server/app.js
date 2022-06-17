let express = require("express");
(path = require("path")),
	(mongoose = require("mongoose")),
	(cors = require("cors")),
	(bodyParser = require("body-parser"));
/*favicon = require('favicon'), 
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('passport');*/

let dbConfig = require("./database/db");
let userRoute = require("./routes/user.routes");
let procedureRoute = require("./routes/procedure.routes");
let treatmentRoute = require("./routes/treatment.routes");
let patientRoute = require("./routes/patient.routes");
const { treatment } = require("./Models");

let now = new Date();
const port = process.env.PORT || 3003;

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		() => {
			console.log("Database successfully connected");
		},
		(error) => {
			console.log("Database could not connected: " + error);
		}
	);

// Setup with express js
const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
//app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "dist/kezelesnyilvantarto")));
app.use("/", express.static(path.join(__dirname, "dist/kezelesnyilvantarto")));
app.use("/serv", userRoute);
app.use("/serv", procedureRoute);
app.use("/serv", treatmentRoute);
app.use("/serv", patientRoute);

// Start app on port
const server = app.listen(port, () => {
	console.log(
		"Listening on port: " +
			port +
			" Time: " +
			now.getHours() +
			":" +
			now.getMinutes() +
			":" +
			now.getSeconds()
	);
});
