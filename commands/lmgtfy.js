const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'lmgtfy',
	description: 'Let me Google that for you.',
	aliases: ['google'],
	execute (message, args) {
        if (!args.length) {
            const noArgs = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You need to supply arguments.');

            message.channel.send(noArgs);
            return 0;
        }

        if (args.length) {
            joinArgs = args.join(' ');
            searchArgs = args.join('+');
        }

        const colors = [
            '#4285F4',
            '#DB4437',
            '#F4B400',
            '#0F9D58'
        ]
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const lmgtfyEmbed = new MessageEmbed()
            .setColor(randomColor)
            .setTitle(`Let me Google "${joinArgs}" for you.`)
            .setURL(`https://lmgtfy.com/?q=${searchArgs}`);

	    message.channel.send(lmgtfyEmbed);
	},
};