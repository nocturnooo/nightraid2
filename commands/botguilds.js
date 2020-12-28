const { Message, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
	name: 'botguilds',
    description: 'See what guilds the bot is in!',
	async execute (message) {
        if (message.author.id == '195090852974952448') {
            const guilds = message.client.guilds.cache.map(guild => guild.name).join('\n');

            const guildsEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`The bot is in ${message.client.guilds.cache.size} guilds!`)
                .setDescription(`${guilds}`);
            
            message.channel.send(guildsEmbed);
        } else {
            const notCreator = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription(':x: You aren\'t my creator.');
            
            message.channel.send(notCreator);
        }
	},
};