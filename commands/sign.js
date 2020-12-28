const { Message, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
	name: 'sign',
    description: 'Writes on a Minecraft Sign!',
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

        Canvas.registerFont('./assets/font/minecraft_regular.otf', { family: 'minecraft' })
        const canvas = Canvas.createCanvas(375, 407);
        const ctx = canvas.getContext('2d');

        const sign = await Canvas.loadImage('./assets/sign.png')
        ctx.drawImage(sign, 0, 0, canvas.width, canvas.height);

        ctx.font = '30px minecraft';
        ctx.fillStyle = '#000000'
        ctx.textAlign = 'center'
        ctx.fillText(args, 185, 85);

        const attachment = new MessageAttachment(canvas.toBuffer(), `sign_${args[0]}.png`);

        const signEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .attachFiles([attachment])
            .setImage(`attachment://sign_${args[0]}.png`);

        message.channel.send(signEmbed)
	},
};