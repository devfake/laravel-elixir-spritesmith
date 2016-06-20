var gulp = require('gulp');
var elixir = require('laravel-elixir');
var spritesmith = require('gulp.spritesmith');
var _ = require('underscore');

var Task = elixir.Task;

elixir.extend('spritesmith', function(src, options) {

  options = options || {};
  var spritesmithOptions = options;
  var elixirConfig = this.config;

  var config = {
    src: src || elixirConfig.assetsPath + '/img/sprites',
    imgOutput: options.imgOutput || 'public/assets/img',
    cssOutput: options.cssOutput || elixirConfig.css.outputFolder == 'css' ? 'resources/assets/css' : elixirConfig.css.outputFolder,

    cssFormat: options.cssFormat,
    imgName: options.imgName || 'sprite.png',
    cssName: options.cssName || 'sprite.css',
    imgPath: options.imgPath || '../img/sprite.png',

    cssVarMap: options.cssVarMap,
    retinaSrcFilter: options.retinaSrcFilter,
    retinaImgName: options.retinaImgName,
    retinaImgPath: options.retinaImgPath
  };

  config = _.extend(config, spritesmithOptions);

  new Task('sprite', function() {
    var sprite = gulp.src(config.src + '/**/*.png')
      .pipe(spritesmith(config));

    sprite.img.pipe(gulp.dest(config.imgOutput));
    sprite.css.pipe(gulp.dest(config.cssOutput));

    return sprite;
  })
  .watch(config.src + '/**/*.png');

});
