'use server';

import { auth } from '@/auth';
import { UpdateProductUseCaseFactory } from '@/infra/factories/UpdateProductUseCaseFactory';
import { newProductSchema } from '@/lib/schemas/product';
import { revalidatePath } from 'next/cache';

export async function handleUpdateProduct(_: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: { generic: 'Unauthorized' } };
  }

  const productId = formData.get('id') as string;
  const storeId = formData.get('storeId') as string;

  if (!productId || !storeId) {
    return { error: { generic: 'Product ID and Store ID are required' } };
  }

  const updateProductUseCase =
    UpdateProductUseCaseFactory.makeUpdateProductUseCase();
  const logger = UpdateProductUseCaseFactory.makeLogger();

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
    await updateProductUseCase.execute({
      ...validatedFields.data,
      id: productId,
      storeId,
    });
  } catch (error) {
    logger.error(
      handleUpdateProduct.name,
      `Error in handleUpdateProduct for ID ${productId}:`,
      error,
    );

    return {
      error: { generic: 'Unknown error' },
    };
  }

  revalidatePath(`/stores/${storeId}/inventory`);

  return { success: true };
}
