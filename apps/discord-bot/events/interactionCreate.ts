import {ChatInputCommandInteraction, Collection, Events, MessageFlags} from 'discord.js';

module.exports={
    name: Events.InteractionCreate,
    async execute(interaction:
        ChatInputCommandInteraction
    ) {


        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        };
       
        
        const {cooldowns}=interaction.client;
        
        if(!cooldowns.has(interaction.commandName)) {
            cooldowns.set(interaction.commandName, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(interaction.commandName);
        const defaultCooldownDuration = 3;

        const cooldownAmount = interaction.command?.client.cooldowns.get(interaction.commandName) ?? defaultCooldownDuration * 1000;


        if(timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            console.log('Expiration time', expirationTime);

            if(now < expirationTime) {
                console.log('Expiration time', expirationTime);
                const timeLeft = Math.round((expirationTime - now) / 1000);
                return interaction.reply({content:`You have to wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${interaction.commandName}\` command.`, flags:MessageFlags.Ephemeral});
            }
        }

        
        if(!timestamps.has(interaction.user.id)) {
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        }
        




        try {
            await command.execute(interaction);
        } catch (error) {
          if(interaction.replied || interaction.deferred) {
                await interaction.reply({ content: 'There was an error while executing this command!' });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command!' });
            }
            console.error(`Error executing ${interaction.commandName}:`, error);
        }
    }

}