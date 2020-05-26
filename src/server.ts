import 'reflect-metadata';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import UploadConfig from './config/upload';
import errosApp from './middlewares/errosApp';
import './database';

const app = express();
app.use(cors());
app.use(json());
app.use('/files', express.static(UploadConfig.directory));

app.use(routes);
app.use(errosApp);

app.listen(3333, () => {
  console.log('O server subiu');
});
