import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User} from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";


// cron job to send newsletter to all the users
//Node-cron is a popular Node. js library that simplifies scheduling background tasks in your applications.
//  It excels at automating 
// repetitive jobs such as sending emails, processing images, backing up databases, and more.
// cron.schedule('* * * * *', () => { ==> 1* is for minute, 2* is for hour, 3* is for day, 4* is for month,
//  5* is for weekdays



export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Buddy, Running Cron Automation");

        const jobs = await Job.find({newsLettersSent: false});
        for(const job of jobs){
            try{
                const filteredUsers = await User.find({

                    // filtering the user (job seekers) on the basis of Niches
                    $or: [
                      { "niches.firstNiche": job.jobNiche },
                      { "niches.secondNiche": job.jobNiche },
                      { "niches.thirdNiche": job.jobNiche },
                    ],
                  });


                for (const user of filteredUsers) {
                    
                    const subject = `Exciting Opportunity: ${job.title} Role in ${job.jobNiche} Awaits You!`;
                    const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has
                                         just been posted. The position is for a ${job.title} with 
                                         ${job.companyName}, and they are looking to hire immediately.
                                         \n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\n
                                         Don’t wait too long! Job openings like these are filled quickly.
                                          \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nTalent Acquisition Team | CohortLab`;

                    sendEmail({
                      email: user.email,
                      subject,
                      message,
                    });
                }
                  
                
                job.newsLettersSent = true;
                  
                await job.save();
            }
             catch (error) {
                console.log("Buddy, ERROR IN NODE CRON CATCH BLOCK");
                return next(console.error(error || "Buddy, Some error in Cron."));
            }
        }
    });
};