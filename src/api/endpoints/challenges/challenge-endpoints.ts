import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {createChallengeHandler} from './create-challenge/handler';
import {deleteChallengeHandler} from './delete-challenge/handler';
import {getChallengeByIdHandler} from './get-challenge-by-id/handler';
import {getChallengesHandler} from './get-challenges/handler';
import {updateChallengeHandler} from './update-challenge/handler';

const path = '/challenges';

export function initChallengeEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getChallengesHandler);
  app.get(`${path}/:id`, getChallengeByIdHandler);
  app.post(path, createChallengeHandler);
  app.patch(`${path}/:id`, updateChallengeHandler);
  app.delete(`${path}/:id`, deleteChallengeHandler);
}
