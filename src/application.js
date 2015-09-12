import compress from 'compression';
import engine from 'express-react-views';
import express from 'express';
import http from 'http';

import config from '../config';
import controllers from 'controllers/index';

const application = express();

export default application;


// View Engine comfiguration
application.set('view engine', 'jsx');
application.set('views', `./src/views`);
console.log(process.cwd());
application.engine('jsx', engine.createEngine());

// Application middlewares configration
application.use(compress());
console.log('public folder: ' + config.get('project.client.output'));
application.use(express.static('./' + config.get('project.client.output')));
application.use(controllers);

// Server part
const server = http.createServer(application);

server.on('listening', function () {
  const separator = new Array(81).join('=');

  /*eslint-disable quotes, no-console */

  console.log("%s\n", separator);
  console.log('Server launched.');
  console.log(
    "\nInformations:\n\tHostname: %s\n\tPort: %s\n",
    server.address().address,
    server.address().port
  );
  console.log(separator);

  /*eslint-enable quotes, no-console */
});

server.listen(config.get('server.port'), config.get('server.host'));
