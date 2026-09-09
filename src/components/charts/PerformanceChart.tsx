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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SalesMetric } from '@/types/sales';

interface PerformanceChartProps {
  data: SalesMetric[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  // Format data untuk tooltip & label chart
  const chartData = data.map((item) => ({
    name: item.nama_sales.split(' ')[0], // Ambil nama depan agar sumbu X tidak kepanjangan
    fullName: item.nama_sales,
    area: item.area,
    efektivitas: item.efektivitas_visit_persen,
    planned: item.kunjungan_planned,
    realisasi: item.kunjungan_realisasi,
  }));

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-bold text-slate-900">
          Perbandingan Efektivitas Kunjungan
        </CardTitle>
        <CardDescription className="text-xs">
          Persentase keberhasilan kunjungan sales terhadap target rute harian (%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-white p-3 shadow-md text-xs space-y-1">
                        <p className="font-bold text-slate-800">{item.fullName}</p>
                        <p className="text-slate-500">Area: {item.area}</p>
                        <hr className="my-1 border-slate-100" />
                        <p className="font-semibold text-blue-600">
                          Efektivitas: {item.efektivitas}%
                        </p>
                        <p className="text-slate-600">
                          Realisasi: {item.realisasi} / {item.planned} visit
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="efektivitas" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.efektivitas >= 80
                        ? '#2563eb' // Biru jika target tercapai baik (>=80%)
                        : entry.efektivitas >= 70
                        ? '#0284c7' // Sky blue jika moderat
                        : '#f59e0b' // Kuning-amber jika perlu perhatian khusus (<70%)
                    }
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