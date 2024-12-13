import dotenv from "dotenv";
import connect from "./database/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});
connect()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error :: Server :: start", error);
        process.exit(1);
    });
