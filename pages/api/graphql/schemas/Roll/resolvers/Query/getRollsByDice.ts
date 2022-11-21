import { logger } from '$helpers-server';
import { QueryGetRollsByDiceArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getRollsByDice: ResolverFn<QueryGetRollsByDiceArgs, Promise<Roll[]>> = async (_parent, { diceId }, { prisma, unpackedToken }) => {
  try {
    const diceSet = await prisma.dice
      .findFirst({
        where: {
          id: diceId,
        },
      })
      .diceSet();

    if (diceSet.privacy === 'PRIVATE' && unpackedToken?.id !== diceSet.ownerId) {
      throw new ApolloError('Unauthorized', '401');
    }

    const rolls = await prisma.dice
      .findFirst({
        where: {
          id: diceId,
        },
      })
      .rolls();

    return rolls;
  } catch (error) {
    logger.error('getRollsByDice', error);
    throw new ApolloError('Error getting rolls');
  }
};
