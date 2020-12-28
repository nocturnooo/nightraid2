const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'ping',
	description: 'Pong!',
	async execute (message) {
        const prePingEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(':bar_chart: Calculating ping...');
        var resMessage = await message.channel.send(prePingEmbed);
        var latency = resMessage.createdTimestamp - message.createdTimestamp
        const pingEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`:bar_chart: Bot Latency: ${latency}ms`);
        resMessage.edit(pingEmbed)
	},
};