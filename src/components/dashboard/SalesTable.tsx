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
import { Search, MapPin } from 'lucide-react';

interface SalesTableProps {
    data: SalesMetric[];
}

export default function SalesTable({ data }: SalesTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState('ALL');

    // Ambil daftar area unik secara dinamis dari dataset
    const uniqueAreas = useMemo(() => {
        return Array.from(new Set(data.map((item) => item.area)));
    }, [data]);

    // Filter data berdasarkan input nama dan dropdown area
    const filteredSales = useMemo(() => {
        return data.filter((item) => {
            const matchName = item.nama_sales.toLowerCase().includes(searchQuery.toLowerCase().trim());
            const matchArea = selectedArea === 'ALL' || item.area === selectedArea;
            return matchName && matchArea;
        });
    }, [data, searchQuery, selectedArea]);

    return (
        <div className="space-y-4 rounded-xl border bg-white p-4 shadow-xs">
            {/* Bagian Atas: Search Bar & Filter Dropdown */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Cari nama salesman..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 text-sm"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <MapPin className="h-4 w-4 text-slate-400 hidden sm:block" />
                    <Select
                        value={selectedArea}
                        onValueChange={(val) => setSelectedArea(val ?? 'ALL')}
                    >
                        <SelectTrigger className="w-full sm:w-[180px] text-sm">
                            <SelectValue placeholder="Pilih Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Wilayah</SelectItem>
                            {uniqueAreas.map((area) => (
                                <SelectItem key={area} value={area}>
                                    {area}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Bagian Tabel Data */}
            <div className="overflow-x-auto rounded-lg border">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-700">Nama Salesman</TableHead>
                            <TableHead className="font-semibold text-slate-700">Wilayah Kerja</TableHead>
                            <TableHead className="text-center font-semibold text-slate-700">Target Visit</TableHead>
                            <TableHead className="text-center font-semibold text-slate-700">Realisasi</TableHead>
                            <TableHead className="text-center font-semibold text-slate-700">Efektivitas</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700">Total Order</TableHead>
                            <TableHead className="text-center font-semibold text-slate-700">Order OOS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sales) => (
                                <TableRow key={sales.nama_sales}>
                                    <TableCell className="font-medium text-slate-900">
                                        {sales.nama_sales}
                                    </TableCell>
                                    <TableCell className="text-slate-600">{sales.area}</TableCell>
                                    <TableCell className="text-center text-slate-600">
                                        {sales.kunjungan_planned}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold text-slate-900">
                                        {sales.kunjungan_realisasi}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant={
                                                sales.efektivitas_visit_persen >= 80
                                                    ? 'default'
                                                    : sales.efektivitas_visit_persen >= 70
                                                        ? 'secondary'
                                                        : 'destructive'
                                            }
                                            className="text-xs font-semibold"
                                        >
                                            {formatPersen(sales.efektivitas_visit_persen)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-slate-900">
                                        {formatRupiah(sales.total_order_rp)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {sales.jumlah_order_oos > 0 ? (
                                            <span className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                                                {sales.jumlah_order_oos} item
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400">0</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-28 text-center text-slate-500">
                                    Data salesman tidak ditemukan dengan filter saat ini.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}