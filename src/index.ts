import { Telegraf,Context } from 'telegraf';


import { about,search } from './commands';
import { llmopenai, groqapi } from './llms';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import createDebug from 'debug';


const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const debug = createDebug('bot:handleRequest');
const bot = new Telegraf(BOT_TOKEN);
const VERCEL_URL = `${process.env.VERCEL_URL}`;
// for description BOT
try {
  bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  const getWebhookInfo = bot.telegram.getWebhookInfo();
  const description = "Gracias por utilizar BonaFraganceBot, seré tu ayuda para comprar de forma rápida tu fragancia preferida";
  debug("Iniciando SetMyDescription");
  const response_setDescription = async () => {
    const setMyDescriptionBot = await bot.telegram.callApi('setMyDescription', {
      description,
      language_code: 'es',
    });
    // await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
    // const getWebhookInfo = await bot.telegram.getWebhookInfo();
    console.log('setMyDescriptionBot',  setMyDescriptionBot);
    debug("DebugSetmydescription",setMyDescriptionBot);
    // return getWebhookInfo;

 };
 
//  getWebhookInfo.then((value) => {
//   console.log(value);
//   // Expected output: "Success!"
// });
  //console.log('setMyDescription',  );
} catch (error) {
  console.error('setMyDescription',  error);
  debug("Error en setMyDescription",error);
}

bot.start((ctx) => {
  let message = ` Para buscar una fragancia ingresa alguna frase como, cuánto cuesta el perfume para hombre Eros Versace?`
  ctx.reply(message)
})

bot.command('about', about());
bot.command('search', search());







bot.on('message', groqapi());
bot.on("pre_checkout_query", ctx => ctx.answerPreCheckoutQuery(true));
bot.on("successful_payment", () => console.log("Pagado"));

//prod mode (Vercel)

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};




  
  // Expected output: "Success!"

//dev mode
// ENVIRONMENT !== 'production' && development(bot);
