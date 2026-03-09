'use server';

import { auth } from '@/auth';
import { CreateProductUseCaseFactory } from '@/infra/factories/CreateProductUseCaseFactory';
import { newProductSchema } from '@/lib/schemas/product';
import { revalidatePath } from 'next/cache';

export async function handleCreateProduct(_: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: { generic: 'Unauthorized' } };
  }

  const storeId = formData.get('storeId') as string;

  if (!storeId) {
    return { error: { generic: 'Store ID is required' } };
  }

  const createProductUseCase =
    CreateProductUseCaseFactory.makeCreateProductUseCase();
  const logger = CreateProductUseCaseFactory.makeLogger();

  const rawData = {
    name: formData.get('name'),
    roast: formData.get('roast'),
    priceInCents: Number(formData.get('priceInCents')),
    stockQuantity: Number(formData.get('stockQuantity')),
    minimumStockQuantity: Number(formData.get('minimumStockQuantity')),
    unit: formData.get('unit'),
  };

  const validatedFields = newProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: { generic: 'Invalid fields. Please check your data.' },
    };
  }

  try {
    await createProductUseCase.execute({
      ...validatedFields.data,
      storeId,
    });
  } catch (error) {
    logger.error(
      handleCreateProduct.name,
      'Error in handleCreateProduct:',
      error,
    );

    return { error: { generic: 'Unknown error' } };
  }

  revalidatePath(`/stores/${storeId}/inventory`);

  return { success: true };
}
