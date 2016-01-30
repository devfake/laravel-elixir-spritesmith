# Laravel Elixir Spritesmith

This is a simple [Spritesmith](https://github.com/twolfson/gulp.spritesmith) wrapper for [Laravel Elixir](https://github.com/laravel/elixir).

## Install

Install this package over npm.

```sh
npm install laravel-elixir-spritesmith --save-dev
```

Require it in your `gulpfile.js` and use it.

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-spritesmith');

elixir(function(mix) {

  mix.spritesmith();

});
```

## How To

If you run `mix.spritesmith()` without parameters, it looks for all PNG-Files in `resources/assets/img/sprites` (folders included).

The output of the `sprite.css` file is in `resources/assets/css`. The output of your `sprite.png` is in `public/assets/img`. 

These are the default paths, they can be overwritten by `elixir.config.assetsPath` and `elixir.config.css.outputFolder` or by pass options. See the [config](https://github.com/laravel/elixir/blob/master/Config.js) file from elixir for more options.

## Options

```javascript
mix.spritesmith('src', {options});
```

##### Change Source

```javascript
mix.spritesmith('resources/assets/images');
```

##### Change Output

```javascript
mix.spritesmith(null, {
  imgOutput: 'public/images',
  cssOutput: 'public/styles'
});
```

By default, you can use your sprite images with the class `sprite-{itemname}`. Change them with `cssOpt`.

```javascript
mix.spritesmith(null, {
  cssVarMap: function (sprite) {
    sprite.name = 'MY-SPRITE-' + sprite.name;
  }
}
```

And you can use all other options from [Spritesmith](https://github.com/twolfson/gulp.spritesmith).
