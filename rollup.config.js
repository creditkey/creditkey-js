import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 */`;

// Custom CSS injection function that doesn't require external dependencies
const cssInjection = (cssVariableName) => `
(function() {
  if (typeof document === 'undefined') return;
  var css = ${cssVariableName};
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
})();
`;

const baseConfig = {
  input: 'src/index.js',
  external: ['bulma'],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: false,
      inject: cssInjection,
      minimize: true,
      sourceMap: false
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not dead']
          },
          modules: false
        }]
      ]
    })
  ]
};

export default [
  // ES module build
  {
    ...baseConfig,
    output: {
      dir: 'es',
      format: 'es',
      banner,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true
    }
  },
  // CommonJS build
  {
    ...baseConfig,
    output: {
      dir: 'lib',
      format: 'cjs',
      banner,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      exports: 'auto'
    }
  },
  // UMD build (minified)
  {
    ...baseConfig,
    output: {
      file: 'umd/creditkey-js.min.js',
      format: 'umd',
      name: 'ck',
      banner,
      sourcemap: true,
      exports: 'default'
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        format: {
          comments: /^!/
        }
      })
    ]
  }
];

