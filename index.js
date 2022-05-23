const { Telegraf, Markup, session, Scenes, Composer} = require('telegraf')
const mysql = require('mysql')
const text = require('./const')
const bot = new Telegraf('5305598864:AAEjyRDw4DFR07breCDxRFdulAmttc7AJ0M')
const startQuiz = new Composer()
const uploadOrSearch = new Composer()
const chooseCategory = new Composer()
const quizFio = new Composer()
const quizEmail = new Composer()
const quizPhone = new Composer()
const quizCV = new Composer()
const quizAbout = new Composer()

require('dotenv').config()

let pool = mysql.createPool({
    host: "longro3i.beget.tech",
    user: "longro3i_cv",
    database: "longro3i_cv",
    password: "J3TN&4hX_U5SRV5"
});

bot.start((ctx) => ctx.reply(text.commands))
bot.help((ctx) => ctx.reply(text.commands))


// Functions
function categoryFormat(category) {

    if (category === 'ux_ui_category') {
        category = 'UX/UI designer'
    }
    if (category === '3d_designer_category') {
        category = '3D designer'
    }
    if (category === 'frontend_category') {
        category = 'Frontend developer'
    }
    if (category === 'backend_category') {
        category = 'Backend developer'
    }
    if (category === 'qa_category') {
        category = 'QA software'
    }
    if (category === 'marketing_category') {
        category = 'Marketing & PR'
    }

    return category
}

startQuiz.on('text', async (ctx) => {
    console.log('enter - ' + ctx.wizard.cursor)
    ctx.wizard.state.data = {}
    try {
        await ctx.replyWithHTML('<b>Выберите, что вы хотите сделать:</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Отправить резюме', 'uploadCV')],
                [Markup.button.callback('Доступные вакансии', 'searchForVacancy')]
            ]
        ))
        return ctx.wizard.next()
    } catch(e) {
        console.error(e)
    }
})

uploadOrSearch.action('uploadCV', async (ctx) => {
    console.log('upload - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
        return ctx.wizard.next()
    } catch(e) {
        console.error(e)
    }
})

chooseCategory.action('ux_ui_category', async (ctx) => {

    let category = 'UX/UI designer'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите резюме</b>`)
        return ctx.wizard.selectStep(5)
    }

    if (ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_phone')],
            ])
        )
        await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
        return ctx.wizard.selectStep(6)
    }

    console.log('category - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.chooseCategory = 'ux_ui_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})
chooseCategory.action('3d_designer_category', async (ctx) => {
    let category = '3D designer'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = '3d_designer_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = '3d_designer_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    ctx.wizard.state.data.chooseCategory = '3d_designer_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})
chooseCategory.action('frontend_category', async (ctx) => {

    let category = 'Frontend developer'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = 'frontend_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'frontend_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    ctx.wizard.state.data.chooseCategory = 'frontend_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})
chooseCategory.action('backend_category', async (ctx) => {

    let category = 'Backend developer'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = 'backend_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'backend_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    ctx.wizard.state.data.chooseCategory = 'backend_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})
chooseCategory.action('qa_category', async (ctx) => {

    let category = 'QA software'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = 'qa_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'qa_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    ctx.wizard.state.data.chooseCategory = 'qa_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})
chooseCategory.action('marketing_category', async (ctx) => {

    let category = 'Marketing & PR'

    if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
        ctx.wizard.state.data.chooseCategory = 'marketing_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_fio')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
        return ctx.wizard.selectStep(4)
    }

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.chooseCategory = 'marketing_category'
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    ctx.wizard.state.data.chooseCategory = 'marketing_category'

    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_category')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.next()
})

quizFio.on('text', async (ctx) => {

    let category = categoryFormat(ctx.wizard.state.data.chooseCategory)

    if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.quizFio = ctx.message.text
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_email')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
        return ctx.wizard.selectStep(5)
    }

    if (ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.quizFio = ctx.message.text
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_phone')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите Ваше резюме</b>`)
        return ctx.wizard.selectStep(6)
    }

    console.log('fio - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.quizFio = ctx.message.text
    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_fio')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
    return ctx.wizard.next()
})

quizEmail.on('text', async (ctx) => {

    let category = categoryFormat(ctx.wizard.state.data.chooseCategory)

    if (ctx.wizard.state.data.quizPhone) {
        ctx.wizard.state.data.quizEmail = ctx.message.text
        await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактировать', 'edit_on_phone')],
            ]),
        )
        await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите Ваше резюме</b>`)
        return ctx.wizard.selectStep(6)
    }

    console.log('email - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizEmail = ctx.message.text
    await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_email')],
        ]),
    )
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
    return ctx.wizard.next()
})

quizPhone.on('text', async (ctx) => {

    let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
    ctx.wizard.state.data.quizPhone = ctx.message.text
    await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Редактировать', 'edit_on_phone')],
        ])
    )

    console.log(ctx.wizard.state.data)
    await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
    return ctx.wizard.next()
})

quizCV.on('text', async (ctx) => {
    await ctx.reply('Загрузите резюме в формате .pdf')
})

quizCV.on('document', async (ctx) => {
    let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
    ctx.wizard.state.data.quizCV = ctx.message.document.file_name
    const fileUploaded = ctx.message.document
    if (fileUploaded.mime_type !== 'application/pdf') {
        await ctx.reply('Загрузите резюме в формате .pdf')
    } else {
        await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n<i>Ваше резюме загружено. Название файла: </i><i>${ctx.wizard.state.data.quizCV}</i>\r\n\r\n<b>Расскажите о себе</b>`)
        return ctx.wizard.next()
    }
})

