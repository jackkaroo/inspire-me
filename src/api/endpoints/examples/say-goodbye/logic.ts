import createError from 'http-errors';

type Params = {
  name?: string;
};

export function sayGoodbye(params: Params): string {
  const {name} = params;

  if (!name) {
    throw createError(404, 'No name was passed to say goodbye');
  }

  return `Goodbye my friend: ${name}`;
}
