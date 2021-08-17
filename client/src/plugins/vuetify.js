import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import th from 'vuetify/lib/locale/th';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#4A41FF',
                secondary: '#A9BCFD33',
                accent: '#FD6641',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background: "#F7F8FB",
            },
            dark: {
                primary: '#4A41FF',
                secondary: '#00000033',
                accent: '#FD6641',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                surface: "#2F3236",
                background: "#1C1E20",
            },
        },
    },
    lang: {
        locales: { th },
        current: 'th',
    },
    icons: {
        iconfont: 'md',
    },
});