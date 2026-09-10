import { Card, CardContent } from '@/components/ui/card';
import { SalesMetric } from '@/types/sales';
import { formatRupiah, formatPersen } from '@/utils/formatters';
import { CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  data: SalesMetric[];
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  // 1. Total realisasi kunjungan
  const totalRealisasi = data.reduce((acc, curr) => acc + curr.kunjungan_realisasi, 0);

  // 2. Rata-rata efektivitas visit tim (%)
  const avgEfektivitas =
    data.length > 0
      ? Math.round(data.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) / data.length)
      : 0;

  // 3. Akumulasi total nilai order (Rp)
  const totalOrder = data.reduce((acc, curr) => acc + curr.total_order_rp, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Card 1: Total Realisasi Kunjungan */}
      <Card className="border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-xs">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Kunjungan Hari Ini</span>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-slate-900">{totalRealisasi}</div>
            <p className="mt-1 text-[11px] text-slate-500">Outlet selesai dikunjungi di lapangan</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Rata-rata Efektivitas */}
      <Card className="border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-xs">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Rata-rata Efektivitas</span>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {formatPersen(avgEfektivitas)}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Realisasi terhadap target rute tim</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Total Nilai Order */}
      <Card className="border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-xs sm:col-span-2 lg:col-span-1">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Nilai Order</span>
            <div className="rounded-xl border border-violet-100 bg-violet-50 p-2.5 text-violet-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {formatRupiah(totalOrder)}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Akumulasi pesanan taking order tercatat</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}