const loadGruntTasks = require('load-grunt-tasks');
const timeGrunt = require('time-grunt');

module.exports = (grunt) => {
  // Load grunt tasks automatically
  loadGruntTasks(grunt);
  // Time how long tasks take. Can help when optimizing build times
  timeGrunt(grunt);

  const appConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.config.merge({
    appConfig,
    protractor: {
      options: {
        keepAlive: false,
        configFile: './protractor.conf.js',
        noColor: false
      },
      ifood: {
        options: {
          keepAlive: false,
          args: {
            baseUrl: '',
            params: {
              login: {
                user: 'fiaobot@gmail.com', // TODO take the login credentials from STDIN
                password: 'Fi@o1234'
              },
              envprod: false,
              dishComment: 'comentário do silvião',
              dishSize: 'TODAS AS SALADAS',
              dishOption: 'Ovos fritos',
              dishSideDish: 'Farofa',
              dishSalad: 'Alface'
            }
          }
        }
      }
    }
  });
};
