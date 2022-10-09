import { httpServer } from "./app.js";
import { PORT } from "./configs.js";

httpServer.listen(PORT, async () => {
  console.log(`communication-service listening at port ${PORT}`);
});
