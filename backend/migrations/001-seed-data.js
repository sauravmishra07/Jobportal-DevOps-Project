import connectDB from '../utils/db.js';
import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';

export const runSeed = async () => {
    try {
        await connectDB();
        console.log('Connected to DB for seeding...');

        // Delete existing data
        await Promise.all([
            User.deleteMany({}),
            Company.deleteMany({}),
            Job.deleteMany({}),
            Application.deleteMany({})
        ]);
        console.log('Cleared existing data.');

        // Read seed data - use relative path since run from backend/
        const usersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'seedData/users.json'), 'utf8'));
        const companiesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'seedData/companies.json'), 'utf8'));
        const jobsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'seedData/jobs.json'), 'utf8'));
        const applicationsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'seedData/applications.json'), 'utf8'));

        // Create users
        const users = await User.insertMany(usersData);
        console.log(`Created ${users.length} users.`);

        // Create companies, link ALL to recruiter user (since only 1 recruiter)
        const recruiter = users.find(u => u.role === 'recruiter');
        companiesData.forEach(company => {
            company.userId = recruiter._id;
        });
        const companies = await Company.insertMany(companiesData);
        console.log(`Created ${companies.length} companies.`);

        // Update recruiter's company ref to first company
        await User.findByIdAndUpdate(recruiter._id, { 'profile.company': companies[0]._id });

        // Create jobs, link refs
        jobsData.forEach(job => {
            job.company = companies[0]._id;
            job.created_by = recruiter._id;
        });
        const jobs = await Job.insertMany(jobsData);
        console.log(`Created ${jobs.length} jobs.`);

        // Create applications, link refs
        const student = users[0]; // first student
        applicationsData[0].job = jobs[0]._id;
        applicationsData[0].applicant = student._id;
        applicationsData[1].job = jobs[1]._id;
        applicationsData[1].applicant = student._id;
        const applications = await Application.insertMany(applicationsData);
        console.log(`Created ${applications.length} applications.`);

        // Update jobs with applications
        await Job.updateMany(
            { _id: { $in: [jobs[0]._id, jobs[1]._id] } },
            { $push: { applications: { $each: applications.map(a => a._id) } } }
        );

        console.log('✅ Seeding completed successfully!');
        return 'Seeding done';
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    }
};

if (import.meta.url === `file://${process.argv[1]}`) {
    runSeed().then(() => process.exit(0)).catch((e) => {
        console.error(e);
        process.exit(1);
    });
}

