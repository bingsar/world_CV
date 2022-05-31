const { Telegraf, Markup, session, Scenes, Composer} = require('telegraf')
const mysql = require('mysql')
const text = require('./const')
const bot = new Telegraf('5305598864:AAEjyRDw4DFR07breCDxRFdulAmttc7AJ0M')

const categoryList = new Composer()
const choseSubCategory = new Composer()

const quizFio = new Composer()
const quizEmail = new Composer()
const quizPhone = new Composer()
const quizLocation = new Composer()
const quizReadyRelocate = new Composer()
const quizCV = new Composer()
const quizFile = new Composer()
const quizAbout = new Composer()
const quizGetFile = new Composer()
const quizSendData = new Composer()
const quizEdit = new Composer()
const quizBackOnEdits = new Composer()

require('dotenv').config()
let pool = mysql.createPool({
    host: "longro3i.beget.tech",
    user: "longro3i_cv",
    database: "longro3i_cv",
    password: "J3TN&4hX_U5SRV5"
});

bot.start(async (ctx) => {
    await ctx.replyWithHTML(`<b>Привет 👏</b>\r\n\r\nЯ чатбот Hubbler.\r\n\r\nЯ помогу найти подходящие для тебя вакантные позиции в ведущих компаниях 💥\r\n\r\nВсё что нужно сделать это ответить на несколько вопросов и дать нам некоторое время, чтобы подобрать для тебя лучшие предложения.\r\n\r\nНачнём?\r\n\r\n`,
        Markup.inlineKeyboard([
            [Markup.button.callback('Да', 'start_quiz')],
            [Markup.button.callback('Меню', 'button_menu')]
        ])
    )
})

bot.action('button_menu', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.replyWithHTML('<i>Меню</i>', Markup.inlineKeyboard([
        [Markup.button.callback('Отправить заявку', 'start_quiz')],
        [Markup.button.callback('О Hubbler', 'about'), Markup.button.callback('Сообщения', 'messages')]
    ]))
})

bot.action('about', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.replyWithHTML(`\r\n\r\n<b>Hubbler</b> - это рекрутинговая команда высококлассных профессионалов в области IT и дизайна. Опыт, инсайдерское знание отрасли и сообщества позволяют нам объединять таланты с компаниями, нуждающимися в кадрах и реализации проектов.`, Markup.inlineKeyboard([
        [Markup.button.callback('Узнать больше', 'link_to_website')],

        [Markup.button.callback('⬅ Назад', 'button_menu')]

    ]))
})

bot.action('messages', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.replyWithHTML('Нет новых сообщений и уведомлений.', Markup.inlineKeyboard([
        [Markup.button.callback('Отправь нам свою заявку', 'start_quiz')],

        [Markup.button.callback('⬅ Назад', 'button_menu')]
    ]))
})
bot.help((ctx) => ctx.reply(text.commands))

categoryList.action('start_quiz', async (ctx) => {
    await ctx.deleteMessage()

    console.log('start_quiz - ' + ctx.wizard.cursor)

    ctx.wizard.state.data = {}
    ctx.wizard.state.data.fileValidation = false
    ctx.wizard.state.data.username = ctx.from.username
    ctx.wizard.state.data.first_name = ctx.from.first_name
    ctx.wizard.state.data.last_name = ctx.from.last_name
    try {
        await ctx.replyWithHTML('<b>Какая специализация вас интересует?</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Data Science & Analytics', 'data_science')],
                [Markup.button.callback('Design & Creative', 'design')],
                [Markup.button.callback('IT & Networking', 'it')],
                [Markup.button.callback('Web, Mobile & Software Dev', 'software')],

                [Markup.button.callback('⬅ Меню', 'button_menu')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }


    return ctx.wizard.next()
})


