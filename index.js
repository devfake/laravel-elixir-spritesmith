var gulp = require('gulp'),
    elixir = require('laravel-elixir'),
    Notification = require('laravel-elixir/ingredients/helpers/Notification'),
    spritesmith = require('gulp.spritesmith'),
    _ = require('underscore');

elixir.extend('spritesmith', function(src, options) {

  var options = options || {};
  var spritesmithOptions = options;
  var elixirConfig = this;

  var config = {
    src: src || elixirConfig.assetsDir + '/img/sprites',
    imgOutput: options.imgOutput || 'public/assets/img',
    cssOutput: options.cssOutput || elixirConfig.cssOutput,

    cssFormat: options.cssFormat || 'css',
    imgName: options.imgName || 'sprite.png',
    cssName: options.cssName || 'sprite.css',
    imgPath: options.imgPath || '../img/sprite.png',
    cssOpts: options.cssOpts || { cssClass: function(item) { return '.sprite-' + item.name; }}
  };

  config = _.extend(config, spritesmithOptions);

  var onError = function(e) {
    new Notification().error(e, 'Failed!');
    this.emit('end');
  };

  gulp.task('sprite', function() {
    var sprite = gulp.src(config.src + '/*.png')
      .pipe(spritesmith(config))
      .on('error', onError);

    sprite.img.pipe(gulp.dest(config.imgOutput));
    sprite.css.pipe(gulp.dest(config.cssOutput));

    sprite.pipe(new Notification().message('Spritesmith Complete!'));

    return sprite;
  });

  this.registerWatcher('sprite', config.src + '/**/*.png');
  return this.queueTask('sprite');
});