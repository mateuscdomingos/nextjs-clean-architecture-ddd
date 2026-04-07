'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import { ProductProps } from '@/core/domain/Product/product.types';
import { handleUpdateStockQuantity } from '@/app/actions/product-actions/update-stock';
import { getColumns } from './columns';

interface InventoryTableProps {
  data: ProductProps[];
}

export function InventoryTable({ data }: InventoryTableProps) {
  const t = useTranslations('inventoryPage.table');
  const params = useParams();
  const storeId = params.id as string;
  const [isPending, startTransition] = useTransition();

  const handleUpdateStock = (
    productId: string,
    type: 'increment' | 'decrement',
  ) => {
    startTransition(async () => {
      await handleUpdateStockQuantity({
        productId,
        storeId,
        type,
      });
    });
  };

  const columns = getColumns({ onUpdateStock: handleUpdateStock, isPending });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const headerName = header.column.columnDef.header as
                  | 'product'
                  | 'roast'
                  | 'stock'
                  | 'price';
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(t(headerName), header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t('empty')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
