const { Message, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require('simple-youtube-api');
const { yt_api_key } = require('../config.json');
const youtube = new YouTube(yt_api_key)

module.exports = {
    name: 'play',
    description: 'Play a song in your channel!',
    aliases: ['p'],
    async execute(message) {
        const noVC = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':musical_note::x: You are not in a voice channel!');

        const noPerms = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':musical_note::x: I do not have permissions!');

      try {
        const args = message.content.split(' ');
        const results = await youtube.searchVideos(args, 1);
        var searchResult = results[0].url;
        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
  
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(noVC);
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(noPerms);
        }
        const songInfo = await ytdl.getInfo(searchResult);
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };

        const addToQueue = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`:musical_note: Added ${song.title} to the queue!`);
  
        if (!serverQueue) {
          const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
  
          queue.set(message.guild.id, queueConstruct);
  
          queueConstruct.songs.push(song);
  
          try {
            var connection = await voiceChannel.join();
            if (!connection.voice.deaf) {
              connection.voice.setSelfDeaf(true);
            }
            queueConstruct.connection = connection;
            this.play(message, queueConstruct.songs[0]);
          } catch (err) {
            const errEmbed = new MessageEmbed()   
                .setColor('#FF0000')
                .setTitle(':musical_note::x: An error has occured!')
                .setDescription(err);

            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(errEmbed);
          }
        } else {
          serverQueue.songs.push(song);
          return message.channel.send(addToQueue);
        }
      } catch (error) {
        
        const errorEmbed = new MessageEmbed()   
            .setColor('#FF0000')
            .setTitle(':musical_note::x: An error has occured!')
            .setDescription(error);

        console.log(error);
        message.channel.send(errorEmbed);
      }
    },
  
    play(message, song) {
      const queue = message.client.queue;
      const guild = message.guild;
      const serverQueue = queue.get(message.guild.id);
  
      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }
  
      const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          serverQueue.songs.shift();
          this.play(message, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
        const nowPlaying = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`:musical_note: Now playing: ${song.title}!`)
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      serverQueue.textChannel.send(nowPlaying);
    }
};