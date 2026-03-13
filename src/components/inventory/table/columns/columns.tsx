'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductProps } from '@/core/domain/Product/product.types';

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: 'name',
    header: 'product',
  },
  {
    accessorKey: 'roast',
    header: 'roast',
    cell: ({ row }) => {
      const roast = row.getValue('roast') as string;
      return (
        <Badge variant="outline" className="capitalize">
          {roast}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'stockQuantity',
    header: 'stock',
    cell: ({ row }) => {
      const stockQuantity = row.getValue('stockQuantity') as number;
      const min = row.original.minimumStockQuantity;
      const unit = row.original.unit;
      return (
        <span
          className={stockQuantity <= min ? 'text-destructive font-bold' : ''}
        >
          {stockQuantity} {unit}
        </span>
      );
    },
  },
  {
    accessorKey: 'priceInCents',
    header: 'price',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('priceInCents')) / 100;
      return (
        <span>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'actions',
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            -
          </Button>
          <Button variant="outline" size="sm">
            +
          </Button>
        </div>
      );
    },
  },
];
