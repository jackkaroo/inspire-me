import {Application} from 'express';
import {loginHandler} from './login/handler';
import {registerHandler} from './register/handler';

export function initAuthEndpoints(app: Application): void {
  app.post('/register', registerHandler);
  app.post('/login', loginHandler);
}
