import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'build/app.js',
  dest: 'dist/app.js',
  moduleName: 'multiframer',
  format: 'cjs',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs()
  ]
};
