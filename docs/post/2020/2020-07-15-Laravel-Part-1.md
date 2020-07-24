---
title: Laravel 使用笔记（一）
date: 2020-07-15
sidebar: auto
---

## 全局安装laravel工具

    - `> php composer.phar global require laravel/installer`
    - `> laravel new project-name`

## 用命令直接新建工程

    `> php composer.phar create-project --prefer-dist laravel/laravel project-name`

## 增加laravel/ui模块并启用vue
    - `> php composer.phar require laravel/ui`
    - `> php artisan ui vue` 生成基本脚手架
    - `> php artisan ui vue --auth` 生成待登录注册的脚手架
    - `> npm install` 安装npm依赖
    - `> npm run dev` 编译
	
## 配置mysql
修改根目录.env文件
```properties
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kmall
DB_USERNAME=root
DB_PASSWORD=xxx
```

## 初始化项目数据库 
	- `> php artisan migrate`
	- `> php artisan migrate:refresh`
	

## element-ui
1. 安装依赖
`> npm install element-ui -S`
2. 修改resources/js/app.js
```js
// Element UI
+ import ElementUI from 'element-ui';
+ import 'element-ui/lib/theme-chalk/index.css';

+ Vue.use(ElementUI);
```
3. 应用，修改HelloComponent.vue
```html
+ <el-button type="success">Success</el-button>
```
4. 重新编译
```powershell
npm run dev && php artisan serve
```

## vue router
1. 安装npm依赖
 `> npm install vue-router -S`
2. 新建路由文件 resources/js/router/index.js
```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    saveScrollPosition: true,
    routes: [
        {
            name: 'hi',
            path: '/hi', 
            component: resolve => void(require(['../components/HelloComponent.vue'], resolve))
        }
    ]
});
```
3. 创建根模板 resources/js/App.vue
```html
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
```

3. vue 加载router resources/js/app.js
```js
+ import router from './router/index.js';

const app = new Vue({
    el: '#app',
+    router,
    render: h => h(App)
});
```

4. 访问测试
```powershell
npm run dev && php artisan serve
# /hello/#/hi
```

## vuex
1. 安装npm依赖
 `> npm install vuex -S`
2. 新建路由文件 resources/js/store/index.js
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'hi, vuex',
        ct: 1
    },
    // this.$store.commit('inc')
    mutations: {
        inc(state) {
            state.ct += 1;
        }
    },
    // this.$store.dispatch('aInc', {param: 1})
    actions: {
        aInc(ctx, payload) {
            setTimeout(() => {
                ctx.commit('inc', payload);
            }, 2000);
        }
    }
});
```
3. vue 加载vuex resources/js/app.js
```js
+ import store from './store/index.js';

const app = new Vue({
    el: '#app',
    router,
+    store,
    render: h => h(App)
});

```
4. 测试
```html
<template>
    <div>
        <p class="hello">{{ msg }}</p>
+        <p class="hello">{{ $store.state.name }} {{ $store.state.ct }}</p>
+        <el-button type="success" @click="add">Success</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'laravel with vue and element'
        }
    },
+    methods: {
+        add() {
+            this.$store.commit('inc');
+            // this.$store.dispatch('aInc',{});
+        }
+    }
}
</script>
```

## redis
1. 安装模块
```
php composer.phar require predis/predis
```
2. 配置
```
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

