import { app } from "./app.js";
import { PORT } from "./configs.js";
import { dbInit } from "./db/setup.js";

app.listen(PORT, async () => {
  await dbInit();
  console.log(`history-service listening at port ${PORT}`);
});
