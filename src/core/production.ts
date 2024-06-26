import { VercelRequest, VercelResponse } from '@vercel/node';
import createDebug from 'debug';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const debug = createDebug('bot:dev');

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Telegraf<Context<Update>>,
) => {
  // console.log('Bot runs in production mode');
  // console.log(`setting webhook: ${VERCEL_URL}`);
  // debug('Bot runs in production mode');
  // debug(`setting webhook: ${VERCEL_URL}`);

  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.');
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    // debug(`deleting webhook ${VERCEL_URL}`);
    // console.log('deleting webhook');
    await bot.telegram.deleteWebhook();
    // debug(`setting webhook: ${VERCEL_URL}/api`);
    // console.log('setting webhook');
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  }

  if (req.method === 'POST') {
    console.log('Estamos en POST production');
    console.log(`Req Body: ${JSON.stringify(req.body)}`);

    try {
      // Ensure that this is a message being sent
      await bot.handleUpdate(req.body as unknown as Update, res);
      //res.send("OK");
    } catch (error) {
      // If there was an error sending our message then we
      // can log it into the Vercel console
      console.error("Error sending message",JSON.stringify(error));
      
    }
    
    
  } else {
    res.status(200).json('Listening to bot events in Prod...');
  }
  // debug(`starting webhook on port: ${PORT}`);
  // console.error(`starting webhook on port: ${PORT}`);
};
export { production };
