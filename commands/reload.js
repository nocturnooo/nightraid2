const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'reload',
	description: 'Reload a command (owner only).',
	aliases: ['rl'],
	async execute (message, args) {
        const notCreator = new MessageEmbed()
		.setColor('#FF0000')
		.setDescription(':x: You aren\'t my creator.');
	if (message.author.id != '195090852974952448') return message.channel.send(notCreator);
	const provideCmd = new MessageEmbed()
		.setColor('#FF0000')
		.setDescription(':x: Provide a command to reload!');
	if(!args[0]) return message.channel.send(provideCmd);

    const commandName = args[0].toLowerCase();

	try {
		delete require.cache[require.resolve(`./${commandName}.js`)];
		message.client.commands.delete(commandName);
		const pull = require(`./${commandName}.js`);
		message.client.commands.set(commandName, pull);
	}
	catch(e) {
		const errorRl = new MessageEmbed()
			.setColor('#FF0000')
			.setDescription(`:x: Could not reload \`${args[0].toLowerCase()}\`.`);
        return message.channel.send(errorRl);
	}
	const successRl = new MessageEmbed()
		.setColor('#00FF00')
		.setDescription(`:white_check_mark: The \`${args[0].toLowerCase()}\` command has been reloaded!`);
	message.channel.send(successRl);
	},
};