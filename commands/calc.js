const { Message, MessageEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
	name: 'calc',
	description: 'Does calculations.',
	async execute (message, args) {
        const noArgs = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Please provide a calculation.');
        
        if (!args[0]) return message.channel.send(noArgs);
        let calcOutput;
        try {
        calcOutput = math.evaluate(args.join(' '));
        }
        catch (e) {
        const notValid = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription('Please provide a **valid** calculation.');
        return message.channel.send(notValid);
        }
        
        const output = new MessageEmbed()
        .setColor('#00FF00')
        .addField('Input', '```js\n' + args.join('') + '```', true)
        .addField('Output', '```js\n' + calcOutput + '```', true);
        
        message.channel.send(output);
	},
};