import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {createMilestoneHandler} from './create-milestone/handler';
import {deleteMilestoneHandler} from './delete-milestone/handler';
import {getMilestoneByIdHandler} from './get-milestone-by-id/handler';
import {getMilestonesHandler} from './get-milestones/handler';
import {updateMilestoneHandler} from './update-milestone/handler';

const path = '/milestones';

export function initMilestoneEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getMilestonesHandler);
  app.get(`${path}/:id`, getMilestoneByIdHandler);
  app.post(path, createMilestoneHandler);
  app.patch(`${path}/:id`, updateMilestoneHandler);
  app.delete(`${path}/:id`, deleteMilestoneHandler);
}
