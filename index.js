const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')
function checkFile(ctx) {
    const fileUploaded = ctx.message.document

    if (fileUploaded.mime_type !== 'application/pdf') {
        return ctx.reply('Загрузите резюме в формате .pdf')
    } else {
        return ctx.reply('Ваше резюме было загружено. Спасибо')
    }
}

const bot = new Telegraf('5305598864:AAG0XZ8GloSlpo8Vc6NUoaGvcrrxdj-AUM4')
bot.start((ctx) => ctx.reply(text.commands))
bot.help((ctx) => ctx.reply(text.commands))
bot.on('document', (ctx) => checkFile(ctx))

bot.command('menu', async(ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите что вы хотите сделать:</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Отправить резюме', 'uploadCV')],
                [Markup.button.callback('Доступные вакансии', 'searchForVacancy')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }
})

bot.action('uploadCV', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX\\UI designer ', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
    } catch(e) {
        console.error(e)
    }
})
bot.action('ux_ui_category', async (ctx) => {
    try {
        await ctx.replyWithHTML('hey')
    } catch (e) {
        console.error(e)
    }
})

// bot.action('it_category', async (ctx) => {
//
// })
bot.launch()


// try {
//     await ctx.replyWithHTML('Прикрепите ваше резюме и ответьте на несколько вопросов, чтобы было легче классифицировать ваш опыт')
// } catch(e) {
//     console.error(e)
// }
// try {
//     bot.on('document', (ctx) => checkFile(ctx))
// } catch(e) {
//     console.error(e)
// }

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))