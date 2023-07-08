import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/meme.js',
    format: 'esm',
  },
  plugins: [image(), terser()],
};
