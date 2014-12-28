var gulp   = require('gulp'),
    $      = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    server = require('./server.js'),
    stylus = require('gulp-stylus'),
    paths  = require('./build.config.js'),
    karma = require('karma').server;


gulp.task('styles', function() {
  gulp.src(paths.src.styles)
    .pipe(stylus())
    .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('lint', function(){
  return gulp.src(paths.src.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({message: 'Linting Done'}));
});

gulp.task('concat', function(){
  return gulp.src(paths.src.js)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('minify', function(){
  return gulp.src(paths.src.js)
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(paths.dist.dir));
});

//annotate dependencies so don't need explicit array syntax
gulp.task('preMin', ['minify'], function(){
  return gulp.src('./public/dist/app.min.js')
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(paths.dist.dir))
    .pipe($.notify({message: 'Min done'}));

});

gulp.task('uglify', ['preMin'], function(){
  return gulp.src('./public/dist/app.min.js')
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.dir))
    .pipe($.notify({message: 'Build Done'}));
});

gulp.task('inject', function(){
  //sources
  // var scripts = gulp.src(paths.src.js, {read:false});
  var scripts = gulp.src(paths.dist.app);
  var styles  = gulp.src(paths.dist.styles, {read:false});

  //target
  var target  = gulp.src(paths.dist.index);

  return target
  //inject js
  .pipe($.inject(scripts, {
    addRootSlash: false,
    ignorePath: 'public/dist',
    name:'scripts',
  }))

  //inject css
  .pipe($.inject(styles, {
    addRootSlash: false,
    ignorePath: 'public/dist',
    name: 'styles'
  }))

  //inject bower components
  .pipe($.inject(gulp.src(bowerFiles(), {read: false}), 
    {name: 'bower',
    ignorePath: 'public/lib',
  }))

  .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('watch', function(){
  gulp.watch(paths.src.js, ['lint']);
  gulp.watch(paths.src.styles, ['styles']);
  gulp.watch(paths.dist.index);
});

//run server for demo app and watch files
gulp.task('server', ['inject', 'watch'], function(){
  server.run();
});

//serve app and open in browser
gulp.task('serve', ['server'], function(){
  var options = {
    url: 'http://localhost:9000',
  };
  gulp.src('./public/dist/index.html')
    .pipe($.open('', options));
});

//run tests once
gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

//run tests on every file update
gulp.task('tdd', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
  }, done);
});

gulp.task('build', ['lint', 'concat', 'uglify', 'styles']);
gulp.task('default', ['build', 'watch']);