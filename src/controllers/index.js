import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = new Router();

export default router;

router.get('/', (request, response) => {
  response.render('index');
});

router.get('/songs/', (request, response) => {
  fs.readdir('medias', (error, files) => {
    if (error) {
      return response.end(JSON.stringify(error));
    }

    let songs = [];

    files.forEach(file => {
      fs.stat(file, (error, stat) => {
        console.log(stat);
        return stat.isDirectory();
      })
    });

    return response.end(JSON.stringify(stats));
  });
});
