import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


module.exports = {
data: new SlashCommandBuilder().setName('reload').setDescription('Reloads the bot').
addStringOption(option => option.setName('command')
.setDescription('The command to reload').setRequired(true)),
async execute(interaction:ChatInputCommandInteraction){

    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
        return await interaction.reply({ content: `No command matching \`${commandName}\` was found.`, ephemeral: true });
    }

    delete require.cache[require.resolve(`./${commandName}.ts`)];

    try {
        const newCommand = require(`./${commandName}.ts`);
        interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply({ content: `Command \`${commandName}\` was reloaded.`, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while reloading a command!', ephemeral: true });
    }


},

}