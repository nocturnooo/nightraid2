const { Message, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
	name: 'communist',
    description: 'Добро пожаловать в Союз!',
    aliases: ['ussr'],
	async execute (message) {
        const mentionedUser = message.mentions.users.first() || message.author;
        const mentionedUserName = mentionedUser.username;
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');

        const communist = await Canvas.loadImage('./assets/communist.png')
        const avatar = await Canvas.loadImage(mentionedUser.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 0, 200, 200);
        ctx.globalAlpha = 0.7;
        ctx.drawImage(communist, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), `communist_${mentionedUserName}.png`);

        const communistEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`Добро пожаловать в Союз, ${mentionedUserName}!`)
            .attachFiles([attachment])
            .setImage(`attachment://communist_${mentionedUserName}.png`);

        message.channel.send(communistEmbed)
	},
};