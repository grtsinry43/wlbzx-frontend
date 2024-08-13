// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@nuxt/ui"],
    compatibilityDate: "2024-08-13",
    nitro: {
        devProxy: {
            "/api": {
                target: "http://localhost:8080", // 这里是接口地址
                changeOrigin: true,
            },
        },
    }

})
