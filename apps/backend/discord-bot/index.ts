const { APIUser } = require('discord-api-types/v10');

// Require the necessary discord.js classes
const dotenv = require('dotenv');
import { Client, Events, GatewayIntentBits } from 'discord.js';
const { token } = require('../config.json');

dotenv.config();

// Create a new client instance
const client= new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessageTyping] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async (readyClient:any) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    console.log(process.env.DISCORD_CLIENT_ID);
    // Log in to Discord with your client's token

});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN || token);