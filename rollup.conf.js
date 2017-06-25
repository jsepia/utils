import buble from 'rollup-plugin-buble'

export default {
  entry: 'lib/index.js',
  plugins: [buble()],
  targets: [
    {
      dest: 'dist/jsepia-utils.amd.js',
      format: 'amd',
      moduleId: 'strange-item'
    },
    {
      dest: 'dist/jsepia-utils.commonjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/jsepia-utils.es2015.js',
      format: 'es'
    },
    {
      dest: 'dist/jsepia-utils.js',
      format: 'iife',
      moduleName: 'Utils'
    },
    {
      dest: 'dist/jsepia-utils.umd.js',
      format: 'umd',
      moduleName: 'Utils'
    }
  ]
}