import { httpServer } from "./app.js";
import { PORT } from "./configs.js";

httpServer.listen(PORT, async () => {
  console.log(`collaboration-service listening at port ${PORT}`);
});
