import { Request, Response } from "express";
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const winston = require('winston');
const app = express();
const server = http.createServer(app);
const fs = require('node:fs');
const path = require('node:path');
import { Client, GatewayIntentBits, Events, Collection, Message } from 'discord.js';
const { token } = require('./config.json');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
    const commandPath = path.join(folderPath, folder);
const commandFiles = fs.readdirSync(path.join(commandPath)).filter((file:any) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file:any) => file.endsWith('.ts'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args:any) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args:any) => event.execute(...args));
    }
}


client.on(Events.InteractionCreate, async (interaction:any) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
       if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
   
    }
});


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});

client.on('messageCreate',(message:Message)=>{
    console.log(message.content);
});

const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    defaultMeta: { service: 'user-service' },
    transports: [
     new winston.transports.Console(),
    ]
});
server.listen(2137, () => {
 logger.info('Server is running on port 2137');
});