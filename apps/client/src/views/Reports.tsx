import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, ShoppingBag, Users, Shirt, Calendar, ArrowRight } from "lucide-react"

export default function ReportsDashboard() {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header con gradiente azul */}
      <div className="mb-10 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Gestión de Reportes</h1>
        <p className="text-blue-700 mt-2">Genera y visualiza reportes detallados sobre pedidos y ventas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Reporte de pedidos por cliente */}
        <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Pedidos por Cliente</CardTitle>
            <div className="p-2 bg-blue-50 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardDescription className="px-6 pt-4 text-blue-600">
            Visualiza los pedidos realizados por cada cliente
          </CardDescription>
          <CardContent className="pt-4">
            <div className="h-40 flex items-center justify-center bg-blue-50 rounded-lg">
              <BarChart3 className="h-16 w-16 text-blue-400" />
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group">
              Generar Reporte
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* Reporte de pedidos por talla */}
        <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Pedidos por Talla</CardTitle>
            <div className="p-2 bg-blue-50 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardDescription className="px-6 pt-4 text-blue-600">
            Analiza la distribución de pedidos según las tallas
          </CardDescription>
          <CardContent className="pt-4">
            <div className="h-40 flex items-center justify-center bg-blue-50 rounded-lg">
              <div className="flex gap-2">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-medium shadow-sm hover:bg-blue-200 transition-colors cursor-pointer">
                  S
                </span>
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-200 text-blue-800 font-medium shadow-sm hover:bg-blue-300 transition-colors cursor-pointer">
                  M
                </span>
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-300 text-blue-900 font-medium shadow-sm hover:bg-blue-400 transition-colors cursor-pointer">
                  L
                </span>
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white font-medium shadow-sm hover:bg-blue-500 transition-colors cursor-pointer">
                  XL
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group">
              Generar Reporte
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* Reporte de pedidos por camisa */}
        <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Pedidos por Camisa</CardTitle>
            <div className="p-2 bg-blue-50 rounded-full">
              <Shirt className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardDescription className="px-6 pt-4 text-blue-600">
            Revisa los pedidos realizados para cada modelo de camisa
          </CardDescription>
          <CardContent className="pt-4">
            <div className="h-40 flex items-center justify-center bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-100 p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow hover:bg-blue-200 cursor-pointer">
                  <Shirt className="h-6 w-6 mx-auto text-blue-600" />
                  <p className="text-xs mt-1 text-blue-800 font-medium">Modelo A</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow hover:bg-blue-200 cursor-pointer">
                  <Shirt className="h-6 w-6 mx-auto text-blue-600" />
                  <p className="text-xs mt-1 text-blue-800 font-medium">Modelo B</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow hover:bg-blue-200 cursor-pointer">
                  <Shirt className="h-6 w-6 mx-auto text-blue-600" />
                  <p className="text-xs mt-1 text-blue-800 font-medium">Modelo C</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow hover:bg-blue-200 cursor-pointer">
                  <Shirt className="h-6 w-6 mx-auto text-blue-600" />
                  <p className="text-xs mt-1 text-blue-800 font-medium">Modelo D</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group">
              Generar Reporte
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* Reporte de ingresos mensuales */}
        <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Ingresos Mensuales</CardTitle>
            <div className="p-2 bg-blue-50 rounded-full">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardDescription className="px-6 pt-4 text-blue-600">
            Visualiza los ingresos mensuales generados por pedidos
          </CardDescription>
          <CardContent className="pt-4">
            <div className="h-40 flex items-center justify-center bg-blue-50 rounded-lg">
              <BarChart3 className="h-16 w-16 text-blue-400" />
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group">
              Generar Reporte
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

