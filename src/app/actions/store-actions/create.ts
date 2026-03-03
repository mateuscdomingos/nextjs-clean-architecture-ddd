'use server';

import { auth } from '@/auth';
import { CreateStoreUseCaseFactory } from '@/infra/factories/CreateStoreUseCaseFactory';
import { newStoreSchema } from '@/lib/schemas/store';
import { revalidatePath } from 'next/cache';

export async function handleCreateStore(_: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: { generic: 'Unauthorized' } };
  }

  const userId = session.user.id;
  const createStoreUseCase = CreateStoreUseCaseFactory.makeCreateStoreUseCase();
  const logger = CreateStoreUseCaseFactory.makeLogger();

  const name = formData.get('name');
  const monthlyBudgetInCents = Number(formData.get('monthlyBudgetInCents'));

  const validatedFields = newStoreSchema.safeParse({
    name,
    monthlyBudgetInCents,
  });

  if (!validatedFields.success) {
    return {
      error: { generic: 'Invalid fields. Please check your data.' },
    };
  }

  try {
    await createStoreUseCase.execute({
      monthlyBudgetInCents: validatedFields.data.monthlyBudgetInCents,
      name: validatedFields.data.name,
      userId,
    });
  } catch (error) {
    logger.error(handleCreateStore.name, 'Error in handleRegister:', error);

    return { error: { generic: 'Unknown error' } };
  }

  revalidatePath('/stores');
  return { success: true };
}
