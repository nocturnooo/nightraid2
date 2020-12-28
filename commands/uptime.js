const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'uptime',
	description: 'Sends bot uptime.',
	async execute (message) {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60);
            const secStr = sec.toString();
            const min = Math.floor((ms / (1000 * 60)) % 60);
            const minStr = min.toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60) % 60));
            const hrsStr = hrs.toString();
            const days = Math.floor((ms / (1000 * 60 * 24) % 60));
            const daysStr = days.toString();
            return `${daysStr.padStart(1, '0')} days, ${hrsStr.padStart(2, '0')} hours, ${minStr.padStart(2, '0')} minutes, ${secStr.padStart(2, '0')} seconds.`;
        }

        const uptimeEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`:battery: Uptime: ${duration(message.client.uptime)}`);
        message.channel.send(uptimeEmbed)
	},
};