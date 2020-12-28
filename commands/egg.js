const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'egg',
    description: 'Easter eggs!!',
    aliases: ['easteregg'],
	async execute (message, args) {
        const noArgs = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':egg: You need to supply arguments.')
            .setFooter('list of 🥚s: papa, blocks');

        if (!args.length) {
            return message.channel.send(noArgs);
        }

        if (args[0] === 'papa') {
            const papaEmbed = new MessageEmbed()
                .setColor('#585858')
                .setFooter('Papa is the \'non paid actor\' from the Nighraid (I) website!')
                .setImage('https://media.discordapp.net/attachments/715084080429006941/724209918063935548/image0-3.gif');
            message.channel.send(papaEmbed);
        }
        
        if (args[0] === 'blocks') {
            const blocksEmbed = new MessageEmbed()
                .setColor('#585858')
                .setFooter('Blocks is the ***shitpost dealer***.')
                .setImage('https://cdn.discordapp.com/attachments/666680051642794015/728624967696121946/default.jpg')
            message.channel.send(blocksEmbed)
        }
	},
};