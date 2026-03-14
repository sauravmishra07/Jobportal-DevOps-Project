import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.listen(PORT, async () => {
    await connectDB();

    // Auto-seed if no data (optional - comment out after first run)
    const jobCount = await (await import('./models/job.model.js')).Job.countDocuments();
    if (jobCount === 0) {
        console.log('No data found, running seed...');
        const { runSeed } = await import('./migrations/001-seed-data.js');
        await runSeed();
    } else {
        console.log(`Found ${jobCount} jobs, skipping seed.`);
    }

    console.log(`✅ Server running at port ${PORT}`);
})
