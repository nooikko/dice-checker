import { logger } from '$helpers-server';
import { QueryGetDiceByIdArgs, ResolverFn } from '$types';
import { Dice } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getDiceById: ResolverFn<QueryGetDiceByIdArgs, Promise<Dice>> = async (_parent, { id }, { prisma, unpackedToken }) => {
  try {
    const dice = await prisma.dice.findFirst({
      where: {
        id,
      },
    });

    if (!dice) {
      throw new ApolloError('Dice not found', '404');
    }

    const diceSet = await prisma.diceSet.findFirst({
      where: {
        id: dice.diceSetId,
      },
    });

    if (diceSet.privacy === 'PRIVATE' && unpackedToken?.id !== diceSet.ownerId) {
      throw new ApolloError('Unauthorized', '401');
    }

    return dice;
  } catch (error) {
    logger.error('getDiceById', error);
    throw new ApolloError('Error getting dice');
  }
};
