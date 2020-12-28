const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stop',
    description: 'Stop a song in your channel!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const noVC = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':musical_note::x: You are not in a voice channel!');
		if (!message.member.voice.channel) return message.channel.send(noVC);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
    }
};