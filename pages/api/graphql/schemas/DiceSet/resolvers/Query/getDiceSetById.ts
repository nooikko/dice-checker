import { logger } from '$helpers-client';
import { ResolverFn, QueryGetDiceSetByIdArgs } from '$types';
import { DiceSet } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getDiceSetById: ResolverFn<QueryGetDiceSetByIdArgs, Promise<DiceSet>> = async (_parent, args, { prisma, unpackedToken }) => {
  try {
    const set = await prisma.diceSet.findFirst({
      where: {
        id: args.id,
      },
    });

    if (set.privacy === 'PRIVATE') {
      if (!unpackedToken) {
        throw new ApolloError('Unauthorized', '401');
      }

      const user = await prisma.user.findFirst({
        where: {
          id: unpackedToken.id,
        },
      });

      if (!user) {
        throw new ApolloError('Unauthorized', '401');
      }

      if (set.ownerId !== user.id) {
        throw new ApolloError('Unauthorized', '401');
      }
    }

    return set;
  } catch (error) {
    logger.error('getDiceSetById', error);
    throw new ApolloError('Error getting dice set');
  }
};
