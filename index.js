import OpenAI from 'openai';

import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
], });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN, // defaults to process.env["OPENAI_API_KEY"]
  });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

    const userMessage = message.content;
    // console.log(userMessage)

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage + "(act like a cute cat)" }],
        temperature: 0.8,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    
    console.log(response.choices[0].message.content)
    message.reply(response.choices[0].message.content)
});

client.login(process.env.DISCORD_TOKEN);