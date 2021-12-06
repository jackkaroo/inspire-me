import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {addSubscriptionHandler} from './create-subscription/handler';
import {deleteSubscriptionHandler} from './delete-subscription/handler';
import {getSubscriptionByIdHandler} from './get-subscription-by-id/handler';
import {getSubscriptionsHandler} from './get-subscriptions/handler';

const path = '/subscriptions';

export function initSubscriptionEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getSubscriptionsHandler);
  app.get(`${path}/:id`, getSubscriptionByIdHandler);
  app.post(path, addSubscriptionHandler);
  app.delete(`${path}/:id`, deleteSubscriptionHandler);
}
