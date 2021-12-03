import {Application} from 'express';
import {createMilestoneHandler} from './create-milestone/handler';
import {getMilestoneByIdHandler} from './get-milestone-by-id/handler';
import {getMilestonesHandler} from './get-milestones/handler';

const path = '/milestones';

export function initMilestoneEndpoints(app: Application): void {
  app.get(path, getMilestonesHandler);
  app.get(`${path}/:milestoneId`, getMilestoneByIdHandler);
  app.post(path, createMilestoneHandler);
}
