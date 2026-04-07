'use server';

import { auth } from '@/auth';
import { UpdateProductQuantityUseCaseFactory } from '@/infra/factories/UpdateProductQuantityUseCaseFactory';
import { revalidatePath } from 'next/cache';

interface UpdateStockProps {
  productId: string;
  storeId: string;
  type: 'increment' | 'decrement';
}

export async function handleUpdateStockQuantity({
  productId,
  storeId,
  type,
}: UpdateStockProps) {
  const session = await auth();

  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  const updateStockUseCase =
    UpdateProductQuantityUseCaseFactory.makeUpdateProductQuantityUseCase();
  const logger = UpdateProductQuantityUseCaseFactory.makeLogger();

  try {
    await updateStockUseCase.execute({
      productId,
      type,
    });

    revalidatePath(`/stores/${storeId}/inventory`);

    return { success: true };
  } catch (error) {
    logger.error(
      handleUpdateStockQuantity.name,
      `Error updating stock for product ${productId}:`,
      error,
    );

    return {
      error: { generic: 'Unknown error' },
    };
  }
}
