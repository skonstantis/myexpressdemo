import cookieParser from "cookie-parser";
import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
  secret: "sotiris konstantis",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60, 
  }
}));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});