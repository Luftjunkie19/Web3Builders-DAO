
import { CronJob } from "cron";


export const activateProposalsJob = new CronJob("* */15 * * *", async () => {
try{
    const response =  await fetch('http://localhost:2137/api/governor/activateProposals');
  const data = await response.json();

  console.log(data);
}catch(e){
  console.log(e);
}
},()=>{
  console.log('activateProposalJob is completed');
});

export const queueProposalsJob= new CronJob("* */15 * * *", async () => {
  try{
  const response =  await fetch('http://localhost:2137/api/governor/queueProposals');
  const data = await response.json();

  console.log(data);
  }catch(e){
    console.log(e);
  }
},()=>{
  console.log('queueProposalJob is completed');
});


export const executeProposalsJob= new CronJob("* */15 * * *", async () => {
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
