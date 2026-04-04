'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductProps } from '@/core/domain/Product/product.types';
import { Minus, Plus } from 'lucide-react';

interface ColumnProps {
  onUpdateStock: (productId: string, type: 'increment' | 'decrement') => void;
  isPending: boolean;
}

export const getColumns = ({
  onUpdateStock,
  isPending,
}: ColumnProps): ColumnDef<ProductProps>[] => [
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
      const amount = (row.getValue('priceInCents') as number) / 100;
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
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isPending || product.stockQuantity <= 0}
            onClick={() => onUpdateStock(product.id, 'decrement')}
          >
            <Minus size={14} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => onUpdateStock(product.id, 'increment')}
          >
            <Plus size={14} />
          </Button>
        </div>
      );
    },
  },
];
