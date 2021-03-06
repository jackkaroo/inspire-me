import dotenv from 'dotenv';
import {app} from './api/app';

dotenv.config();

const port = process.env.APPLICATION_PORT;

app.listen(port, () => {
  console.log('Server listening at port %d', port);
});
