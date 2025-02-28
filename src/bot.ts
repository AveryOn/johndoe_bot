import TelegramBot from 'node-telegram-bot-api';
import { getRandomMeme } from './api/memes.api';
import moment from 'moment';
import { getResponse } from './deepseek';


const token = process.env.BOT_API;

const bot = new TelegramBot(token!, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log('[SEND] start', chatId);
    bot.sendMessage(chatId, 'Привет! Я твой бот.');
});


bot.onText(/\>*/, async (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId);
    // Отправить сообщение конкретному чату
    // bot.sendMessage(12334456, 'Владислав, который меня разработал, приветствует Вас, и желает Вам хорошего дня! 🚀')
    // bot.sendMessage(chatId, 'Сообщение успешно доставлено!')
});

bot.onText(/^=.*/, async (msg) => {
    const chatId = msg.chat.id;
    console.log();
    
    try {
        console.log('[SEND] go', chatId);
        if(msg.text) {
            const response = await getResponse(msg.text)
            let content = response.choices[0]?.message?.content!
            if(!content) content = 'internal error'
            console.log('НЕЙРОНКА ОТВЕТИЛА', content);
            bot.sendMessage(chatId, content);
        }
    } catch (err) {
        bot.sendMessage(chatId, 'Что-то пошло не так, свяжитесь с ведущим разработчиком');
        console.error(`[ERROR] go`, err);
    }
});

// Обработчик команды /мем
bot.onText(/\/мем/, async (msg) => {
    const chatId = msg.chat.id;
    console.log('[SEND] meme', chatId);

    try {
        const memeUrl = await getRandomMeme();
        if (memeUrl) {
            bot.sendMessage(chatId, 'Вот твой мем!');
            bot.sendPhoto(chatId, memeUrl);
        } else {
            bot.sendMessage(chatId, 'Извините, не удалось получить мем.');
        }
    } catch (err) {
        console.log(err);
        bot.sendMessage(chatId, 'Не удалось отправить мем :(');
    }

});