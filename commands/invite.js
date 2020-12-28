const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'invite',
	description: 'Sends the bot invitation link.',
	execute (message) {
        const inviteEmbed = new MessageEmbed()
            .setColor('#007FF7')
            .setThumbnail(message.client.user.displayAvatarURL())
            .setDescription('[Invite Nightraid II](https://discord.com/api/oauth2/authorize?client_id=727621771729305604&permissions=435547254&scope=bot)');

        message.channel.send(inviteEmbed)
	},
};