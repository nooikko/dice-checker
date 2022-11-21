import { logger } from '$helpers-client';
import { ResolverFnWithParent } from '$types';
import { DiceSet, User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const ownedSets: ResolverFnWithParent<User, unknown, Promise<DiceSet[]>> = async (parent, _args, { prisma }) => {
  try {
    const sets = await prisma.diceSet.findMany({
      where: {
        ownerId: parent.id,
      },
    });
    return sets;
  } catch (error) {
    logger.error('ownedSets', error);
    throw new ApolloError('Error getting owned sets');
  }
};