quizAbout.on('text', async (ctx) => {
    ctx.wizard.state.data.quizComment = ctx.message.text
    console.log(ctx.wizard.state.data)
    try {
        let query="INSERT INTO users(telegram_first_name, telegram_last_name, telegram_id, chosen_category, full_name, email, phone, cv_link, comment) VALUES (?)";
        let values = [
            encodeURI(ctx.from.first_name),
            encodeURI(ctx.from.last_name),
            encodeURI(ctx.from.username),
            encodeURI(ctx.wizard.state.data.chooseCategory),
            encodeURI(ctx.wizard.state.data.quizFio),
            encodeURI(ctx.wizard.state.data.quizEmail),
            encodeURI(ctx.wizard.state.data.quizPhone),
            encodeURI(ctx.wizard.state.data.quizCV),
            encodeURI(ctx.wizard.state.data.quizComment),

        ]
        pool.query(query, ([values]), (err, result, field) => {
            console.log(err);
            console.log(result);
            console.log(field);
        });
    } catch (e) {
        console.error(e)
    }
    await ctx.replyWithHTML(`Спасибо! \r\n\r\n<b>Ваши данные отправлены</b>\r\nМы свяжемся с Вами сразу после обработки данных`)
    return ctx.scene.leave()
})


// QUIZ EDITS

quizFio.action('edit_on_category', async (ctx) => {
    await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
        [Markup.button.callback('Категорию', 'edit_category_on_fio')],
    ]))
})

quizEmail.action('edit_on_fio', async (ctx) => {
    await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
        [Markup.button.callback('Категорию', 'edit_category_on_email')],
        [Markup.button.callback('ФИО', 'edit_fio_on_email')],
    ]))
})
quizPhone.action('edit_on_email', async (ctx) => {
    await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
        [Markup.button.callback('Категорию', 'edit_category_on_phone')],
        [Markup.button.callback('ФИО', 'edit_fio_on_phone')],
        [Markup.button.callback('Email', 'edit_email_on_phone')],

    ]))
})

quizCV.action('edit_on_phone', async (ctx) => {
    await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
        [Markup.button.callback('Категорию', 'edit_category_on_cv')],
        [Markup.button.callback('ФИО', 'edit_fio_on_cv')],
        [Markup.button.callback('Email', 'edit_email_on_cv')],
        [Markup.button.callback('Phone', 'edit_phone_on_cv')],
    ]))
})

// Edit actions
quizFio.action('edit_category_on_fio', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
        return ctx.wizard.selectStep(2)
    } catch(e) {
        console.error(e)
    }
})

quizEmail.action('edit_category_on_email', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
        return ctx.wizard.selectStep(2)
    } catch(e) {
        console.error(e)
    }
})
quizEmail.action('edit_fio_on_email', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.selectStep(3)
})

quizPhone.action('edit_category_on_phone', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
        return ctx.wizard.selectStep(2)
    } catch(e) {
        console.error(e)
    }
})
quizPhone.action('edit_fio_on_phone', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.selectStep(3)
})
quizPhone.action('edit_email_on_phone', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Email</b>`)
    return ctx.wizard.selectStep(4)
})


quizCV.action('edit_category_on_cv', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
                [Markup.button.callback('3D designer', '3d_designer_category')],
                [Markup.button.callback('Frontend developer', 'frontend_category')],
                [Markup.button.callback('Backend developer', 'backend_category')],
                [Markup.button.callback('QA software', 'qa_category')],
                [Markup.button.callback('Marketing & PR', 'marketing_category')],
            ]
        ))
        return ctx.wizard.selectStep(2)
    } catch(e) {
        console.error(e)
    }
})
quizCV.action('edit_fio_on_cv', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
    return ctx.wizard.selectStep(3)
})
quizCV.action('edit_email_on_cv', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Email</b>`)
    return ctx.wizard.selectStep(4)
})
quizCV.action('edit_phone_on_cv', async (ctx) => {
    await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Phone</b>`)
    return ctx.wizard.selectStep(5)
})
// /EDITS

const menuScene = new Scenes.WizardScene('quiz', startQuiz, uploadOrSearch, chooseCategory, quizFio, quizEmail, quizPhone, quizCV, quizAbout)

const stage = new Scenes.Stage([menuScene])

bot.use(session(), stage.middleware());

bot.command('menu', ctx => ctx.scene.enter('quiz'))


bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))