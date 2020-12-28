const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = new Map();
const packageJSON = require('./package.json')
const nightraidVersion = packageJSON.version;
const config = require('./config.json');
const prefix = config.prefix;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    var commandCount = 0;
    client.user.setPresence({ activity: { name: `prefix: ${prefix}` }, status: 'dnd' })
    const statuses = [
        `prefix: ${prefix}`,
        `n! | active on ${client.guilds.cache.size} guild(s)`,
        `n! | using discord.js version ${Discord.version}`,
        `n! | using node.js version ${process.version}`,
        `n! | memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}mb`,
        `n! | Nightraid II version: ${nightraidVersion}`
    ]
    setInterval(() => {
        const statusGen = Math.floor(Math.random() * (statuses.length - 1) + 1);
        client.user.setPresence({ activity: { name: statuses[statusGen] }, status: 'dnd' })
	}, 1800000);
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('-------------------------------')
    console.log(`Prefix: ${prefix}`)
    console.log('-------------------------------')
    for (const file of commandFiles) {
        console.log(`Loaded ${file}`);
        commandCount++;
    }
    console.log('-------------------------------')
    console.log('Nightraid II is now ready.')
    console.log(`Loaded ${commandCount} commands.`)
    console.log('-------------------------------')
});

const banned = [
    '502902356518633502'
];

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;   

    try {
        if (!banned.includes(message.author.id)) {
            command.execute(message, args);
        } else {
            const bannedEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You are banned from using Nightraid II.');

            message.channel.send(bannedEmbed);
        }
	} catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':x: Error!')
            .setDescription(error);

		console.error(error);
		message.channel.send(errorEmbed);
	}
});

client.on('guildCreate', guild => {
    console.log(`Nightraid II was added to: ${guild.name}`)
});

client.on('guildDelete', guild => {
    console.log(`Nightraid II was removed from: ${guild.name}`)
});

client.login(config.token);