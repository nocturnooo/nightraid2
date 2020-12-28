const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    description: 'See the song queue!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const nowPlaying = serverQueue.songs[0].title;
        if (!serverQueue.songs[1]) {
            var nextInQueue = 'End of queue.';
        } else {
            var nextInQueue = serverQueue.songs[1].title;
        }
        const queueEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(':musical_note: Queue')
            .addField('Currently playing:', nowPlaying)
            .addField('Next in queue:', nextInQueue);
        message.channel.send(queueEmbed)
    }
};