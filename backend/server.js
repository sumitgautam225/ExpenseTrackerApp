require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./config/db");
const incomeRoutes = require("./routes/incomeRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 4000;

//middleware to handle cors 
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

//middleware to handle json
app.use(express.json());

//database
connectToDB();

//routes
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
