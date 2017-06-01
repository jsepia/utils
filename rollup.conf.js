import buble from 'rollup-plugin-buble'

export default {
  entry: 'lib/index.js',
  plugins: [buble()],
  targets: [
    {
      dest: 'dist/jsepia-util.amd.js',
      format: 'amd',
      moduleId: 'strange-item'
    },
    {
      dest: 'dist/jsepia-util.commonjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/jsepia-util.es2015.js',
      format: 'es'
    },
    {
      dest: 'dist/jsepia-util.js',
      format: 'iife',
      moduleName: 'Util'
    },
    {
      dest: 'dist/jsepia-util.umd.js',
      format: 'umd',
      moduleName: 'Util'
    }
  ]
}