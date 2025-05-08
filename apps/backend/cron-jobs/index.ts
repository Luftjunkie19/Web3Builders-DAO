import { CronJob } from 'cron';

let item:number=0;

export const task = new CronJob('* * * * * *', () => {
    item++;
    console.log('running a task every second');
if(item === 5){
    task.stop();
}
},()=>{
    console.log(task.name);
    console.log('task completed');
}, true, 'America/Los_Angeles', null, true, null, true, true,(err)=>{},'Discord Bot');
