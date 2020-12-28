const { Message, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
	name: 'usercard',
    description: 'Creates a unique user card!',
	async execute (message) {
        const mentionedUser = message.mentions.users.first() || message.author;
        const mentionedUserName = mentionedUser.username;
        Canvas.registerFont('./assets/font/Roboto-Regular.ttf', { family: 'Roboto Regular' })
        Canvas.registerFont('./assets/font/Roboto-Bold.ttf', { family: 'Roboto Bold' })
        const canvas = Canvas.createCanvas(1024, 256);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#181818'
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const crown_emoji = await Canvas.loadImage('./assets/emoji/crown.png')
        const thinking_emoji = await Canvas.loadImage('./assets/emoji/thinking.png')

        const user_card = await Canvas.loadImage('./assets/user_card.png')
        const house_balance = await Canvas.loadImage('./assets/house_balance.png')
        const house_bravery = await Canvas.loadImage('./assets/house_bravery.png')
        const house_brilliance = await Canvas.loadImage('./assets/house_brilliance.png')
        const avatar = await Canvas.loadImage(mentionedUser.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(user_card, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar, 35, 64, 128, 128);

        if (mentionedUser.id === '195090852974952448') { ctx.drawImage(crown_emoji, 67, 14, 64, 64); }; // Nocturno
        if (mentionedUser.id === '168728416349061122') { ctx.drawImage(thinking_emoji, 67, 14, 64, 64); }; // Silvian

        ctx.font = '35px Roboto Bold';
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'Left'
        ctx.fillText(mentionedUserName, 185, 100);

        if (mentionedUser.flags.has('HOUSE_BALANCE')) { ctx.drawImage(house_balance, 962, 77, 32, 32); }
        if (mentionedUser.flags.has('HOUSE_BRAVERY')) { ctx.drawImage(house_bravery, 921, 78, 32, 32); }
        if (mentionedUser.flags.has('HOUSE_BRILLIANCE')) { ctx.drawImage(house_brilliance, 880, 78, 32, 32); }
        
        var joinedAt = mentionedUser.createdAt
        var joinedAtSimplified = joinedAt.toISOString().split('T')[0];

        ctx.font = '20px Roboto Regular';
        ctx.fillStyle = '#757575'
        ctx.textAlign = 'Left'
        ctx.fillText(`Account created at: ${joinedAtSimplified}`, 185, 170);

        const attachment = new MessageAttachment(canvas.toBuffer(), `user_card_${mentionedUserName}.png`);

        const gonnacryEmbed = new MessageEmbed()
            .setColor('#181818')
            .setTitle(`Here's ${mentionedUserName}'s user card!`)
            .attachFiles([attachment])
            .setImage(`attachment://user_card_${mentionedUserName}.png`);

        message.channel.send(gonnacryEmbed)
	},
};