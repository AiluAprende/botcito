require('dotenv').config()
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Clima = require('./comandos/clima');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

const prefix = "!";

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args?.shift().toLowerCase();

  if (command == "ping") {
    console.log('es igual a ping');
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command == "clima") Clima(args, message, client)
}
);

client.login(process.env.BOT_TOKEN);