const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'eval',
	description: 'Evaluates JS.',
	execute (message, args) {
        if (message.author.id == '195090852974952448') {
            try {
                const code = args.join(' ');
                const clean = text => {
                    if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
                    else {return text;}
                };
                let evaled = Function(code)();
    
                if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
    
                const successEmbed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Here\'s the result of the code you just ran.')
                    .addField('Code:', `\`\`\`js\n${code}\n\`\`\``, true)
                    .addField('Result:', `\`\`\`js\n${clean(evaled)}\n\`\`\``, true);
                message.channel.send(successEmbed);
            }
            catch (err) {
                const error = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(`:x: ${err}`)
                message.channel.send(error);
            }
        }
    }
};