import Header from '@/components/layout/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import PerformanceChart from '@/components/charts/PerformanceChart';
import SalesTable from '@/components/dashboard/SalesTable';
import salesDataRaw from '@/data/salesMock.json';
import { SalesMetric } from '@/types/sales';

const salesData: SalesMetric[] = salesDataRaw;

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50/70">
            <Header />

            <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                Performa Salesman Harian
                            </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Monitoring rute kunjungan, nilai order, dan stok kosong (OOS) tim sales lapangan.
                        </p>
                    </div>


                </div>

                <SummaryCards data={salesData} />

                <PerformanceChart data={salesData} />

                <SalesTable data={salesData} />
            </main>
        </div>
    );
}