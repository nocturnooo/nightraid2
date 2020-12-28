const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'avatar',
	description: 'Display mentioned user\'s profile picture',
	aliases: ['icon', 'pfp'],
	execute (message) {
        const mentionedUser = message.mentions.users.first() || message.author;
	    const avatarEmbed = new MessageEmbed()
            .setImage(mentionedUser.displayAvatarURL())
            .setColor('RANDOM')
            .setDescription('[Avatar URL link](' + mentionedUser.displayAvatarURL() + ')');

	    message.channel.send(avatarEmbed);
	},
};