import {Application} from 'express';
import {initAuthEndpoints} from './auth/auth-endpoints';
import {initChallengeEndpoints} from './challenges/challenge-endpoints';
import {initCommentEndpoints} from './comments/comment-endpoints';
import {initFollowingEndpoints} from './followings/following-endpoints';
import {initLikeEndpoints} from './likes/like-endpoints';
import {initMilestoneEndpoints} from './milestones/milestone-endpoints';
import {initSubscriptionEndpoints} from './subscriptions/like-endpoints';
import {initUserEndpoints} from './users/user-endpoints';

export function initEndpoints(app: Application): void {
  initAuthEndpoints(app);
  initUserEndpoints(app);
  initChallengeEndpoints(app);
  initMilestoneEndpoints(app);
  initCommentEndpoints(app);
  initLikeEndpoints(app);
  initFollowingEndpoints(app);
  initSubscriptionEndpoints(app);
  //TODO add images
  //TODO add some kind of feed
}
