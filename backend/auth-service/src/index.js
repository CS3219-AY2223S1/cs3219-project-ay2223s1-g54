import { app } from "./app.js";
import { PORT } from "./configs.js";

app.listen(PORT, async () => {
  console.log(`auth-service listening at port ${PORT}`);
});
