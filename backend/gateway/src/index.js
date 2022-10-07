import { httpServer } from "./app.js";
import { PORT } from "./configs.js";

httpServer.listen(PORT, async () => {
  console.log(`gateway listening at port ${PORT}`);
});
