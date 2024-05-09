import { Telegraf,Context } from 'telegraf';


import { about,search } from './commands';
import { llmopenai, groqapi } from './llms';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import createDebug from 'debug';


const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

// for description BOT
try {
  const description = "Gracias por utilizar BonaFraganceBot, seré tu ayuda para comprar de forma rápida tu fragancia preferida";
  const response = async () => {
    await bot.telegram.callApi('setMyDescription', {
      description,
      language_code: 'es',
    });
 };
  
  console.log('setMyDescription',  response);
} catch (error) {
  console.error('setMyDescription',  error);
}

bot.start((ctx) => {
  let message = ` Para buscar una fragancia ingresa alguna frase como, cuánto cuesta el perfume para hombre Eros Versace?`
  ctx.reply(message)
})

bot.command('about', about());
bot.command('search', search());

const debug = createDebug('bot:handleRequest');





bot.on('message', groqapi());
bot.on("pre_checkout_query", ctx => ctx.answerPreCheckoutQuery(true));
bot.on("successful_payment", () => console.log("Pagado"));
//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
