export const EnvConf = {
    port: process?.env?.port,
    appName: process?.env?.appName,
    HOME_URL: process?.env?.HOME_URL,
    API_URL: process?.env?.API_URL,
    SEO_URL: process?.env?.SEO_URL,
    BOT_WEBSOCKET_URL: process?.env?.BOT_WEBSOCKET_URL,
    ASSETS_URL: process?.env?.ASSETS_URL,
    LAB_WEBSITE_URL: process?.env?.LAB_WEBSITE_URL,
    LAB_API_URL: process?.env?.LAB_API_URL,
    IMAGE_URL_PREFIX: `${process?.env?.ASSETS_URL}`,
}