import { Router } from "express";
import { signupController, loginController } from "../controller/loginController";

const loginrouter = Router();

loginrouter.post("/signup", signupController);
loginrouter.post("/login", loginController);

export default loginrouter;