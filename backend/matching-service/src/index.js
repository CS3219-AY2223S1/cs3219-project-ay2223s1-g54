import { httpServer } from "./app.js";
import { PORT } from "./configs.js";
import { dbInit } from "./db/setup.js";

httpServer.listen(PORT, async () => {
  await dbInit();
  console.log(`matching-service listening at port ${PORT}`);
});
