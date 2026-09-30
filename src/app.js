import express from "express";
import serviceRouter from "./routes/services.router.js";
import bookingRouter from "./routes/bookings.router.js";

const app = express();

app.use(express.json());
app.use("/api/services", serviceRouter);
app.use("/api/bookings", bookingRouter);



export default app;

