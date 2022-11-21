import { logger } from '$helpers-server';
import { MutationCreateRollArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createRoll: ResolverFn<MutationCreateRollArgs, Promise<Roll>> = async (_parent, { input }, { prisma, unpackedToken }) => {
  try {
    const dice = await prisma.dice.findFirst({
      where: {
        id: input.diceId,
        userId: unpackedToken.id,
      },
    });

    if (!dice) {
      logger.error('createRoll', 'Dice not found');
      throw new ApolloError('Dice not found', 'DICE_NOT_FOUND');
    }

    const roll = await prisma.roll.create({
      data: {
        dice: {
          connect: {
            id: dice.id,
          },
        },
        result: input.result,
        user: {
          connect: {
            id: unpackedToken.id,
          },
        },
      },
    });

    return roll;
  } catch (error) {
    logger.error('createRoll', error);
    throw new ApolloError('Error creating roll');
  }
};
