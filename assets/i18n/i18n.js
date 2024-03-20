import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入各种语言的翻译文件
import en from './en.json';
import zh from './zh.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
        en: { translation: en },
        zh: { translation: zh },
        },
        lng: 'zh', // 默认语言
        fallbackLng: 'zh', // 当当前语言没有找到翻译时，回退到这个语言
        interpolation: {
        escapeValue: false,
        },
    });

export default i18n;