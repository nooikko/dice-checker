import { logger } from '$helpers-server';
import { MutationCreateDiceArgs, ResolverFn } from '$types';
import { Dice } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createDice: ResolverFn<MutationCreateDiceArgs, Promise<Dice>> = async (_, { input }, { prisma, unpackedToken }) => {
  try {
    const diceSet = await prisma.diceSet.findFirst({
      where: {
        id: input.diceSetId,
        ownerId: unpackedToken.id,
      },
    });

    if (!diceSet) {
      throw new ApolloError('Unauthorized', '401');
    }

    const newDice = await prisma.dice.create({
      data: {
        diceSet: {
          connect: {
            id: input.diceSetId,
          },
        },
        name: input.name,
        sides: input.sides,
        user: {
          connect: {
            id: unpackedToken.id,
          },
        },
      },
    });

    return newDice;
  } catch (error) {
    logger.error('createDice', error);
    throw new ApolloError('An error occurred creating dice with name');
  }
};
