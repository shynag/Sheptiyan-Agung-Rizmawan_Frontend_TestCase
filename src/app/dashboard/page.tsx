import Header from '@/components/layout/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import PerformanceChart from '@/components/charts/PerformanceChart';
import SalesTable from '@/components/dashboard/SalesTable';
import salesDataRaw from '@/data/salesMock.json';
import { SalesMetric } from '@/types/sales';

const salesData: SalesMetric[] = salesDataRaw;

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Performa Salesman Harian
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring efektivitas kunjungan dan pencapaian target sales di lapangan.
          </p>
        </div>

        {/* 1. Baris Summary Cards */}
        <SummaryCards data={salesData} />

        {/* 2. Visualisasi Grafik Performa */}
        <PerformanceChart data={salesData} />

        {/* 3. Filter Bar & Tabel Performa Sales */}
        <SalesTable data={salesData} />
      </main>
    </div>
  );
}