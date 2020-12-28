const { Message, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
	name: 'message',
    description: 'Writes a message in a canvas!',
    aliases: ['msg'],
	async execute (message, args) {
        if (!args.length) {
            const noArgs = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You need to supply arguments.');

            message.channel.send(noArgs);
            return 0;
        }

        if (args.length) {
            args = args.join(' ');
        }

        Canvas.registerFont('./assets/font/Roboto-Regular.ttf', { family: 'Roboto Regular' })
        Canvas.registerFont('./assets/font/Roboto-Bold.ttf', { family: 'Roboto Bold' })
        const canvas = Canvas.createCanvas(1000, 125);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#181818'
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 25, 25, 64, 64);

        ctx.font = '25px Roboto Bold';
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'Left'
        ctx.fillText(message.author.username, 105, 45);

        ctx.font = '20px Roboto Regular';
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'Left'
        ctx.fillText(args, 105, 75);

        const attachment = new MessageAttachment(canvas.toBuffer(), `ytc_${args[0]}.png`);

        const ytEmbed = new MessageEmbed()
            .setColor('#181818')
            .attachFiles([attachment])
            .setImage(`attachment://ytc_${args[0]}.png`);

        message.channel.send(ytEmbed)
	},
};