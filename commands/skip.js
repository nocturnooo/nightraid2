const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'skip',
    description: 'Skip a song in your channel!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const noVC = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':musical_note::x: You are not in a voice channel!');
        const noSong = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':musical_note::x: There is no song to skip!');
		if (!message.member.voice.channel) return message.channel.send(noVC);
		if (!serverQueue) return message.channel.send(noSong);
		serverQueue.connection.dispatcher.end();
    }
};