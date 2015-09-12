var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = (function () {
  var store = {};

  return {
    get: function (name) {
      return store[name];
    },
    set: function (name, value) {
      store[name] = value;
    },
  }
})();

config.set('globals', {
  'process.env': {
    NODE_ENV: process.env.NODE_ENV,
  },
  __DEV__: process.env.NODE_ENV === 'development',
  __PROD__: process.env.NODE_ENV === 'production',
});

config.set('server.host', 'localhost');
config.set('server.port', process.env.PORT || '8080');

config.set('root.path', path.resolve(__dirname, '../'));

config.set('project.path', path.resolve(config.get('root.path'), 'src'));

const resolve = {
  project: path.resolve.bind(path, config.get('project.path')),
  root: path.resolve.bind(path, config.get('root.path')),
};
config.set('project.server.entry', resolve.project('application'));
config.set('project.server.output', resolve.root('build', 'server'));
config.set('project.client.entry', resolve.project('module'));
config.set('project.client.output', resolve.root('build', 'client'));
config.set('project.views.path', resolve.project('views'));

config.set('nodemon.script', path.resolve(config.get('project.server.output'), 'application.js'));

config.set('webpack.port', '3030');
config.set('webpack.public_path', 'http://' + config.get('server.host') + ':' + config.get('webpack.port') + '/');
config.set('webpack.alias', [
  'assets',
  'stores',
  'actions',
  'components',
  'reducers',
  'views',
]);

module.exports = config;
