import express from "express";
import createRemixApp from "./remixHandler";

const app = express();

app.use(await createRemixApp());

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
