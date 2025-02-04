import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: 'resources/icon',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: 'resources/icon.ico',
      setupExe: 'Rotion-Setup.exe',
      iconUrl:
        'https://lh3.googleusercontent.com/fife/ALs6j_HjsG7j18NBrybyVioPq581OuVsGeLOcE_wv_tbz9Zk7lHlGeN9wzAJNKwd8xu3-BGpWcGN0-t6XLMR0ycMMAeYsMRNKlJ_gayB0Pi-oWAsLMx9-QXPvgZj3smZh4tnNddXHfNX_fJG1Jy6fJ1fA4zxPdwgyTRHNnejDYvhhL5zzq9zKDSdirLmCXh9NOSnjBu7HDskOSFIu49gFY3wHP4I5Xsr9X41GlWDksV2OE3nek85cV3FBGr5l6h4uN61KlKi58PXRekXdT_5dH0xjqztG0_a6BGI3IHMh4JhSGrTHRD3N6vCXSWwr7QXDmSIfo0fU3zCQWQA_LmpoYDWMbFOrXxC_7bI9OLSBKodskCJpIcRrV7usdzepo9RY6lksbDRFLi5G8Qy-fMIQ7lWndqW2N7vy85954EHP_hIuFTEG32AkYS0CBrrw8XtAVUjEa278GeCg9HNQd2NZ0t75dkO7TRkMDe2QGI7BqxfTiWdg35V9c4xm97tqybGJjF87lhOeTEd5bNHMphgUwbJsLdHS4D8tMn-hxjLC8wzHTiQOHRSGDXGt5ZJVNLRUu7bLm42a9hjR9jp1crUcUNUf2FeVnlNsd4WA93xPrlEx9RhLE_yh1EsB2JDGZbUl0_ZopVr6-rKV3tiCBgccu4eaBbjX3Ga2Sd0jU11rpsjkCUpLBynlZtbJCoycRgFxcTW3Di1Tbn7Dtga_vzCOVPUb_vNNvkMq-bWw3NvcON0gYtGax1YiuMewvx7saxzLp4M7ZB2b1Cy2bfRP-WWmamSS03HKvkzbMfT1lhsEEKswL2WAv4OueUTc4Yd_p3xufDUInfebpvxBnfPOmn9IWgLNNDnNJ3LKHLnXFpSG1fbHdn7HQMCuns7yy_Rhv0H7qMeCHLv_FebwZ8ISl5csa7wFF-pwFeLLCpWRnCHhBhLdATUKV54TAXTlY_Ctq9AHGY0HkFsEHUKVMXk_y71ieHkQ6GhuTWloD9PlduGNQZALh48ZI3gfRR6sR3q9Ts1UEBFtzlPkSeWKrQr9M30vQBUyJsO0jksdomMtZr_TS7EbStE1VM6Tt0mEM0qvoJ6dp7_qV2-fyvVuxlLj5Wf2faysYcvYUjA-g_HiYkt_oZtqzmya4dBaKK0mUdlYbeEhmQmJC2I5mRHTawPI_R3PIEyK0fE9yyJhXxAnD4WyjEEAROFx-5sFX1Br1zpklqxgGUZTDMWst1e4XzviiEnbHCx321vYioeMVoJakncgvyjCUPT4As8nzaTH71QugS_XQpscTYnQiny3LEKy1Lni7-yQozSz-6KCBqO3E6qzyqajB9mmZglQwF9wPU06dR17_H-vC8p8bSwWEFO-LZ56n3Zuz8SGEQbL4e89spdHPD_WGX8UVI0EOPa9S6namZrHkzpGWWRVoiQVBfUpqz69qB3pf4a6D6oN2sbMlvMrYGDahswWBpqZspes578HoQmNbpJq034UINzccz-UCwXP_7KWykBzTB1okeg33SowzjKRdvxOqSTrS-KU9Wwr2kBqsGr0gxApdNza0ub46x7ipZY-Uuspd0V6j5vnN0d5NfufCdb7qj056pYzaRk4iqvEU0kRNDANsjwnnbjF59tGupjWIj00iHgb0SeKYMvt3_3pc6abDiB2vesLVpDKTAMYrPUZcfXCbFxkOlcXUNUarvOt9nx6XosUsTt6ofOpIsb7LRAt_AZtyrdY9Ss6f8B=w1868-h890',
      remoteToken: process.env.GH_TOKEN,
      exe: 'Rotion.exe',
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({
      options: {
        icon: 'resources/icon.png',
      },
    }),
    new MakerDeb({
      options: {
        icon: 'resources/icon.png',
      },
    }),
    new MakerDMG({
      icon: 'resources/icon.icns',
    }),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer/index.html',
            js: './src/renderer/index.ts',
            name: 'main_window',
            preload: {
              js: './src/preload/index.ts',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'angelopedroso',
          name: 'Notepad-Electron',
        },
        authToken: process.env.GH_TOKEN,
      },
    },
  ],
}

export default config
