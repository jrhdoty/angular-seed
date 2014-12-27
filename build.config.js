module.exports = {
  compile_dir: 'bin',

  dist: {
    dir: 'public/dist',
    index: 'public/index.html',
    styles: 'public/dist/styles'
  },

  src: {
    js: [
      'public/modules/**/*.module.js',
      'public/modules/**/*.js',
      '!public/modules/**/*.spec.js',
      'public/modules/ngEocities.js'
      ],

    jsunit: ['public/**/*.spec.js'],
    
    styles: [
      'public/**/*.styl'
    ]
  }
};   
