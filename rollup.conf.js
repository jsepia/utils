import buble from 'rollup-plugin-buble'

export default {
  plugins: [buble()],
  input: 'lib/index.js',
  output: [
    {
      file: 'dist/jsepia-utils.amd.js',
      format: 'amd'
    },
    {
      file: 'dist/jsepia-utils.commonjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/jsepia-utils.es2015.js',
      format: 'es'
    },
    {
      file: 'dist/jsepia-utils.js',
      format: 'iife',
      name: 'Utils'
    },
    {
      file: 'dist/jsepia-utils.umd.js',
      format: 'umd',
      name: 'Utils'
    }
  ]
}