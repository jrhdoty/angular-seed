module.exports = {
  compile_dir: 'bin',

  dist: {
    dir: 'public/dist',
    index: 'public/index.html',
    styles: 'public/dist/styles/**.*css',
    app:'public/dist/app.js'
  },

  src: {
    js: [
      'public/modules/**/*.module.js',
      'public/modules/**/*.js',
      '!public/modules/**/*.spec.js',
      'public/app.js'
      ],

    jsunit: ['public/**/*.spec.js'],
    
    styles: [
      'public/**/*.styl'
    ]
  }
};   
