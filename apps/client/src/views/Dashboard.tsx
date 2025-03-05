"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  PlusCircle,
  Clock,
  TrendingUp,
  Package,
} from "lucide-react"

export default function DashboardPage() {
  // Datos de ejemplo para las métricas
  const metrics = [
    {
      title: "Ventas totales",
      value: "$12,345",
      description: "+20% desde el mes pasado",
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      trend: "up",
    },
    {
      title: "Clientes nuevos",
      value: "45",
      description: "+5 desde la última semana",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      trend: "up",
    },
    {
      title: "Pedidos completados",
      value: "123",
      description: "+15% desde el mes pasado",
      icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
      trend: "up",
    },
  ]

  // Datos de ejemplo para la tabla
  const tableData = [
    {
      id: 1,
      product: "Camisa Azul",
      quantity: 10,
      price: "$25.00",
      status: "Completado",
      date: "Hoy, 14:30",
      customer: "Juan Pérez",
    },
    {
      id: 2,
      product: "Camisa Roja",
      quantity: 5,
      price: "$30.00",
      status: "Pendiente",
      date: "Hoy, 12:15",
      customer: "María López",
    },
    {
      id: 3,
      product: "Camisa Verde",
      quantity: 8,
      price: "$28.00",
      status: "En proceso",
      date: "Ayer, 16:45",
      customer: "Carlos Rodríguez",
    },
  ]

  // Datos de ejemplo para el gráfico
  const salesData = [
    { month: "Enero", sales: 4000, orders: 240 },
    { month: "Febrero", sales: 3000, orders: 180 },
    { month: "Marzo", sales: 2000, orders: 120 },
    { month: "Abril", sales: 2780, orders: 150 },
    { month: "Mayo", sales: 1890, orders: 110 },
    { month: "Junio", sales: 2390, orders: 140 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "En proceso":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header con gradiente */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 mb-8 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Dashboard
            </h1>
            <p className="text-blue-700 mt-1">Bienvenido de nuevo. Aquí está el resumen de tu negocio.</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white text-blue-700 border border-blue-200 hover:bg-blue-50">
              <Calendar className="mr-2 h-4 w-4" />
              Filtrar por fecha
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Pedido
            </Button>
          </div>
        </div>
      </div>

      {/* Sección de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-blue-900">{metric.title}</CardTitle>
                <div className="p-2 rounded-full bg-blue-50">{metric.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-900">{metric.value}</p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center`}
                >
                  {metric.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : null}
                  {metric.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos con pestañas */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Análisis de Ventas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ventas">
            <TabsList className="mb-4">
              <TabsTrigger value="ventas">Ventas Mensuales</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            </TabsList>
            <TabsContent value="ventas">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      name="Ventas ($)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#3b82f6" }}
                      activeDot={{ r: 6, fill: "#2563eb" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="pedidos">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="orders" name="Número de Pedidos" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabla de datos mejorada */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Últimos Pedidos
          </CardTitle>
          <Button variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50">
            Ver todos
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="text-blue-900">Cliente</TableHead>
                <TableHead className="text-blue-900">Producto</TableHead>
                <TableHead className="text-blue-900">Cantidad</TableHead>
                <TableHead className="text-blue-900">Precio</TableHead>
                <TableHead className="text-blue-900">Estado</TableHead>
                <TableHead className="text-blue-900">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium text-blue-900">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-blue-100 text-blue-700">
                        <AvatarFallback>{getInitials(row.customer)}</AvatarFallback>
                      </Avatar>
                      {row.customer}
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-800">{row.product}</TableCell>
                  <TableCell className="text-blue-800">{row.quantity}</TableCell>
                  <TableCell className="text-blue-800 font-medium">{row.price}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(row.status)} border-0`}>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-blue-700">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {row.date}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t border-blue-100 bg-blue-50/50 flex justify-between">
          <p className="text-sm text-blue-700">Mostrando 3 de 25 pedidos</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50">
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50">
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

