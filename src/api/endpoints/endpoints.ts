import {Application} from 'express';
import {initUserEndpoints} from './users/user-endpoints';

export function initEndpoints(app: Application): void {
  initUserEndpoints(app);
}
