import json from 'rollup-plugin-json'

export default {
  input: 'src/stacker.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node'
  },
  plugins: [
    json()
  ]
}
