import {Request, Response} from 'express';
import {sayHello} from './logic';

export function sayHelloHandler(req: Request, res: Response) {
  const hello = sayHello();

  res.send(hello);
}
