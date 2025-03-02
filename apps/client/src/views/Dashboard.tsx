"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function DashboardPage() {
    // Datos de ejemplo para las métricas
    const metrics = [
        { title: "Ventas totales", value: "$12,345", description: "+20% desde el mes pasado" },
        { title: "Clientes nuevos", value: "45", description: "+5 desde la última semana" },
        { title: "Pedidos completados", value: "123", description: "+15% desde el mes pasado" },
    ];

    // Datos de ejemplo para la tabla
    const tableData = [
        { id: 1, product: "Camisa Azul", quantity: 10, price: "$25.00" },
        { id: 2, product: "Camisa Roja", quantity: 5, price: "$30.00" },
        { id: 3, product: "Camisa Verde", quantity: 8, price: "$28.00" },
    ];

    // Datos de ejemplo para el gráfico
    const salesData = [
        { month: "Enero", sales: 4000 },
        { month: "Febrero", sales: 3000 },
        { month: "Marzo", sales: 2000 },
        { month: "Abril", sales: 2780 },
        { month: "Mayo", sales: 1890 },
        { month: "Junio", sales: 2390 },
    ];

    return (
        <div className="space-y-6 text-blue-900">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="material-icons mr-2">settings</span>
                    Dashboard
                </h1>
                <Button className="bg-blue-800 hover:bg-gray-900">Nuevo Pedido</Button>
            </div>

            {/* Sección de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">{metric.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{metric.value}</p>
                            <p className="text-sm text-gray-500">{metric.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabla de datos */}
            <Card>
                <CardHeader>
                    <CardTitle>Últimos Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.product}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Gráfico (puedes usar recharts o chart.js) */}
            <Card>
                <CardHeader>
                    <CardTitle>Ventas Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart width={800} height={400} data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                </CardContent>
            </Card>
        </div>
    );
}