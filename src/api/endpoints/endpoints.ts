import {Application} from 'express';
import {initAuthEndpoints} from './auth/auth-endpoints';
import {initChallengeEndpoints} from './challenges/challenge-endpoints';
import {initCommentEndpoints} from './comments/comment-endpoints';
import {initMilestoneEndpoints} from './milestones/milestone-endpoints';
import {initUserEndpoints} from './users/user-endpoints';

export function initEndpoints(app: Application): void {
  initAuthEndpoints(app);
  initUserEndpoints(app);
  initChallengeEndpoints(app);
  initMilestoneEndpoints(app);
  initCommentEndpoints(app);
}
