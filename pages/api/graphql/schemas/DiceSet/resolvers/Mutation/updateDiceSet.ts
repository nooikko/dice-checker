import { logger } from '$helpers-server';
import { MutationUpdateDiceSetArgs, ResolverFn } from '$types';
import { DiceSet } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const updateDiceSet: ResolverFn<MutationUpdateDiceSetArgs, Promise<DiceSet>> = async (_, { input }, { prisma, unpackedToken }) => {
  try {
    const { id, ...rest } = input;

    const set = await prisma.diceSet.findFirst({
      where: {
        id,
        ownerId: unpackedToken.id,
      },
    });

    if (!set) {
      throw new ApolloError('Unauthorized', '401');
    }

    const updatedSet = await prisma.diceSet.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return updatedSet;
  } catch (error) {
    logger.error('updateDiceSet', error);
    throw new ApolloError('An error occurred updating dice set with name');
  }
};
