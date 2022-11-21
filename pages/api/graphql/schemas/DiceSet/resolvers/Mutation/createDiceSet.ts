import { logger } from '$helpers-server';
import { MutationCreateDiceSetArgs, ResolverFn } from '$types';
import { DiceSet } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createDiceSet: ResolverFn<MutationCreateDiceSetArgs, Promise<DiceSet>> = async (_, { input }, { prisma, unpackedToken }) => {
  try {
    const newSet = await prisma.diceSet.create({
      data: {
        ...input,
        owner: {
          connect: {
            id: unpackedToken.id,
          },
        },
      },
    });

    return newSet;
  } catch (error) {
    logger.error('createDiceSet', error);
    throw new ApolloError('An error occurred creating dice set with name');
  }
};
