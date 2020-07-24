---
title: Vue 组件库环境搭建
date: 2020-07-12
sidebar: auto
---

::: tip
想搭建自己的组件库，在rollup和webpack之间选择了rollup
在vue和react之间先选择搭建vue的，之后再搭建react的
:::

## 1. Project structure
```
kui(root) - config
			 |- rollup.config.base.js
			 |- rollup.config.browser.js
			 |- rollup.config.es.js
			 |- rollup.config.umd.js
          - src
		     |- ui
			 |  |- list
			 |    |- index.js
			 |	  |- main.vue
			 |- index.js
		  - examples (vue ini webpack-simple examples)
		        |- src
				    |- ... 
				|- .babelrc
				|- index.html
				|- package.json
		  - .babelrc
		  - package.json
```

## 2. Create new project
```powershell
# create project directory
mkdir kui
cd kui
# initialize project
yarn init
# add rollup devDependencies
yarn add -D rollup @rollup/plugin-node-resolve 
                   @rollup/plugin-commonjs       # convert CommonJs to ES
				   @rollup/plugin-babel			 # babel converts ES to CommonJs/UMD/AMD/...
				   @babel/core
				   @babel/preset-env
				   rollup-plugin-vue@5.1.9		 # vue plugin don't use beta version 
				   vue-tempalte-compiler         # as its name
				   @vue/compiler-sfc   		     # vue 3.0 features, if without it,
												 # when compiles the .vue file, it goes error
				   rollup-plugin-css-only        # compile css/scss
				   rollup-plugin-postcss         # browser compatibility prefix
				   clean-css 					 # compress css file
				   rollup-plugin-terser		     # compress js file
				   cross-env					 # cross platform environment
# add rollup dependencies
yarn add vue                                     				   
```

## 3. Configure
- (root)/package.json
```json
...
"scripts": {
	"build": "npm run build:browser && npm run build:es && npm run build:umd",
	"build:browser": "node_modules/.bin/rollup -c config/rollup.config.browser.js",
	"build:es": "node_modules/.bin/rollup -c config/rollup.config.es.js",
	"build:umd": "node_modules/.bin/rollup -c config/rollup.config.umd.js",
	"dev": "cross-env NODE_ENV=development node_modules/.bin/rollup -c config/rollup.config.es.js -w",
}
...
```

- (root)/config/rollup.config.base.js
```javascript
import ResolvePlugin from '@rollup/plugin-node-resolve'
import CommonjsPlugin from '@rollup/plugin-commonjs'
import BabelPlugin from '@rollup/plugin-babel'
import VuePlugin from 'rollup-plugin-vue'
import CssPlugin from 'rollup-plugin-css-only'
import CleanCssPlugin from 'clean-css'
import { writeFileSync } from 'fs'
import PostcssPlugin from 'rollup-plugin-postcss'

// # common configurations here
export default {
  // # entry file
  input: 'src/index.js',
  plugins: [
    // # resolve .vue file
    ResolvePlugin({ extensions: ['.vue'] }),
	// # convert commonjs in node_modules to es modules
    CommonjsPlugin(),
	// # compile css/scss and minify the style, then write to file
    CssPlugin({
      output (style, styleNode) {
        writeFileSync('dist/kui.min.css', new CleanCssPlugin().minify(style).styles)
      }
    }),
	// # compile vue file, exclude css 
    VuePlugin({ css: false }),
	// # convert es to commonjs/amd/umd
    BabelPlugin({
      exclude: 'node_modules/**'
    }),
    PostcssPlugin({
      plugins: []
    })
  ]
}
```

- (root)/config/rollup.config.browser.js
```javascript
import TerserPlugin from 'rollup-plugin-terser'
import baseConfig from './rollup.config.base'

const config = Object.assign({}, baseConfig, {
  output: {
    exports: 'named',
    name: 'Kui',
    file: 'dist/kui.min.js',
    format: 'iife'
  }
})

config.plugins.push(TerserPlugin.terser())

export default config
```

- (root)/config/rollup.config.es.js
```javascript
import baseConfig from './rollup.config.base'

const config = Object.assign({}, baseConfig, {
  output: {
    name: 'Kui',
    file: 'dist/kui.esm.js',
    format: 'es'
  }
})

export default config
```

- (root)/config/rollup.config.umd.js
```javascript
import baseConfig from './rollup.config.base'

const config = Object.assign({}, baseConfig, {
  output: {
    exports: 'named',
    name: 'Kui',
    file: 'dist/kui.umd.js',
    format: 'umd'
  }
})

export default config
```

- (root)/package.json
```json
{
  "main": "dist/kui.umd.js",
  "module": "dist/kui.esm.js",
  "unpkg": "dist/kui.min.js",
}
```

- (root)/.babelrc
```json
{
    "presets": [
        [
            "@babel/env", {
              "targets": {
                "node": "4"
              }
            }
        ]
    ]
}
```

- (root)/src/ui/list/index.js
```javascript
import Main from './main'
export default Main
```

- (root)/src/ui/list/index.vue
```vue
<template>
    <div class="k-list">
        <slot />
        <div class="k-list-date">
            <div class="k-list-date-label">Current Time:</div>
            <div class="k-list-date-text">{{ date }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'KList',
  data () {
    return {
      date: new Date()
    }
  }
}
</script>

<style>
.k-list {
    width: 300px;
    margin: 0 auto;
}
</style>

<style lang="scss">
.k-list-date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .k-list-date-label {
        font-size: 12px;
        color: #999;
    }
    .k-list-date-text {
        font-size: 12px;
        color: #666;
    }
}
</style>

<style scoped>
.k-list-1 {
    background-color: #333;
}
</style>
```

- (root)/src/index.js
```javascript
import KList from './ui/list'

const components = [
  KList
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
```

## 4. examples
1. Create project
```powershell
npm i -g @vue/cli
vue init webpack-simple examples
```

2. Update package
```powershell
# replace babel packages
babel-core -> @babel/core
babel-preset-env -> @babel/preset-env
# update other packages
npm i -g npm-check
npm-check -u
# install some dependencies
yarn add -D webpack-cli
```

3. Configure
- (root)/examples/.babelrc
```json
{
  "presets": [
    ["@babel/env", { "modules": false }]
  ]
}
```

- (root)/examples/webpack.config.js
```javascript
+ const VueLoaderPlugin = require('vue-loader/lib/plugin')

  module.exports = {
   ...
+  optimization: {
+    minimize: true
+  },
+  plugins: [
+    new VueLoaderPlugin()
+  ]
  }

  if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
-     ...
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    ])
  }
```

4. Usage
```javascript
# (root)/examples/src/main.js
+  import Kui from '../../'
+  import '../../dist/kui.min.css'

+  Vue.use(Kui)

```

## 5. Run
```powershell
# root
yarn dev

# examples
yarn dev
```