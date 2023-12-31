import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import {defineConfig, loadEnv, ConfigEnv} from 'vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
    '@public': pathResolve('public'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};
const url = 'http://rtdp-gateway:9999';
// @ts-ignore
const viteConfig = defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd());
    return {
        plugins: [
            VueSetupExtend(),
            vue(),
            [
                {
                    libraryName: '@icon-park/vue-next',
                    libraryDirectory: 'es/icons',
                    camel2DashComponentName: false
                },
            ]
        ],
        root: process.cwd(),
        resolve: {alias},
        base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
        hmr: true,
        optimizeDeps: {
            include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
        },
        server: {
            host: '0.0.0.0',
            port: env.VITE_PORT as unknown as number,
            open: true,
            proxy: {
                '/api': {
                    target: url,
                    ws: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            outDir: 'dist',
            sourcemap: false,
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].${new Date().getTime()}.js`,
                    chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
                    assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
                    compact: true,
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'pinia'],
                        echarts: ['echarts'],
                    },
                },
            },
        },
        css: {
            postcss: {
                preprocessorOptions: {
                    css: {charset: false},
                    plugins: [
                        {
                            postcssPlugin: 'internal:charset-removal',
                            AtRule: {
                                charset: (atRule: any) => {
                                    if (atRule.name === 'charset') {
                                        atRule.remove();
                                    }
                                },
                            },
                        },
                    ],
                },
            },
            define: {
                __VUE_I18N_LEGACY_API__: JSON.stringify(false),
                __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
                __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
            },
        }
    }
});

export default viteConfig;
