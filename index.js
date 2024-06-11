import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendEmail } from "./sendEmail.js";
import Joi from "joi";
import { validate } from "./validate.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/***********  send email *****************/
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
}).required();
app.post("/", validate(schema), async (req, res, next) => {
  const { name, email, to, subject, message } = req.body;

  try {
    await sendEmail(name, email, to, subject, message);
    return res.json("email sent");
  } catch (err) {
    next(err);
  }
});
/***********  end of send email *****************/

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

/***********  error handling *****************/
app.all("*", (req, res, next) => {
  next("you can only use 'post /'");
});

function gloablaErrorHandler(err, req, res, next) {
  return res.status(400).json({ message: "catch error", err });
}
app.use(gloablaErrorHandler);
