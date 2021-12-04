import createHttpError from 'http-errors';
import {ContentType} from '@prisma/client';
import {logger} from '../logger/logger';
import {prisma} from './client';

export async function createContent(type: ContentType, client: any = prisma) {
  const content = await client.content.create({
    data: {
      type: type,
    },
  });

  logger.info(`Inserted content into DB. Id: ${content.id}`);

  return content;
}

export async function getContentById(id: number, client: any = prisma) {
  const content = await client.content.findUnique({
    where: {
      id: id,
    },
  });

  if (!content) {
    throw createHttpError(404, 'Content not found');
  }

  logger.info(`Fetched content. Id: ${content.id}`);

  return content;
}

export async function deleteContentById(id: number, client: any = prisma) {
  const deletionResult = await client.content.delete({
    where: {
      id,
    },
  });

  logger.info(deletionResult);
}
