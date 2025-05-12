import { Client, GatewayIntentBits, Events, Collection, Message, Interaction, CacheType, BaseInteraction, MessageFlags } from 'discord.js';

// Require the necessary discord.js classes
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { token } = require('./discordConfig.json');

dotenv.config();



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.cooldowns= new Collection();


const folderPath = path.join(__dirname, '/commands');
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

const eventsPath = path.join(__dirname, '/events');
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

client.once(Events.ClientReady, async (readyClient:any) => {
console.log(`Ready! Bot is online and logged in as ${readyClient.user.tag}`);
    // Log in to Discord with your client's token
});

client.on(Events.InteractionCreate, async (interaction:BaseInteraction) => {
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
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
       if(interaction.replied || interaction.deferred) {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
   
    }
});

client.login(token);