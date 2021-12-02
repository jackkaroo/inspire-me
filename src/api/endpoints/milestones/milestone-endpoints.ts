import {Application} from 'express';
import {createMilestoneHandler} from './create-milestone/handler';
import {getMilestoneByIdHandler} from './get-milestone-by-id/handler';
import {getMilestonesHandler} from './get-milestones/handler';

export function initMilestoneEndpoints(app: Application): void {
  app.get('/milestones', getMilestonesHandler);
  app.get('/milestones/:milestoneId', getMilestoneByIdHandler);
  app.post('/milestones', createMilestoneHandler);
}
