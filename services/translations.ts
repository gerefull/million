import { Language } from '../types';

const translations = {
  en: {
    // Common
    appName: "TeleManager AI",
    loading: "Loading...",
    back: "Back",
    close: "Close",
    
    // Role Selection
    selectRole: "Select Your Role",
    roleAdvertiser: "Advertiser",
    roleAdvertiserDesc: "Buy ads in top channels",
    roleOwner: "Channel Owner",
    roleOwnerDesc: "Manage and monetize channel",

    // Onboarding
    connectBot: "Connect Channel",
    enterUsername: "Enter Channel Username",
    verifyBtn: "Verify Channel",
    verifying: "Verifying...",
    verified: "Verified",
    checkConn: "Check Connection",
    notFound: "Channel not found",
    step1: "Step 1 of 2",
    registering: "Registering in Database...",
    
    // Navigation
    navPosting: "Posting",
    navMarket: "Ads",
    navStats: "Stats",

    // Calendar
    calendarTitle: "Content Calendar",
    newPost: "New Post",
    noContent: "No content scheduled.",
    today: "Today",
    generateAi: "Generate with AI",
    manual: "Manual",
    schedule: "Schedule Post",
    createPost: "Create Post",
    topicLabel: "Topic / Keyword",
    topicPlaceholder: "e.g., Bitcoin price surge",
    contentLabel: "Post Content",
    contentPlaceholder: "Type or generate content...",
    generating: "Generating...",
    generateBtn: "Generate Post",

    // AI Settings
    aiSettings: "AI Configuration",
    toneLabel: "Tone",
    contextLabel: "Context / Key Details",
    contextPlaceholder: "Add specific facts, links, or details to include...",
    audienceLabel: "Target Audience",
    audiencePlaceholder: "e.g. Investors, Students...",
    postLangLabel: "Post Language",
    creativityLabel: "Creativity",
    
    // Tones
    toneProfessional: "Professional",
    toneCasual: "Casual",
    toneExcited: "Excited",
    toneHumorous: "Humorous",
    toneUrgent: "Urgent",

    // Stats
    statsTitle: "Channel Stats",
    perfReport: "Performance Report",
    totalSubs: "Total Subscribers",
    totalViews: "Total Views",
    growthTrend: "Growth Trend",
    engagement: "Engagement Rate",

    // Marketplace (Owner)
    adExchange: "Ad Exchange",
    buySlots: "Manage your slots",
    soldTo: "Sold to",
    available: "Available",
    
    // Advertiser Dashboard
    findChannels: "Find Channels",
    searchPlaceholder: "Search channels (@username)...",
    topChannels: "Top Channels",
    allCategories: "All Categories",
    subscribers: "Subs",
    viewSlots: "View Slots",
    buySlot: "Buy Slot",
    confirmPurchase: "Confirm Purchase",
    purchaseSuccess: "Purchase Successful!",
    views: "views",
    priceStars: "STARS",
    noChannels: "No channels found matching your criteria."
  },
  ru: {
    // Common
    appName: "TeleManager AI",
    loading: "Загрузка...",
    back: "Назад",
    close: "Закрыть",

    // Role Selection
    selectRole: "Выберите роль",
    roleAdvertiser: "Рекламодатель",
    roleAdvertiserDesc: "Покупка рекламы в каналах",
    roleOwner: "Владелец канала",
    roleOwnerDesc: "Управление и монетизация",

    // Onboarding
    connectBot: "Подключить канал",
    enterUsername: "Введите юзернейм канала",
    verifyBtn: "Проверить канал",
    verifying: "Проверка...",
    verified: "Подтверждено",
    checkConn: "Проверить связь",
    notFound: "Канал не найден",
    step1: "Шаг 1 из 2",
    registering: "Регистрация в базе...",

    // Navigation
    navPosting: "Посты",
    navMarket: "Биржа",
    navStats: "Статы",

    // Calendar
    calendarTitle: "Календарь контента",
    newPost: "Новый пост",
    noContent: "Нет запланированных постов.",
    today: "Сегодня",
    generateAi: "AI Генератор",
    manual: "Вручную",
    schedule: "Запланировать",
    createPost: "Создать пост",
    topicLabel: "Тема / Ключевое слово",
    topicPlaceholder: "напр., Рост биткоина",
    contentLabel: "Контент поста",
    contentPlaceholder: "Напишите или сгенерируйте...",
    generating: "Генерация...",
    generateBtn: "Сгенерировать",

    // AI Settings
    aiSettings: "Настройки AI",
    toneLabel: "Тон",
    contextLabel: "Контекст / Детали",
    contextPlaceholder: "Факты, ссылки или детали...",
    audienceLabel: "Целевая аудитория",
    audiencePlaceholder: "напр. Инвесторы, Студенты...",
    postLangLabel: "Язык поста",
    creativityLabel: "Креативность",

    // Tones
    toneProfessional: "Профессиональный",
    toneCasual: "Обычный",
    toneExcited: "Восторженный",
    toneHumorous: "Юмористический",
    toneUrgent: "Срочный",

    // Stats
    statsTitle: "Статистика канала",
    perfReport: "Отчет об эффективности",
    totalSubs: "Всего подписчиков",
    totalViews: "Всего просмотров",
    growthTrend: "Тренд роста",
    engagement: "Вовлеченность",

    // Marketplace (Owner)
    adExchange: "Биржа рекламы",
    buySlots: "Управление слотами",
    soldTo: "Купил",
    available: "Доступно",

    // Advertiser Dashboard
    findChannels: "Найти каналы",
    searchPlaceholder: "Поиск каналов (@username)...",
    topChannels: "Топ каналов",
    allCategories: "Все категории",
    subscribers: "Подп.",
    viewSlots: "Слоты",
    buySlot: "Купить",
    confirmPurchase: "Подтвердить покупку",
    purchaseSuccess: "Успешно куплено!",
    views: "просмотров",
    priceStars: "ЗВЕЗД",
    noChannels: "Каналы не найдены."
  }
};

export const t = (key: keyof typeof translations['en'], lang: Language): string => {
  return translations[lang][key] || key;
};