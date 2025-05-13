
import { CronJob } from "cron";


export const activateProposalJob = new CronJob("* */15 * * *", async () => {
  const response =  await fetch('http://localhost:2137/api/governor/activateProposals');
  const data = await response.json();

  console.log(data);
},()=>{
  console.log('activateProposalJob is completed');
});

export const queueProposalJob= new CronJob("* */15 * * *", async () => {
  const response =  await fetch('http://localhost:2137/api/governor/queueProposals');
  const data = await response.json();

  console.log(data);
},()=>{
  console.log('queueProposalJob is completed');
});


export const executeProposalJob= new CronJob("* */15 * * *", async () => {
try{
    const response =  await fetch('http://localhost:2137/api/governor/executeProposals');
  const data = await response.json();

  console.log(data);
}catch(e){
  console.log(e);
}
},()=>{
  console.log('executeProposalJob is completed');
});
