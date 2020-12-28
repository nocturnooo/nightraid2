const { Message, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
	name: 'gonnacry',
    description: 'Look at little Goblin Jr.! Gonna cry?',
    aliases: ['boohoo'],
	async execute (message) {
        const mentionedUser = message.mentions.users.first() || message.author;
        const mentionedUserName = mentionedUser.username;
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');

        const gonnacry = await Canvas.loadImage('./assets/gonnacry.png')
        const avatar = await Canvas.loadImage(mentionedUser.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 0, 200, 200);
        ctx.globalAlpha = 0.7;
        ctx.drawImage(gonnacry, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), `gonna_cry_${mentionedUserName}.png`);

        const gonnacryEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Look at little ${mentionedUserName} Jr.! Gonna cry?`)
            .attachFiles([attachment])
            .setImage(`attachment://gonna_cry_${mentionedUserName}.png`);

        message.channel.send(gonnacryEmbed)
	},
};