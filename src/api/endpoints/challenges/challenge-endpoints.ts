import {Application} from 'express';
import {createChallengeHandler} from './create-challenge/handler';
import {getChallengeByIdHandler} from './get-challenge-by-id/handler';
import {getChallengesHandler} from './get-challenges/handler';

export function initChallengeEndpoints(app: Application): void {
  app.get('/challenges', getChallengesHandler);
  app.get('/challenges/:challengeId', getChallengeByIdHandler);
  app.post('/challenges', createChallengeHandler);
}
