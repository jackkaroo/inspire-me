import {Request, Response} from 'express';
import {sayGoodbye} from './logic';

export function sayGoodbyeHandler(req: Request, res: Response) {
  const name = req.query.name as string;

  const goodbye = sayGoodbye({name});

  res.send(goodbye);
}
