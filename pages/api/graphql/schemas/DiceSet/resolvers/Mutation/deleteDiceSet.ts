import { logger } from '$helpers-server';
import { MutationDeleteDiceSetArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteDiceSet: ResolverFn<MutationDeleteDiceSetArgs, Promise<boolean>> = async (_, { id }, { prisma, unpackedToken }) => {
  try {
    const set = await prisma.diceSet.findFirst({
      where: {
        id: id,
        ownerId: unpackedToken.id,
      },
    });

    if (!set) {
      throw new ApolloError('Unauthorized', '401');
    }

    await prisma.diceSet.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteDiceSet', error);
    throw new ApolloError('An error occurred deleting dice set with name');
  }
};
