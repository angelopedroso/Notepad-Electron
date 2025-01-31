import type { Configuration } from 'webpack'

import { rules } from './webpack.rules'
import { plugins } from './webpack.plugins'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export const mainConfig: Configuration = {
  entry: './src/main/index.ts',
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [{ from: 'resources', to: 'icons' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
}
