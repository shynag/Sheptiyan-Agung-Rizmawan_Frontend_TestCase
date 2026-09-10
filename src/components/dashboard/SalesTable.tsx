'use client';

import { useState, useMemo } from 'react';
import { SalesMetric } from '@/types/sales';
import { formatRupiah, formatPersen } from '@/utils/formatters';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, AlertCircle } from 'lucide-react';

interface SalesTableProps {
  data: SalesMetric[];
}

export default function SalesTable({ data }: SalesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state untuk pencarian & filter area
  const filteredSales = useMemo(() => {
    return data.filter((item) => {
      const matchName = item.nama_sales.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchName;
    });
  }, [data, searchQuery]);

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Kontrol Filter & Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Cari Salesman"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-xs bg-slate-50/50 border-slate-200 focus-visible:bg-white"
          />
        </div>
      </div>

      {/* Tabel Data Sales */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-slate-700">Salesman</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">Wilayah</TableHead>
              <TableHead className="text-center text-xs font-semibold text-slate-700">
                Realisasi / Target
              </TableHead>
              <TableHead className="text-center text-xs font-semibold text-slate-700">
                Efektivitas
              </TableHead>
              <TableHead className="text-right text-xs font-semibold text-slate-700">
                Total Order
              </TableHead>
              <TableHead className="text-center text-xs font-semibold text-slate-700">
                Item OOS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sales) => {
                const initials = sales.nama_sales
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);

                const isOptimal = sales.efektivitas_visit_persen >= 80;
                const isModerate = sales.efektivitas_visit_persen >= 70;

                return (
                  <TableRow key={sales.nama_sales} className="border-b border-slate-100 hover:bg-slate-50/50">
                    {/* Nama & Avatar Inisial */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 border border-blue-100">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-xs leading-none">
                            {sales.nama_sales}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Wilayah */}
                    <TableCell className="text-xs text-slate-600">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                        {sales.area}
                      </span>
                    </TableCell>

                    {/* Realisasi vs Planned dengan Mini Progress Bar */}
                    <TableCell className="py-3 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-xs font-medium text-slate-700">
                          <strong className="text-slate-900">{sales.kunjungan_realisasi}</strong>
                          <span className="text-slate-400"> / {sales.kunjungan_planned} visit</span>
                        </span>
                        <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isOptimal ? 'bg-blue-600' : isModerate ? 'bg-sky-500' : 'bg-amber-500'
                            }`}
                            style={{
                              width: `${Math.min(sales.efektivitas_visit_persen, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    {/* Badge Efektivitas */}
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold border ${
                          isOptimal
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isModerate
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {formatPersen(sales.efektivitas_visit_persen)}
                      </Badge>
                    </TableCell>

                    {/* Total Order */}
                    <TableCell className="text-right text-xs font-semibold text-slate-900">
                      {formatRupiah(sales.total_order_rp)}
                    </TableCell>

                    {/* Status Order OOS */}
                    <TableCell className="text-center">
                      {sales.jumlah_order_oos > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-200">
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                          {sales.jumlah_order_oos} item
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center text-xs text-slate-500">
                  Data salesman tidak ditemukan dengan filter yang dipilih.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}