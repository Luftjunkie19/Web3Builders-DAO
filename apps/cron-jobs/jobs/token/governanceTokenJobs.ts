import { CronJob } from "cron";

export const monthlyContributionJob = new CronJob("* * * * */1", async () => {
    const response =  await fetch('http://localhost:2138/api/token/monthlyContribution');
    const data = await response.json();

    console.log(data);
},()=>{
    console.log('monthlyContributionJob is completed');
});