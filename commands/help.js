const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(message, args) {
        if (!args.length) {
            const data = [];
		const { commands } = message.client;

		if (!args.length) {
            const listEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Here\'s a list of all my commands:')
                .setDescription(commands.map(command => command.name).join(', '))
                .setFooter(`prefix: ${prefix}`);
            data.push(listEmbed);

			return message.author.send(data, { split: true })
				.then(() => {
                    if (message.channel.type === 'dm') return;
                    const sentDM = new MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('I\'ve sent you a DM with all my commands!');
					message.channel.send(sentDM)
				})
				.catch(error => {
                    const failDM = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(':x: It seems like I can\'t DM you. Do you have DMs disabled?')
                        .setDescription(error);
					message.channel.send(failDM)
                });
            }
        }
	},
};