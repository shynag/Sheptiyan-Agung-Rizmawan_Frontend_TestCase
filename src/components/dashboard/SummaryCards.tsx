import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalesMetric } from '@/types/sales';
import { formatRupiah, formatPersen } from '@/utils/formatters';
import { CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  data: SalesMetric[];
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  // 1. Total realisasi kunjungan seluruh tim
  const totalRealisasi = data.reduce((acc, curr) => acc + curr.kunjungan_realisasi, 0);

  // 2. Rata-rata efektivitas kunjungan seluruh tim
  const avgEfektivitas = data.length > 0
    ? Math.round(data.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) / data.length)
    : 0;

  // 3. Akumulasi total nilai order yang tercatat
  const totalOrder = data.reduce((acc, curr) => acc + curr.total_order_rp, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Card 1: Total Realisasi Kunjungan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium text-slate-500">
            Total Kunjungan Hari Ini
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{totalRealisasi}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Outlet selesai dikunjungi di lapangan
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Rata-rata Efektivitas Tim */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium text-slate-500">
            Rata-rata Efektivitas
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">
            {formatPersen(avgEfektivitas)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Persentase realisasi terhadap rencana rute
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Total Nilai Order */}
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium text-slate-500">
            Total Nilai Order
          </CardTitle>
          <DollarSign className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">
            {formatRupiah(totalOrder)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Total nilai taking order berhasil dibuat
          </p>
        </CardContent>
      </Card>
    </div>
  );
}