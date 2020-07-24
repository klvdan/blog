---
title: Laravel 使用笔记（二）i18n 配置
date: 2020-07-17
sidebar: auto
---

## 1. 配置Session
修改app/config/session.php中driver和connection两项
```php
{
    // 优先读取.env中SESSION_DRIVER配置项
    // driver类型: ["file", "cookie", "database", "apc",
    //             "memcached", "redis", "dynamodb", "array"]
    // 这里由于我们使用redis作为session存储，
    // 所以修改.env文件SESSION_DRIVER=redis
    'driver' => env('SESSION_DRIVER', 'file'),

    // 优先读取.env中SESSION_CONNECTION配置项
    // session详细连接配置项在app/config/database.config中redis配置项
    // 'redis' => [
    //	...
    //    'cache' => [
    //        'url' => env('REDIS_URL'),
    //        'host' => env('REDIS_HOST', '127.0.0.1'),
    //        'password' => env('REDIS_PASSWORD', null),
    //        'port' => env('REDIS_PORT', '6379'),
    //        'database' => env('REDIS_CACHE_DB', '1'),
    //    ],
    // ]
    // 这里使用cache配置
    'connection' => env('SESSION_CONNECTION', 'cache'),
}
```

## 2. 加载session中间件
修改app/Http/Kernel.php
```php
...
protected $middlewareGroups = [
  'web' => [
      \App\Http\Middleware\EncryptCookies::class,
      \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
+      \Illuminate\Session\Middleware\StartSession::class,
      // \Illuminate\Session\Middleware\AuthenticateSession::class,
+      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
      \App\Http\Middleware\VerifyCsrfToken::class,
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
      // Language
      \App\Http\Middleware\Languages::class,
   ],
   ...
]
```

## 3. 编写语言切换刷新session中间件
通过session中保存用户选择的语言信息,创建中间件app/Http/Middleware/Languages.php
```php
namespace App\Http\Middleware;

use Illuminate\Support\Facades\Log;
use Closure;
use Config;
use App;

class Languages
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->session()->has('locale')){
            App::setLocale($request->session()->get('locale'));
        } else {
            // 读取默认语言
            App::setLocale(Config::get('app.locale'));
        }
        return $next($request);
    }
}

```

## 4. 配置默认语言与备用语言
修改app/config/app.php
```php
// 默认
'locale' => 'zh',
// 备用
'fallback_locale' => 'en',
```

## 5. 增加语言包
在app/resources/lang目录下增加zh和ja目录
在en、zh、ja目录下新建messages.php文件
```php
return [
    'home_title' => 'Kelvin\'s Blog',
    ...
]
```

## 6. 编写语言切换控制器
新建app/Http/Controllers/UtilityController.php
```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App;

class UtilityController extends Controller
{
    public function changeLocale(Request $request) 
    {
        if ($request->ajax()) {
            $la = $request->all();
            App::setLocale($la['locale']);
            $request->session()->put('locale', $la['locale']);
        } 
        return response()->json([
            'result' => 'success'
        ]);
    }
}
```

## 7. 配置路由
修改app/routes/web.php
```php
Route::post('/locale', 'UtilityController@changeLocale');
```

## 8. Vue 语言切换组件
新建app/resources/js/components/LanguageComponent.vue
```vue
<template>
    <div>
        <li class="nav-item dropdown">
            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ lang }} <span class="caret"></span>
            </a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="javascript:void(0);" @click="onChangeLocale('zh')">
                    {{ zh }}
                </a>
                <a class="dropdown-item" href="javascript:void(0);" @click="onChangeLocale('en')">
                    {{ en }}
                </a>
                <a class="dropdown-item" href="javascript:void(0);" @click="onChangeLocale('ja')">
                    {{ ja }}
                </a>
            </div>
        </li>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'language',
    props: {
        langs: String
    },
    data() {
        return {
            lang: '',
            zh: '',
            en: '',
            ja: ''
        }
    },
    mounted(){
      var ls = this.langs.split(',');
      this.lang = ls[0];
      this.zh = ls[1];
      this.en = ls[2];
      this.ja = ls[3];
    },
    methods: {
        onChangeLocale(vv) {
            axios.post('/locale', {
                   'locale': vv
            }, {
                headers: {
                        // language=JQuery-CSS
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
            })
            .then(function (data) {
                window.location.reload();
            }).catch(function(err) {
                console.error(err);
            });
        }
    }
}
</script>
```

## 9. 注册组件
修改app/resources/js/app.js
```javascript
Vue.component('language', require('./components/LanguageComponent.vue').default);
```
编译
```shell
npm run dev
```

## 10. blade模板调用组件
调用当前语言包目录下的messages.php文件中的字段
```html
<language langs="{{ __('messages.locale') }},{{ __('messages.zh') }},{{ __('messages.en') }},{{ __('messages.ja') }}"/>
```