'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SalesMetric } from '@/types/sales';

interface PerformanceChartProps {
  data: SalesMetric[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = data.map((item) => ({
    name: item.nama_sales.split(' ')[0], // Ambil nama depan untuk sumbu X
    fullName: item.nama_sales,
    area: item.area,
    efektivitas: item.efektivitas_visit_persen,
    planned: item.kunjungan_planned,
    realisasi: item.kunjungan_realisasi,
  }));

  return (
    <Card className="border-slate-200 bg-white shadow-xs">
      <CardHeader className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900">
            Perbandingan Efektivitas Kunjungan
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-0.5">
            Persentase realisasi kunjungan terhadap rute rencana harian (%)
          </CardDescription>
        </div>

        {/* Indikator Legenda Ambang Batas */}
        <div className="flex items-center gap-3 text-[11px] text-slate-600 self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-600" />
            <span>&ge; 80% (Optimal)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-amber-500" />
            <span>&lt; 70% (Perhatian)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 12, left: -24, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    const isOptimal = item.efektivitas >= 80;

                    return (
                      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs space-y-1.5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-bold text-slate-900">{item.fullName}</p>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                            {item.area}
                          </span>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <p className={`font-semibold ${isOptimal ? 'text-blue-600' : 'text-amber-600'}`}>
                          Efektivitas: {item.efektivitas}%
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Realisasi: <strong className="text-slate-700">{item.realisasi}</strong> dari target {item.planned} visit
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="efektivitas" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.efektivitas >= 80 ? '#2563eb' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}