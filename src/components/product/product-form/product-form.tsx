'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newProductSchema, ProductInput } from '@/lib/schemas/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { formatCentsToCurrency, parseCurrencyToCents } from '@/lib/utils';
import { handleCreateProduct } from '@/app/actions/product-actions';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

export function ProductForm() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.id as string;
  const t = useTranslations('components.product');
  const [state, formAction, isPending] = useActionState(
    handleCreateProduct,
    undefined,
  );

  const form = useForm<ProductInput>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: '',
      roast: 'medium',
      priceInCents: 0,
      stockQuantity: 0,
      minimumStockQuantity: 0,
      unit: 'un',
    },
  });

  const onSubmit = (data: ProductInput) => {
    const formData = new FormData();
    formData.append('storeId', storeId);
    formData.append('name', data.name);
    formData.append('roast', data.roast);
    formData.append('priceInCents', data.priceInCents.toString());
    formData.append('stockQuantity', data.stockQuantity.toString());
    formData.append(
      'minimumStockQuantity',
      data.minimumStockQuantity.toString(),
    );
    formData.append('unit', data.unit);

    formAction(formData);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(t('productCreated'));
      router.push(`/stores/${storeId}/inventory`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, storeId]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('nameRequired') }]} />
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="roast"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="roast">{t('roastLevel')}</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue id="roast" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      {t('roastOptions.light')}
                    </SelectItem>
                    <SelectItem value="medium">
                      {t('roastOptions.medium')}
                    </SelectItem>
                    <SelectItem value="dark">
                      {t('roastOptions.dark')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="priceInCents"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">{t('price')}</FieldLabel>
                <Input
                  {...field}
                  id="price"
                  value={formatCentsToCurrency(field.value)}
                  onChange={(e) =>
                    field.onChange(parseCurrencyToCents(e.target.value))
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[{ message: t('priceRequired') }]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="stockQuantity"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="stock">{t('stock')}</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="stock"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </Field>
            )}
          />

          <Controller
            name="minimumStockQuantity"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="minStock">{t('minStock')}</FieldLabel>
                <Input
                  {...field}
                  id="minStock"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </Field>
            )}
          />

          <Controller
            name="unit"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="unit">{t('unit')}</FieldLabel>
                <Input {...field} id="unit" />
              </Field>
            )}
          />
        </div>

        <Field>
          {state?.error?.generic && (
            <div role="alert" className="text-destructive text-sm font-normal">
              {state.error.generic}
            </div>
          )}
          <Button type="submit" loading={isPending} className="w-full">
            {t('submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
