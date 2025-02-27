declare namespace NodeJS {
    interface ProcessEnv {
        BOT_API: string;
        OPENROUTER_API_KEY: string
        // Можно добавить другие переменные окружения, если нужно
    }
}