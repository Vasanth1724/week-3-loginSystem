import express, { Request, Response } from "express";
import { connectToDb } from "./connections/connection";
import dotenv from "dotenv";
import loginRoute from "./routes/loginRoute";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",loginRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


connectToDb().then(()=>{
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }); 
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

