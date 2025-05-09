import {ChatInputCommandInteraction, Events, MessageFlags} from 'discord.js';

module.exports={
    name: Events.InteractionCreate,
    async execute(interaction:
        ChatInputCommandInteraction
    ) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        

        try {
            await command.execute(interaction);
        } catch (error) {
          if(interaction.replied || interaction.deferred) {
                await interaction.reply({ content: 'There was an error while executing this command!', flags:MessageFlags.Ephemeral, ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command!',flags:MessageFlags.Ephemeral, ephemeral: true });
            }
            console.error(`Error executing ${interaction.commandName}:`, error);
        }
    }

}