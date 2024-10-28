import express, { Express, Request, Response } from "express";
import checkTicket from "./middleware/ticket";
import bodyParser from 'body-parser'
import authRouter from './routes/auth.router.js'


const app: Express = express();
const port = 3000;
app.use(bodyParser.json());
app.use("/api/example", checkTicket, (req: Request, res: Response) => {
    res.status(200).json({ message: "Ticket isValid!!!!!" });
})

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Server");
});
app.use('/api/auth', authRouter)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

