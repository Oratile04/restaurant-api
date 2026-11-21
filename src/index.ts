
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (_, res) => {
    res.status(200).json({
        message: "API is healthy.."
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
