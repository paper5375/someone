import { Client, Intents } from "discord.js";
import { token, clientId } from "./config.json";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on("ready", _ => console.log("Bot has successfully started!"));

client.on("guildCreate", guild => {
  guild.me?.setNickname("someone", "This is an automated process!");
});

client.on("messageCreate", message => {
  if (message.mentions.has(clientId)) {
    message.guild?.members.fetch()
    .then(members => {
      members?.delete(clientId);
      let index = Math.floor(Math.random() * members.size);
      let arr: any[] = Array.from(members.keys());
      message.channel.send(`<@${arr[index]}>`)
      .then(msg => {
        setTimeout(() => msg.delete(), 1000);
      });
    });
  }
});

client.login(token);