choseSubCategory.action('edits', async (ctx) => {
    console.log('category_list_edits - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

choseSubCategory.action('data_science', async (ctx) => {
    await ctx.deleteMessage()

    if (ctx.wizard.state.data.whatEditing === 'category') {
        await ctx.wizard.selectStep(11)
    }

    try {
        await ctx.replyWithHTML('<b>Выберите подкатегорию</b>', Markup.inlineKeyboard([
                [Markup.button.callback('A/B Testing', `sub_ab_testing`)],
                [Markup.button.callback('Data Analytics', `sub_data_analytics`)],
                [Markup.button.callback('Data Engineering', `sub_data_engineering`)],
                [Markup.button.callback('Data Extraction', `sub_data_extraction`)],
                [Markup.button.callback('Data Mining', `sub_data_mining`)],
                [Markup.button.callback('Data Processing', `sub_data_processing`)],
                [Markup.button.callback('Data Visualization', `sub_data_visualization`)],
                [Markup.button.callback('Deep Learning', `sub_data_learning`)],
                [Markup.button.callback('Experimentation & Testing', `sub_experimentation_testing`)],
                [Markup.button.callback('Knowledge Representation', `sub_knowledge_representation`)],
                [Markup.button.callback('Machine Learning', `sub_machine_learning`)],
                [Markup.button.callback('Другое', `custom_category`)],


                [Markup.button.callback('⬅ Назад', `start_quiz`)]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})
choseSubCategory.action('design', async (ctx) => {
    await ctx.deleteMessage()

    if (ctx.wizard.state.data.whatEditing === 'category') {
        await ctx.wizard.selectStep(11)
    }

    try {
        await ctx.replyWithHTML('<b>Выберите подкатегорию</b>', Markup.inlineKeyboard([
                [Markup.button.callback('2D Animation', `sub_2d_animation`)],
                [Markup.button.callback('3D Animation', `sub_3d_animation`)],
                [Markup.button.callback('AR/VR Design', `sub_ar_vr_design`)],
                [Markup.button.callback('Acting', `sub_acting`)],
                [Markup.button.callback('Brand Identity Design', `sub_brand_identity_design`)],
                [Markup.button.callback('Cartoons & Comics', `sub_cartoons_comics`)],
                [Markup.button.callback('Editorial Design', `sub_editorial_design`)],
                [Markup.button.callback('Game Art', `sub_game_art`)],
                [Markup.button.callback('Graphic Design', `sub_graphic_design`)],
                [Markup.button.callback('Illustration', `sub_illustration`)],
                [Markup.button.callback('Image Editing', `sub_image_editing`)],
                [Markup.button.callback('Logo Design', `sub_logo_design`)],
                [Markup.button.callback('Motion Graphics', `sub_motion_graphics`)],
                [Markup.button.callback('NFT Art', `sub_nft_art`)],
                [Markup.button.callback('Packaging Design', `sub_packaging_design`)],
                [Markup.button.callback('Pattern Design', `sub_pattern_design`)],
                [Markup.button.callback('Presentation Design', `sub_presentational_design`)],
                [Markup.button.callback('Product & Industrial Design', `sub_product_industrial_design`)],
                [Markup.button.callback('Другое', `custom_category`)],

                [Markup.button.callback('⬅ Назад', `start_quiz`)]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})
choseSubCategory.action('it', async (ctx) => {
    await ctx.deleteMessage()

    if (ctx.wizard.state.data.whatEditing === 'category') {
        await ctx.wizard.selectStep(11)
    }

    try {
        await ctx.replyWithHTML('<b>Выберите подкатегорию</b>', Markup.inlineKeyboard([
                [Markup.button.callback('Applications Development', `sub_application_development`)],
                [Markup.button.callback('Cloud Engineering', `sub_cloud_engineering`)],
                [Markup.button.callback('Database Administration', `sub_database_administration`)],
                [Markup.button.callback('DevOps Engineering', `sub_devops_engineering`)],
                [Markup.button.callback('IT Compliance', `sub_it_compliance`)],
                [Markup.button.callback('Information Security', `sub_information_security`)],
                [Markup.button.callback('Network Administration', `sub_network_administration`)],
                [Markup.button.callback('Network Security', `sub_network_security`)],
                [Markup.button.callback('Solutions Architecture', `sub_solutions_architecture`)],
                [Markup.button.callback('Systems Administration', `sub_systems_administration`)],
                [Markup.button.callback('Systems Engineering', `sub_systems_engineering`)],
                [Markup.button.callback('Другое', `custom_category`)],

                [Markup.button.callback('⬅ Назад', `start_quiz`)]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})
choseSubCategory.action('software', async (ctx) => {
    await ctx.deleteMessage()

    if (ctx.wizard.state.data.whatEditing === 'category') {
        await ctx.wizard.selectStep(11)
    }

    try {
        await ctx.replyWithHTML('<b>Выберите подкатегорию</b>', Markup.inlineKeyboard([
                [Markup.button.callback('AR/VR Development', `sub_ar_vr_development`)],
                [Markup.button.callback('Agile Leadership', `sub_agile_leadership`)],
                [Markup.button.callback('Automation Testing', `sub_automation_testing`)],
                [Markup.button.callback('Back-End Development', `sub_back_end_development`)],
                [Markup.button.callback('Blockchain & NFT Development', `sub_blockchain_nft_development`)],
                [Markup.button.callback('CMS Development', `sub_cms_development`)],
                [Markup.button.callback('Coding Tutoring', `sub_coding_tutoring`)],
                [Markup.button.callback('Crypto Coins & Tokens', `sub_crypto_coins_tokens`)],
                [Markup.button.callback('Crypto Wallet Development', `sub_crypto_wallet_development`)],
                [Markup.button.callback('Database Development', `sub_database_development`)],
                [Markup.button.callback('Desktop Software Development', `sub_desktop_software_development`)],
                [Markup.button.callback('Ecommerce Website Development', `sub_ecommerce_website_development`)],
                [Markup.button.callback('Emerging Tech', `sub_emerging_tech`)],
                [Markup.button.callback('Firmware Development', `sub_firmware_development`)],
                [Markup.button.callback('Front-End Development', `sub_front_end_development`)],
                [Markup.button.callback('Full Stack Development', `sub_full_stack_development`)],
                [Markup.button.callback('Другое', `custom_category`)],

                [Markup.button.callback('⬅ Назад', `start_quiz`)]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizFio.action('custom_category', async (ctx) => {
    console.log('action_sendCategory - ' + ctx.wizard.cursor)
    await ctx.replyWithHTML('Ведите вашу специальность', Markup.inlineKeyboard([
        [Markup.button.callback('⬅ Назад', `start_quiz`)]
    ]))
    await ctx.wizard.selectStep(1)
    return ctx.wizard.next()
})

quizFio.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.wizard.state.data = {}
    ctx.wizard.state.data.username = ctx.from.username
    ctx.wizard.state.data.first_name = ctx.from.first_name
    ctx.wizard.state.data.last_name = ctx.from.last_name
    console.log('enterFio - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.subcategory = `sub_${ctx.message.text}`
    ctx.wizard.state.data.subcategoryText = ctx.message.text

    try {
        await ctx.replyWithHTML('<b>Твоё имя?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `start_quiz`)]
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizFio.action(/sub_+/,async (ctx) => {
    await ctx.deleteMessage()
    let subcategory = ctx.match.input.substring(4)
    console.log(subcategory)
    let btnTextArray = ctx.update.callback_query.message.reply_markup.inline_keyboard
    let btnText

    for (let key in btnTextArray) {
        let btnArray = []
        btnArray = btnTextArray[key]
        for (let number in btnArray) {
            let textId = btnArray[number].callback_data
            if (textId.substring(4) === subcategory) {
                btnText = btnArray[number].text
            }
        }
    }
    console.log('enterFio - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.subcategory = subcategory
    ctx.wizard.state.data.subcategoryText = btnText

    try {
        await ctx.replyWithHTML('<b>Твоё имя?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `start_quiz`)]
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizEmail.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.deleteMessage(ctx.message.message_id-1)
    ctx.wizard.state.data.chatId = ctx.message.chat.id

    console.log('enterEmail - ' + ctx.wizard.cursor)
    console.log(ctx.wizard.state.data.subcategory)
    ctx.wizard.state.data.quizName = ctx.message.text

    try {
        if (ctx.wizard.state.data.whatEditing !== 'contact') {
            await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Mobile', 'contact_mobile')],
                [Markup.button.callback('Email', 'contact_email')],
                [Markup.button.callback('Telegram', 'contact_telegram')],

                [Markup.button.callback('⬅ Назад', 'back_on_email')]
            ]))
        } else {
            await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Mobile', 'contact_mobile')],
                [Markup.button.callback('Email', 'contact_email')],
                [Markup.button.callback('Telegram', 'contact_telegram')],

                [Markup.button.callback('⬅ Назад', 'backToEdits')]
            ]))
        }

    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizPhone.action('back_on_email', async (ctx) => {
    await ctx.deleteMessage()
    console.log('back_on_enterPhone - ' + ctx.wizard.cursor)
    ctx.wizard.selectStep(2)
    try {
        await ctx.replyWithHTML('<b>Твоё имя?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `start_quiz`)]
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizPhone.on('text', async (ctx) => {
    await ctx.deleteMessage()
})

quizPhone.action(/contact_+/, async (ctx) => {
    await ctx.deleteMessage()

    console.log('enterPhone - ' + ctx.wizard.cursor)
    let contactType = ctx.match.input.substring(8)
    let telegramId = ctx.from.username
    console.log(telegramId)

    ctx.wizard.state.data.quizType = contactType

    if (ctx.wizard.state.data.whatEditing === 'contact' && contactType !== 'telegram') {
        ctx.wizard.selectStep(7)
    }

    if (contactType === 'mobile') {
        try {
            await ctx.replyWithHTML('<b>Введи номер твоего телефона</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', `back_on_phone`)]
            ]))
        } catch (e) {
            console.error(e)
        }
    }

    if (contactType === 'email') {
        try {
            await ctx.replyWithHTML('<b>Введи свой email</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', `back_on_phone`)]
            ]))
        } catch (e) {
            console.error(e)
        }
    }

    if (contactType === 'telegram' && ctx.wizard.state.data.whatEditing !== 'contact') {
        try {
            await ctx.replyWithHTML(`<b>Сохранить этот username - <i>${telegramId}?</i></b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Да', `user_yes`)],
                [Markup.button.callback('Нет, ввести актуальный username', `user_no`)],
                [Markup.button.callback('⬅ Назад', `back_on_phone`)]
            ]))
        } catch (e) {
            console.error(e)
        }
    } else if (contactType === 'telegram' && ctx.wizard.state.data.whatEditing === 'contact') {
        try {
            await ctx.replyWithHTML(`<b>Сохранить этот username - <i>${telegramId}?</i></b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Да', `on_edits_user_yes`)],
                [Markup.button.callback('Нет, ввести актуальный username', `user_no`)],
                [Markup.button.callback('⬅ Назад', `back_on_phone`)]
            ]))
        } catch (e) {
            console.error(e)
        }
    }
    return ctx.wizard.next()
})

quizPhone.action('backToEdits', async (ctx) => {
    console.log('back_to_edits_on_quizPhone - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizLocation.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.deleteMessage(ctx.message.message_id-1)
    console.log('enterLocation_text - ' + ctx.wizard.cursor)
    console.log('message - ' + ctx.message.text)

    if ( ctx.wizard.state.data.quizType === 'mobile' ) {
        ctx.wizard.state.data.quizContactMobile = ctx.message.text
    }

    if ( ctx.wizard.state.data.quizType === 'email' ) {
        ctx.wizard.state.data.quizContactEmail = ctx.message.text
    }

    if ( ctx.wizard.state.data.quizType === 'telegram' ){
        ctx.wizard.state.data.quizContactTelegram = ctx.message.text
    }

    try{
        await ctx.replyWithHTML('<b>Какое твоё текущее местоположение?</b>',Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', 'back_on_location')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizLocation.action('user_no', async (ctx) => {
    await ctx.deleteMessage()
    console.log('enterLocation_user_no - ' + ctx.wizard.cursor)
    try {
        if (ctx.wizard.state.data.whatEditing === 'contact') {
            console.log('on_edits_telegram_enterLocation - ' + ctx.wizard.cursor)
            await ctx.replyWithHTML('<b>Введите актуальный username в telegram</b>')
            ctx.wizard.selectStep(9)
        } else {
            await ctx.replyWithHTML('<b>Введите актуальный username в telegram</b>')
            ctx.wizard.selectStep(4)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizLocation.action('user_yes', async (ctx) => {
    await ctx.deleteMessage()

    console.log('enterLocation - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.quizContactTelegram = ctx.from.username
    ctx.wizard.selectStep(5)
    try{
        await ctx.replyWithHTML('<b>Какое твоё текущее местоположение?</b>',Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', 'back_on_location')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizLocation.action('back_on_phone', async (ctx) => {
    await ctx.deleteMessage()
    ctx.wizard.selectStep(3)
    console.log('back_on_enterEmail - ' + ctx.wizard.cursor)

    try {
        if (ctx.wizard.state.data.whatEditing !== 'contact') {
            await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Mobile', 'contact_mobile')],
                [Markup.button.callback('Email', 'contact_email')],
                [Markup.button.callback('Telegram', 'contact_telegram')],

                [Markup.button.callback('⬅ Назад', 'back_on_email')]
            ]))
        } else {
            await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Mobile', 'contact_mobile')],
                [Markup.button.callback('Email', 'contact_email')],
                [Markup.button.callback('Telegram', 'contact_telegram')],

                [Markup.button.callback('⬅ Назад', 'backToEdits')]
            ]))
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizLocation.action('on_edits_user_yes', async (ctx) => {
    await ctx.deleteMessage()
    console.log('on_edits_enterLocation - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.contact = ctx.from.username
    try {
        await ctx.replyWithHTML(`<i>Проверьте данные и подтвердите отправку</i>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>@${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizReadyRelocate.action('back_on_location', async (ctx) => {
    await ctx.deleteMessage()
    ctx.wizard.selectStep(3)
    console.log('back_enterRelocate - ' + ctx.wizard.cursor)

    try {
        await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Mobile', 'contact_mobile')],
            [Markup.button.callback('Email', 'contact_email')],
            [Markup.button.callback('Telegram', 'contact_telegram')],

            [Markup.button.callback('⬅ Назад', 'back_on_email')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizReadyRelocate.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.deleteMessage(ctx.message.message_id-1)
    console.log('quizReadyRelocate - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizLocation = ctx.message.text
    try {
        await ctx.replyWithHTML('<b>Готов(а) ли ты переехать?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Да', 'relocate_yes')],
            [Markup.button.callback('Нет', 'relocate_no')],
            [Markup.button.callback('Не уверен(а)', 'relocate_not_sure')],

            [Markup.button.callback('⬅ Назад', 'back_on_relocate')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizCV.on('text', async (ctx) => {
    ctx.deleteMessage()
})

quizCV.action('back_on_relocate', async (ctx) => {
    await ctx.deleteMessage()
    console.log('quizCV - ' + ctx.wizard.cursor)
    try{
        await ctx.replyWithHTML('<b>Какое твоё текущее местоположение?</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_location')]
            ]
        ))
        await ctx.wizard.selectStep(5)
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizCV.action(/relocate_+/, async (ctx) => {
    await ctx.deleteMessage()
    console.log('quizCV - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizReadyRelocate = ctx.match.input.substring(9)

    try {
        await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
            [Markup.button.callback('Ссылкой', 'add_cv_link')],
            [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

            [Markup.button.callback('⬅ Назад', 'back_on_cv')],
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizFile.on('text', async (ctx) => {
    ctx.deleteMessage()
})

quizFile.action('backToEdits', async (ctx) => {
    console.log('back_to_edits_on_quizFile - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizFile.action('back_on_cv', async (ctx) => {
    await ctx.deleteMessage()
    console.log('back_quizFile - ' + ctx.wizard.cursor)

    try{
         await ctx.replyWithHTML('<b>Готов(а) ли ты переехать?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Да', 'relocate_yes')],
            [Markup.button.callback('Нет', 'relocate_no')],
            [Markup.button.callback('Не уверен(а)', 'relocate_not_sure')],

            [Markup.button.callback('⬅ Назад', 'back_on_relocate')]
        ]))

        await ctx.wizard.selectStep(6)
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizFile.action(/add_+/, async (ctx) => {
    await ctx.deleteMessage()
    console.log('quizFile - ' + ctx.wizard.cursor)

    let fileAddMethod = ctx.match.input.substring(4)
    ctx.wizard.state.data.quizCV = fileAddMethod
    try {
        if (fileAddMethod === 'cv_link') {
            await ctx.replyWithHTML('<b>Вставь ссылку</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_file')]
            ]))

            return ctx.wizard.next()
        }
        if (fileAddMethod === 'cv_pdf') {
            await ctx.replyWithHTML('<b>Прикрепите файл в формате .pdf</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_file')]
            ]))

            return ctx.wizard.next()
        }
    } catch (e) {
        console.error(e)
    }
})

quizAbout.action('back_on_file', async (ctx) => {
    await ctx.deleteMessage()
    console.log('back_quizAbout - ' + ctx.wizard.cursor)

    try {
        if (ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'back_on_cv')],
            ]))
            await ctx.wizard.selectStep(7)
        } else {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'backToEdits')],
            ]))
            await ctx.wizard.selectStep(7)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizAbout.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.deleteMessage(ctx.message.message_id-1)
    console.log('quizAbout_text - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.quizResume = ctx.message.text
    try {
        if (ctx.wizard.state.data.quizCV === 'cv_link' && ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('<b>Расскажи о себе (опционально)</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_about')],
                [Markup.button.callback('➡ Пропустить', 'forward_on_about')]
            ]))
        } else if (ctx.wizard.state.data.quizCV === 'cv_link' && ctx.wizard.state.data.whatEditing === 'resume') {
            console.log('edits_on_quizAbout - ' + ctx.wizard.cursor)
            await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
            await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
            await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
            await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
            await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
            await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
            await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
            await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
            await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Завершить и отправить', 'sendData')],
                [Markup.button.callback('Редактировать', 'edits')]
            ]))
            await ctx.wizard.selectStep(10)
        } else {
            await ctx.replyWithHTML('<b>Вы выбрали метод загрузки Резюме файлом .pdf</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Вернуться к выбору метода', 'back_on_about')]
            ]))
            await ctx.wizard.selectStep(8)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizAbout.on('document', async (ctx) => {
    await ctx.deleteMessage()

    console.log('quizAbout_document - ' + ctx.wizard.cursor)

    const fileUploaded = ctx.message.document

    try {
        if (fileUploaded.mime_type !== 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf') {
            await ctx.deleteMessage(ctx.message.message_id-1)
            await ctx.replyWithHTML('<b>Загрузите резюме в формате .pdf</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_about')]
            ]))
            await ctx.wizard.selectStep(8)
        }

        if (ctx.wizard.state.data.quizCV === 'cv_link') {
            await ctx.deleteMessage(ctx.message.message_id-1)
            await ctx.replyWithHTML('<b>Вы выбрали метод загрузки Резюме по ссылке</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Вернуться к выбору метода', 'back_on_about')]
            ]))
            await ctx.wizard.selectStep(8)
        }

        if (fileUploaded.mime_type === 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf' && ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('<b>Расскажи о себе (опционально)</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_about')],
                [Markup.button.callback('➡ Пропустить', 'forward_on_about')]
            ]))

            ctx.wizard.state.data.fileValidation = true

            if (ctx.message.document.file_name) {
                ctx.wizard.state.data.quizResume = ctx.message.document.file_name
            }
            return ctx.wizard.next()
        }

        if (ctx.wizard.state.data.whatEditing === 'resume' && fileUploaded.mime_type === 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf') {

            if (ctx.message.document.file_name) {
                ctx.wizard.state.data.quizResume = ctx.message.document.file_name
            }

            ctx.wizard.state.data.fileValidation = true

            console.log('edits_on_quizAbout_on_document - ' + ctx.wizard.cursor)
            await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
            await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
            await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
            await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
            await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
            await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
            await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
            await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
            await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Завершить и отправить', 'sendData')],
                [Markup.button.callback('Редактировать', 'edits')]
            ]))
            await ctx.wizard.selectStep(10)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizAbout.action('back_on_about', async (ctx) => {
    ctx.deleteMessage()

    console.log('quizAbout_on_back_on_about - ' + ctx.wizard.cursor)

    try {
        if (ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'back_on_cv')],
            ]))
            await ctx.wizard.selectStep(7)
        } else {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'backToEdits')],
            ]))
            await ctx.wizard.selectStep(7)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})
quizGetFile.action('forward_on_about', async (ctx) => {
    ctx.deleteMessage()

    console.log('quizGetFile_on_forward - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizAbout = 'missed'

    let contact

    try {

        if (ctx.wizard.state.data.quizType === 'mobile') {
            contact = ctx.wizard.state.data.quizContactMobile
        }
        if (ctx.wizard.state.data.quizType === 'email') {
            contact = ctx.wizard.state.data.quizContactEmail
        }
        if (ctx.wizard.state.data.quizType === 'telegram') {
            contact = `@${ctx.wizard.state.data.quizContactTelegram}`
        }

        ctx.wizard.state.data.contact = contact

        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
        await ctx.wizard.selectStep(10)
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})
quizGetFile.action('back_on_about', async (ctx) => {
    ctx.deleteMessage()

    console.log('quizGetFile_on_back - ' + ctx.wizard.cursor)

    try {
        if (ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'back_on_cv')],
            ]))
            await ctx.wizard.selectStep(7)
        } else {
            await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
                [Markup.button.callback('Ссылкой', 'add_cv_link')],
                [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

                [Markup.button.callback('⬅ Назад', 'backToEdits')],
            ]))
            await ctx.wizard.selectStep(7)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})



quizGetFile.on('document', async (ctx) => {
    await ctx.deleteMessage()

    console.log('quizGetFile_document - ' + ctx.wizard.cursor)

    const fileUploaded = ctx.message.document

    try {
        if (fileUploaded.mime_type !== 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf') {
            await ctx.deleteMessage(ctx.message.message_id-1)
            await ctx.replyWithHTML('<b>Загрузите резюме в формате .pdf</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_about')]
            ]))
            ctx.wizard.selectStep(8)
        }

        if (ctx.wizard.state.data.quizCV === 'cv_link') {
            await ctx.deleteMessage(ctx.message.message_id-1)
            await ctx.replyWithHTML('<b>Вы выбрали метод загрузки Резюме по ссылке</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Вернуться к выбору метода', 'back_on_about')]
            ]))
            ctx.wizard.selectStep(8)
        }

        if (fileUploaded.mime_type === 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf' && ctx.wizard.state.data.whatEditing !== 'resume') {
            await ctx.replyWithHTML('<b>Расскажи о себе (опционально)</b>', Markup.inlineKeyboard([
                [Markup.button.callback('⬅ Назад', 'back_on_about')],
                [Markup.button.callback('➡ Пропустить', 'forward_on_about')]
            ]))
            if (ctx.message.document.file_name) {
                ctx.wizard.state.data.quizResume = ctx.message.document.file_name
            }

            ctx.wizard.state.data.fileValidation = true

            ctx.wizard.selectStep(9)
        }

        if (ctx.wizard.state.data.whatEditing === 'resume' && fileUploaded.mime_type === 'application/pdf' && ctx.wizard.state.data.quizCV === 'cv_pdf') {

            if (ctx.message.document.file_name) {
                ctx.wizard.state.data.quizResume = ctx.message.document.file_name
            }

            ctx.wizard.state.data.fileValidation = true

            console.log('edits_on_quizAbout_on_document - ' + ctx.wizard.cursor)
            await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
            await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
            await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
            await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
            await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
            await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
            await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
            await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
            await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
                [Markup.button.callback('Завершить и отправить', 'sendData')],
                [Markup.button.callback('Редактировать', 'edits')]
            ]))
            await ctx.wizard.selectStep(10)
        }
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizGetFile.on('text', async (ctx) => {
    await ctx.deleteMessage()
    ctx.deleteMessage(ctx.message.message_id-1)
    console.log('quizGetFile_text - ' + ctx.wizard.cursor)
    let contact

    try {
        if (ctx.wizard.state.data.quizType === 'mobile') {
            contact = ctx.wizard.state.data.quizContactMobile
        }
        if (ctx.wizard.state.data.quizType === 'email') {
            contact = ctx.wizard.state.data.quizContactEmail
        }
        if (ctx.wizard.state.data.quizType === 'telegram') {
            contact = `@${ctx.wizard.state.data.quizContactTelegram}`
        }

        if (ctx.wizard.state.data.whatEditing === 'contact') {
            if (ctx.wizard.state.data.quizType === 'telegram') {
                ctx.wizard.state.data.contact = `@${ctx.message.text}`
            } else {
                ctx.wizard.state.data.contact = ctx.message.text
            }
        } else {
            ctx.wizard.state.data.quizAbout = ctx.message.text
            ctx.wizard.state.data.contact = contact
        }

        await ctx.replyWithHTML(`<i>Проверьте данные и подтвердите отправку</i>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizSendData.action('forward_on_about', async (ctx) => {
    ctx.deleteMessage()

    console.log('quizGetFile_on_forward - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizAbout = 'missed'

    let contact

    try {

        if (ctx.wizard.state.data.quizType === 'mobile') {
            contact = ctx.wizard.state.data.quizContactMobile
        }
        if (ctx.wizard.state.data.quizType === 'email') {
            contact = ctx.wizard.state.data.quizContactEmail
        }
        if (ctx.wizard.state.data.quizType === 'telegram') {
            contact = `@${ctx.wizard.state.data.quizContactTelegram}`
        }

        ctx.wizard.state.data.contact = contact

        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
        await ctx.wizard.selectStep(10)
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizSendData.on('text', async (ctx) => {
    ctx.deleteMessage()
})


// EDITS

quizSendData.action('edits', async (ctx) => {
    await ctx.deleteMessage()
    ctx.wizard.state.data.whatEditing = {}
    console.log('edits - ' + ctx.wizard.cursor)
    ctx.replyWithHTML('<b>Что редактируем?</b>', Markup.inlineKeyboard([
        [Markup.button.callback(`Имя: ${ctx.wizard.state.data.quizName}`, 'editName')],
        [Markup.button.callback(`Контакт: ${ctx.wizard.state.data.contact}`, 'editContact')],
        [Markup.button.callback(`Специализация: ${ctx.wizard.state.data.subcategoryText}`, 'editCategory')],
        [Markup.button.callback(`Местоположение: ${ctx.wizard.state.data.quizLocation}`, 'editLocation')],
        [Markup.button.callback(`Готовы к переезду?: ${ctx.wizard.state.data.quizReadyRelocate}`, 'editReadyRelocate')],
        [Markup.button.callback(`Резюме или Портфолио: ${ctx.wizard.state.data.quizResume}`, 'editResume')],
        [Markup.button.callback(`О себе: ${ctx.wizard.state.data.quizAbout}`, 'editAbout')],

        [Markup.button.callback('⬅ Назад', 'back_send_data')]
    ]))
    return ctx.wizard.next()
})


quizEdit.action('back_send_data', async (ctx) => {
    await ctx.deleteMessage()

    console.log('back_on_edits - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }

    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizEdit.action('editName', async (ctx) => {
    await ctx.deleteMessage()

    ctx.wizard.state.data.whatEditing = 'name'
    try {
        await ctx.replyWithHTML('<b>Твоё имя?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `backToEdits`)]
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizEdit.action('editContact', async (ctx) => {
    await ctx.deleteMessage()
    console.log('editContact - ' + ctx.wizard.cursor)
    ctx.wizard.state.data.whatEditing = 'contact'

    try {
        await ctx.replyWithHTML(`\r\n\r\n<b>Как с тобой можно связаться?</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Mobile', 'contact_mobile')],
            [Markup.button.callback('Email', 'contact_email')],
            [Markup.button.callback('Telegram', 'contact_telegram')],

            [Markup.button.callback('⬅ Назад', 'backToEdits')]
        ]))
    } catch (e) {
        console.error(e)
    }

    ctx.wizard.selectStep(3)
    return ctx.wizard.next()
})

quizEdit.action('editCategory', async (ctx) => {
    await ctx.deleteMessage()

    ctx.wizard.state.data.whatEditing = 'category'
    console.log('edit_on_category - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML('<b>Какая специализация вас интересует?</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Data Science & Analytics', 'data_science')],
                [Markup.button.callback('Design & Creative', 'design')],
                [Markup.button.callback('IT & Networking', 'it')],
                [Markup.button.callback('Web, Mobile & Software Dev', 'software')],

                [Markup.button.callback('⬅ Назад', 'edits')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }

    ctx.wizard.selectStep(0)
    return ctx.wizard.next()
})

quizEdit.action('editLocation', async (ctx) => {
    ctx.deleteMessage()

    ctx.wizard.state.data.whatEditing = 'location'

    try {
        await ctx.replyWithHTML('<b>Какое твоё текущее местоположение?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `backToEdits`)]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizEdit.action('editReadyRelocate', async (ctx) => {
    await ctx.deleteMessage()

    console.log('edit_on_ReadyRelocate - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.whatEditing = 'relocate'

    try {
        await ctx.replyWithHTML('<b>Готов(а) ли ты переехать?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Да', 'relocate_yes')],
            [Markup.button.callback('Нет', 'relocate_no')],
            [Markup.button.callback('Не уверен(а)', 'relocate_not_sure')],

            [Markup.button.callback('⬅ Назад', 'backToEdits')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.wizard.next()
})

quizEdit.action('editResume', async (ctx) => {
    await ctx.deleteMessage()

    console.log('editResume')

    ctx.wizard.state.data.whatEditing = 'resume'

    try {
        await ctx.replyWithHTML('Пожалуйста, прикрепи свое резюме или портфолио', Markup.inlineKeyboard([
            [Markup.button.callback('Ссылкой', 'add_cv_link')],
            [Markup.button.callback('В формате .pdf', 'add_cv_pdf')],

            [Markup.button.callback('⬅ Назад', 'backToEdits')],
        ]))
    } catch (e) {
        console.error(e)
    }

    ctx.wizard.selectStep(7)
    return ctx.wizard.next()
})

quizEdit.action('editAbout', async (ctx) => {
    ctx.deleteMessage()

    ctx.wizard.state.data.whatEditing = 'about'

    try {
        await ctx.replyWithHTML('<b>Расскажи о себе (опционально)</b>', Markup.inlineKeyboard([
            [Markup.button.callback('⬅ Назад', `backToEdits`)],
        ]))
    } catch (e) {
        console.error(e)
    }
    return ctx.wizard.next()
})

quizEdit.action(/sub_+/, async (ctx) => {
    await ctx.deleteMessage()

    console.log('here_after_editing_category')

    let subcategory = ctx.match.input.substring(4)
    let btnTextArray = ctx.update.callback_query.message.reply_markup.inline_keyboard
    let btnText

    for (let key in btnTextArray) {
        let btnArray = []
        btnArray = btnTextArray[key]
        for (let number in btnArray) {
            let textId = btnArray[number].callback_data
            if (textId.substring(4) === subcategory) {
                btnText = btnArray[number].text
            }
        }
    }
    console.log('quizGetFile_action_sub - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.subcategory = subcategory
    ctx.wizard.state.data.subcategoryText = btnText

    try {
        await ctx.replyWithHTML(`<i>Проверьте данные и подтвердите отправку</i>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizEdit.action('custom_category', async (ctx) => {
    console.log('action_sendCategory - ' + ctx.wizard.cursor)
    await ctx.replyWithHTML('Ведите вашу специальность', Markup.inlineKeyboard([
        [Markup.button.callback('⬅ Назад', `backToEdits`)]
    ]))
    await ctx.wizard.selectStep(11)
    return ctx.wizard.next()
})

quizEdit.on('text', async (ctx) => {
    await ctx.deleteMessage()

    console.log('quizEdit on text - ' + ctx.wizard.cursor)

    ctx.wizard.state.data.subcategory = `sub_${ctx.message.text}`
    ctx.wizard.state.data.subcategoryText = ctx.message.text

    try {
        await ctx.replyWithHTML(`<i>Проверьте данные и подтвердите отправку</i>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizBackOnEdits.action('backToEdits', async (ctx) => {
    console.log('back_to_edits - ' + ctx.wizard.cursor)
    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }
    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizBackOnEdits.on('text', async (ctx) => {
    await ctx.deleteMessage()
    console.log('quizBackOnEdits - ' + ctx.wizard.cursor)
    try {
        if (ctx.wizard.state.data.whatEditing === 'name') {
            ctx.wizard.state.data.quizName = ctx.message.text
        }
        if (ctx.wizard.state.data.whatEditing === 'location') {
            ctx.wizard.state.data.quizLocation = ctx.message.text
        }
        if (ctx.wizard.state.data.whatEditing === 'about') {
            ctx.wizard.state.data.quizAbout = ctx.message.text
        }

        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))

    } catch (e) {
        console.error(e)
    }

    ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

quizBackOnEdits.action(/relocate_+/, async (ctx) => {
    ctx.deleteMessage()

    console.log('backonedits_relocate' + ctx.wizard.cursor)

    ctx.wizard.state.data.quizReadyRelocate = ctx.match.input.substring(9)

    try {
        await ctx.replyWithHTML(`<b>Проверьте данные и подтвердите отправку</b>\r\n\r\n`)
        await ctx.replyWithHTML(`<b>Имя: </b>${ctx.wizard.state.data.quizName}\r\n`)
        await ctx.replyWithHTML(`<b>Контакт: </b>${ctx.wizard.state.data.contact}\r\n`)
        await ctx.replyWithHTML(`<b>Специализация: </b>${ctx.wizard.state.data.subcategoryText}\r\n`)
        await ctx.replyWithHTML(`<b>Местоположение: </b>${ctx.wizard.state.data.quizLocation}\r\n`)
        await ctx.replyWithHTML(`<b>Готовы к переезду?: </b>${ctx.wizard.state.data.quizReadyRelocate}\r\n`)
        await ctx.replyWithHTML(`<b>Резюме или Портфолио: </b>${ctx.wizard.state.data.quizResume}\r\n`)
        await ctx.replyWithHTML(`<b>О себе: </b>${ctx.wizard.state.data.quizAbout}\r\n`)
        await ctx.replyWithHTML(`<b>Подтвердите отправку</b>`, Markup.inlineKeyboard([
            [Markup.button.callback('Завершить и отправить', 'sendData')],
            [Markup.button.callback('Редактировать', 'edits')]
        ]))
    } catch (e) {
        console.error(e)
    }

    await ctx.wizard.selectStep(10)
    return ctx.wizard.next()
})

// /EDITS

quizSendData.action('sendData', async (ctx) => {
    console.log('quizSendData - ' + ctx.wizard.cursor)
    await ctx.deleteMessage()
    console.log(ctx.wizard.state.data)
    try {
        let query="INSERT INTO users(chat_id, telegram_first_name, telegram_last_name, telegram_id, chosen_category, name, contact, location, relocation, cv_type, cv ,about) VALUES (?)";
        let values = [
            encodeURI(ctx.wizard.state.data.chatId),
            encodeURI(ctx.wizard.state.data.first_name),
            encodeURI(ctx.wizard.state.data.last_name),
            encodeURI(ctx.wizard.state.data.username),
            encodeURI(ctx.wizard.state.data.subcategory),
            encodeURI(ctx.wizard.state.data.quizName),
            encodeURI(ctx.wizard.state.data.contact),
            encodeURI(ctx.wizard.state.data.quizLocation),
            encodeURI(ctx.wizard.state.data.quizReadyRelocate),
            encodeURI(ctx.wizard.state.data.quizCV),
            encodeURI(ctx.wizard.state.data.quizResume),
            encodeURI(ctx.wizard.state.data.quizAbout),
        ]
        await pool.query(query, ([values]), (err, result, field) => {
            console.log(err);
            console.log(result);
            console.log(field);
        });
        await ctx.replyWithHTML('<b>Данные успешно отправлены!</b>')
        await ctx.replyWithHTML('<i>Меню</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Отправить заявку', 'start_quiz')],
            [Markup.button.callback('О Hubbler', 'about'), Markup.button.callback('Сообщения', 'messages')]
        ]))
    } catch (e) {
        console.error(e)
    }

    return ctx.scene.leave()
})


// chooseCategory.action('ux_ui_category', async (ctx) => {
//
//     let category = 'UX/UI designer'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите резюме</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     console.log('category - ' + ctx.wizard.cursor)
//     ctx.wizard.state.data.chooseCategory = 'ux_ui_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//
//     return ctx.wizard.next()
// })
// chooseCategory.action('3d_designer_category', async (ctx) => {
//     let category = '3D designer'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = '3d_designer_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = '3d_designer_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = '3d_designer_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     ctx.wizard.state.data.chooseCategory = '3d_designer_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.next()
// })
// chooseCategory.action('frontend_category', async (ctx) => {
//
//     let category = 'Frontend developer'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = 'frontend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'frontend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'frontend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     ctx.wizard.state.data.chooseCategory = 'frontend_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.next()
// })
// chooseCategory.action('backend_category', async (ctx) => {
//
//     let category = 'Backend developer'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = 'backend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'backend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'backend_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     ctx.wizard.state.data.chooseCategory = 'backend_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.next()
// })
// chooseCategory.action('qa_category', async (ctx) => {
//
//     let category = 'QA software'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = 'qa_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'qa_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'qa_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     ctx.wizard.state.data.chooseCategory = 'qa_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.next()
// })
// chooseCategory.action('marketing_category', async (ctx) => {
//
//     let category = 'Marketing & PR'
//
//     if (ctx.wizard.state.data.quizFio && !ctx.wizard.state.data.quizEmail) {
//         ctx.wizard.state.data.chooseCategory = 'marketing_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_fio')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//         return ctx.wizard.selectStep(4)
//     }
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'marketing_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.chooseCategory = 'marketing_category'
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ])
//         )
//         await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     ctx.wizard.state.data.chooseCategory = 'marketing_category'
//
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_category')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.next()
// })

// quizFio.on('text', async (ctx) => {
//
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
//
//     if (ctx.wizard.state.data.quizEmail && !ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.quizFio = ctx.message.text
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_email')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//         return ctx.wizard.selectStep(5)
//     }
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.quizFio = ctx.message.text
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     console.log('fio - ' + ctx.wizard.cursor)
//     ctx.wizard.state.data.quizFio = ctx.message.text
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_fio')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш email</b>`)
//     return ctx.wizard.next()
// })

// quizEmail.on('text', async (ctx) => {
//     console.log(ctx.message.text)
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
//
//     if (ctx.wizard.state.data.quizPhone) {
//         ctx.wizard.state.data.quizEmail = ctx.message.text
//         await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n`, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Редактировать', 'edit_on_phone')],
//             ]),
//         )
//         await ctx.replyWithHTML(`\r\n\r\n<b>Загрузите Ваше резюме</b>`)
//         return ctx.wizard.selectStep(6)
//     }
//
//     console.log('email - ' + ctx.wizard.cursor)
//
//     ctx.wizard.state.data.quizEmail = ctx.message.text
//     await ctx.replyWithHTML(`<i>Выбрана категория: ${category}</i>\r\n<i>Ваше ФИО: ${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_email')],
//         ]),
//     )
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш телефон</b>`)
//     return ctx.wizard.next()
// })

// quizPhone.on('text', async (ctx) => {
//
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
//     ctx.wizard.state.data.quizPhone = ctx.message.text
//     await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>`, Markup.inlineKeyboard(
//         [
//             [Markup.button.callback('Редактировать', 'edit_on_phone')],
//         ])
//     )
//
//     console.log(ctx.wizard.state.data)
//     await ctx.replyWithHTML(`<b>Загрузите Ваше резюме</b>`)
//     return ctx.wizard.next()
// })

// quizCV.on('text', async (ctx) => {
//
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     await ctx.reply('Загрузите резюме в формате .pdf')
// })
//
// quizCV.on('document', async (ctx) => {
//
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     let category = categoryFormat(ctx.wizard.state.data.chooseCategory)
//     ctx.wizard.state.data.quizCV = ctx.message.document.file_name
//     const fileUploaded = ctx.message.document
//     if (fileUploaded.mime_type !== 'application/pdf') {
//         await ctx.reply('Загрузите резюме в формате .pdf')
//     } else {
//         await ctx.replyWithHTML(`<i>Выбрана категория: </i><i>${category}</i>\r\n<i>Ваше ФИО: </i><i>${ctx.wizard.state.data.quizFio}</i>\r\n<i>Ваш email: </i><i>${ctx.wizard.state.data.quizEmail}</i>\r\n<i>Ваш телефон: </i><i>${ctx.wizard.state.data.quizPhone}</i>\r\n<i>Ваше резюме загружено. Название файла: </i><i>${ctx.wizard.state.data.quizCV}</i>\r\n\r\n<b>Расскажите о себе</b>`)
//         return ctx.wizard.next()
//     }
// })
//
// quizAbout.on('text', async (ctx) => {
//
//     if (ctx.message.text === '/menu') {
//         return ctx.scene.enter('quiz')
//     }
//
//     ctx.wizard.state.data.quizComment = ctx.message.text
//     console.log(ctx.wizard.state.data)
//     try {
//         let query="INSERT INTO users(chat_id, telegram_first_name, telegram_last_name, telegram_id, chosen_category, full_name, email, phone, cv_link, comment) VALUES (?)";
//         let values = [
//             encodeURI(ctx.message.chat.id),
//             encodeURI(ctx.from.first_name),
//             encodeURI(ctx.from.last_name),
//             encodeURI(ctx.from.username),
//             encodeURI(ctx.wizard.state.data.chooseCategory),
//             encodeURI(ctx.wizard.state.data.quizFio),
//             encodeURI(ctx.wizard.state.data.quizEmail),
//             encodeURI(ctx.wizard.state.data.quizPhone),
//             encodeURI(ctx.wizard.state.data.quizCV),
//             encodeURI(ctx.wizard.state.data.quizComment),
//
//         ]
//         pool.query(query, ([values]), (err, result, field) => {
//             console.log(err);
//             console.log(result);
//             console.log(field);
//         });
//     } catch (e) {
//         console.error(e)
//     }
//     await ctx.replyWithHTML(`Спасибо! \r\n\r\n<b>Ваши данные отправлены</b>\r\nМы свяжемся с Вами сразу после обработки данных`)
//     return ctx.scene.leave()
// })

// QUIZ EDITS
//
// quizFio.action('edit_on_category', async (ctx) => {
//     await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
//         [Markup.button.callback('Категорию', 'edit_category_on_fio')],
//     ]))
// })
//
// quizEmail.action('edit_on_fio', async (ctx) => {
//     await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
//         [Markup.button.callback('Категорию', 'edit_category_on_email')],
//         [Markup.button.callback('ФИО', 'edit_fio_on_email')],
//     ]))
// })
// quizPhone.action('edit_on_email', async (ctx) => {
//     await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
//         [Markup.button.callback('Категорию', 'edit_category_on_phone')],
//         [Markup.button.callback('ФИО', 'edit_fio_on_phone')],
//         [Markup.button.callback('Email', 'edit_email_on_phone')],
//
//     ]))
// })
//
// quizCV.action('edit_on_phone', async (ctx) => {
//     await ctx.replyWithHTML(`<b>Что редактируем?</b>`, Markup.inlineKeyboard([
//         [Markup.button.callback('Категорию', 'edit_category_on_cv')],
//         [Markup.button.callback('ФИО', 'edit_fio_on_cv')],
//         [Markup.button.callback('Email', 'edit_email_on_cv')],
//         [Markup.button.callback('Phone', 'edit_phone_on_cv')],
//     ]))
// })
//
// // Edit actions
// quizFio.action('edit_category_on_fio', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
//                 [Markup.button.callback('3D designer', '3d_designer_category')],
//                 [Markup.button.callback('Frontend developer', 'frontend_category')],
//                 [Markup.button.callback('Backend developer', 'backend_category')],
//                 [Markup.button.callback('QA software', 'qa_category')],
//                 [Markup.button.callback('Marketing & PR', 'marketing_category')],
//             ]
//         ))
//         return ctx.wizard.selectStep(2)
//     } catch(e) {
//         console.error(e)
//     }
// })
//
// quizEmail.action('edit_category_on_email', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
//                 [Markup.button.callback('3D designer', '3d_designer_category')],
//                 [Markup.button.callback('Frontend developer', 'frontend_category')],
//                 [Markup.button.callback('Backend developer', 'backend_category')],
//                 [Markup.button.callback('QA software', 'qa_category')],
//                 [Markup.button.callback('Marketing & PR', 'marketing_category')],
//             ]
//         ))
//         return ctx.wizard.selectStep(2)
//     } catch(e) {
//         console.error(e)
//     }
// })
// quizEmail.action('edit_fio_on_email', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.selectStep(3)
// })
//
// quizPhone.action('edit_category_on_phone', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
//                 [Markup.button.callback('3D designer', '3d_designer_category')],
//                 [Markup.button.callback('Frontend developer', 'frontend_category')],
//                 [Markup.button.callback('Backend developer', 'backend_category')],
//                 [Markup.button.callback('QA software', 'qa_category')],
//                 [Markup.button.callback('Marketing & PR', 'marketing_category')],
//             ]
//         ))
//         return ctx.wizard.selectStep(2)
//     } catch(e) {
//         console.error(e)
//     }
// })
// quizPhone.action('edit_fio_on_phone', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.selectStep(3)
// })
// quizPhone.action('edit_email_on_phone', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Email</b>`)
//     return ctx.wizard.selectStep(4)
// })
//
//
// quizCV.action('edit_category_on_cv', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Выберите категорию</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('UX/UI designer', 'ux_ui_category')],
//                 [Markup.button.callback('3D designer', '3d_designer_category')],
//                 [Markup.button.callback('Frontend developer', 'frontend_category')],
//                 [Markup.button.callback('Backend developer', 'backend_category')],
//                 [Markup.button.callback('QA software', 'qa_category')],
//                 [Markup.button.callback('Marketing & PR', 'marketing_category')],
//             ]
//         ))
//         return ctx.wizard.selectStep(2)
//     } catch(e) {
//         console.error(e)
//     }
// })
// quizCV.action('edit_fio_on_cv', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваше ФИО</b>`)
//     return ctx.wizard.selectStep(3)
// })
// quizCV.action('edit_email_on_cv', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Email</b>`)
//     return ctx.wizard.selectStep(4)
// })
// quizCV.action('edit_phone_on_cv', async (ctx) => {
//     await ctx.replyWithHTML(`\r\n\r\n<b>Введите Ваш Phone</b>`)
//     return ctx.wizard.selectStep(5)
// })
// /EDITS

const menuScene = new Scenes.WizardScene('personalData', categoryList, choseSubCategory, quizFio, quizEmail, quizPhone, quizLocation, quizReadyRelocate, quizCV, quizFile, quizAbout, quizGetFile, quizSendData, quizEdit, quizBackOnEdits)

const stage = new Scenes.Stage([menuScene])

bot.use(session())
bot.use(stage.middleware())

bot.action('start_quiz', async (ctx) => {
    return ctx.scene.enter('personalData');
});

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))