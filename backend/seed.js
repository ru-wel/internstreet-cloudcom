// Fills the database with sample data for testing.
// Refuses if any table has data; `npm run seed -- --reset` wipes all tables first.
import bcrypt from 'bcryptjs';
import { sequelize } from './config/db_config.js';
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import Log from './models/Log.js';

const reset = process.argv.includes('--reset');
const quiet = { logging: false };

// Same week as /utils/analytics: Monday to Sunday of last week
const lastMonday = new Date();
lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() - 6);
lastMonday.setHours(9, 0, 0, 0);
const lastWeek = (day, hour = 9) => {
  const date = new Date(lastMonday);
  date.setDate(date.getDate() + day);
  date.setHours(hour);
  return date;
};

try {
  const counts = await Promise.all([User, Job, Application, Log].map(m => m.count(quiet)));
  if (counts.some(c => c > 0)) {
    if (!reset) {
      throw new Error('Tables already have data. Run `npm run seed -- --reset` to wipe them and reseed.');
    }
    await sequelize.query('truncate try_applications, try_jobs, try_users, logs restart identity cascade', quiet);
    console.log('Wiped all tables.');
  }

  await sequelize.transaction(quiet, async (transaction) => {
    const opts = { transaction, logging: false };
    const hash = (password) => bcrypt.hash(password, 10);

    await User.bulkCreate([
      { name: 'Admin', email: 'admin@internstreet.test', password: await hash('Admin123!'), user_role: 'admin', created_at: lastWeek(0) },
      { name: 'Maria Santos', email: 'maria@internstreet.test', password: await hash('Student123!'), location: 'Quezon City', number: '09171234567', bio: 'BS Computer Science student looking for a software internship.', created_at: lastWeek(1) },
      { name: 'Juan Dela Cruz', email: 'juan@internstreet.test', password: await hash('Student123!'), location: 'Cebu City', number: '09281234567', bio: 'IT student interested in cloud and support roles.', created_at: lastWeek(3) },
    ], opts);

    const job = (title, company, location, logo, description, qualifications, questions) => ({
      title, company, location, logo: `/images/companies/${logo}`,
      details: { job_description: description, job_qualifications: qualifications, employer_questions: questions },
    });
    const jobs = await Job.bulkCreate([
      job('Software Engineering Intern', 'Accenture', 'Taguig City', 'accenture.png',
        'Work with a delivery team building web applications for enterprise clients.',
        'Currently taking BS CS/IT. Familiar with JavaScript or Java. Good communication skills.',
        'Why do you want to intern with us? Share a project you are proud of.'),
      job('Customer Experience Intern', 'Concentrix', 'Pasig City', 'concentrix.png',
        'Support the client services team with customer research and quality reviews.',
        'Any 3rd or 4th year college student. Strong written and spoken English.',
        'Describe a time you helped someone solve a problem.'),
      job('IT Support Intern', 'TaskUs', 'Cebu City', 'taskus.png',
        'Help the IT team set up workstations, manage accounts and troubleshoot issues.',
        'BS IT or related. Basic networking and Windows administration knowledge.',
        'Are you available for on-site work in Cebu?'),
      job('Cloud Operations Intern', 'Cloudstaff', 'Angeles City', 'cloudstaff.png',
        'Assist with monitoring and maintaining cloud infrastructure on AWS.',
        'Interest in cloud computing. Linux command line basics is a plus.',
        'What cloud services have you used before?'),
      job('Frontend Developer Intern', 'Hooli', 'Makati City', 'hooli.png',
        'Build and polish React components for internal tools.',
        'Knows HTML, CSS and JavaScript. React experience is a plus.',
        'Link a portfolio or GitHub profile.'),
      job('Data Analyst Intern', 'Shore360', 'Remote', 'shore360.png',
        'Clean and analyze operations data and build simple dashboards.',
        'Comfortable with Excel or Google Sheets. SQL is a plus.',
        'What tools do you use to analyze data?'),
    ], { ...opts, returning: true });

    const apply = (user, j, status, day) => ({
      name: user.name, email: user.email, job_id: j.id, status, applied_at: lastWeek(day, 14),
      c_name: j.company, c_location: j.location, c_position: j.title, c_logo: j.logo,
      // Filenames only; no files exist, so downloading these will fail
      resume: `seed-resume-${user.email.split('@')[0]}.pdf`,
      cover_letter: `seed-cover-${user.email.split('@')[0]}.pdf`,
    });
    const maria = { name: 'Maria Santos', email: 'maria@internstreet.test' };
    const juan = { name: 'Juan Dela Cruz', email: 'juan@internstreet.test' };
    await Application.bulkCreate([
      apply(maria, jobs[0], 'pending', 1),
      apply(maria, jobs[4], 'approved', 2),
      apply(juan, jobs[2], 'pending', 3),
      apply(juan, jobs[3], 'denied', 4),
    ], opts);

    const log = (email, action, day, hour) => ({
      email, action, executed_at: lastWeek(day, hour),
      ip_address: '127.0.0.1', os_version: 'Windows 11', browser_type: 'Chrome 129', location: 'Manila, Metro Manila, PH',
    });
    await Log.bulkCreate([
      log('admin@internstreet.test', 'Has logged in', 0, 8),
      log('maria@internstreet.test', 'Has registered successfully', 1, 10),
      log('maria@internstreet.test', `Has successfully applied to "Accenture" as a "Software Engineering Intern"`, 1, 14),
      log('juan@internstreet.test', 'Has registered successfully', 3, 11),
      log('juan@internstreet.test', `Has successfully applied to "TaskUs" as a "IT Support Intern"`, 3, 14),
      log('admin@internstreet.test', `Successfully changed application status of app_id: "2" to: "approved"`, 5, 9),
    ], opts);
  });

  console.log(`Seeded 3 users, 6 jobs, 4 applications, 6 logs.

Logins:
  admin@internstreet.test / Admin123!   (admin)
  maria@internstreet.test / Student123!
  juan@internstreet.test  / Student123!`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
