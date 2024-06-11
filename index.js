import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendEmail } from "./sendEmail.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/***********  send email *****************/
app.post("/", async (req, res, next) => {
  const { name, email, to, subject, message } = req.body;

  try {
    await sendEmail(name, email, to, subject, `<p>${message}</p>`);
    return res.json("email sent");
  } catch (err) {
    next(err);
  }
});
app.use("*", async (req, res, next) => {
  next("");
});
/***********  end of send email *****************/

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

/***********  error handling *****************/
function gloablaErrorHandler(err, req, res, next) {
  return res.status(500).json({ message: "catch error", err });
}
app.use(gloablaErrorHandler);
