// components/CustomSidebar.tsx
import { Link } from '@tanstack/react-router'
import { Box, Flex, Text, Image as ChakraImage } from '@chakra-ui/react'
import { Home, Users, User, ShoppingCart, BarChart3, Shirt, Ruler, Tags, LogOut, ChevronRight } from 'lucide-react'

export function CustomSidebar() {
  const pathname = window.location.pathname

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { href: "/main/dashboard", icon: Home, label: "Inicio" },
    { href: "/main/admin", icon: Users, label: "Administradores" },
    { href: "/main/client", icon: User, label: "Clientes" },
    { href: "/main/order", icon: ShoppingCart, label: "Pedidos" },
    { href: "/main/report", icon: BarChart3, label: "Reportes" },
    { href: "/main/shirt", icon: Shirt, label: "Camisas" },
    { href: "/main/size", icon: Ruler, label: "Tallas" },
    { href: "/main/typeshirt", icon: Tags, label: "Tipos de camisas" },
  ]

  // Componente Divider personalizado
  const CustomDivider = () => (
    <Box 
      my="4" 
      height="1px" 
      width="100%" 
      bg="blue.200" 
      opacity="0.6"
    />
  )

  return (
    <Box w="64" h="100vh" bgGradient="linear(to-b, white, blue.50)" borderRight="1px" borderColor="blue.100" shadow="lg">
      {/* Header con logo y nombre */}
      <Box p="4" borderBottom="1px" borderColor="blue.100">
        <Flex align="center" justify="space-between" mb="2">
          <Text fontSize="xl" fontWeight="bold" color="blue.900">
            ITR-TeeManager
          </Text>
          <Box bg="blue.100" p="1" borderRadius="md">
            <ChakraImage src="/logo.avif" alt="Logo del sistema" boxSize="36px" borderRadius="md" />
          </Box>
        </Flex>
        <Box h="1" w="full" bgGradient="linear(to-r, blue.400, blue.600)" borderRadius="full" mt="2" />
      </Box>

      {/* Menú de navegación */}
      <Box flex="1" overflowY="auto" py="4" px="3">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link 
              to={item.href} 
              key={item.href}
            >
              <Flex
                align="center"
                justify="space-between"
                p="3"
                borderRadius="lg"
                transition="all 0.2s"
                bg={active ? "blue.600" : undefined}
                color={active ? "white" : "blue.900"}
                _hover={{ bg: active ? undefined : "blue.100" }}
              >
                <Flex align="center">
                  <Icon size={20} color={active ? "white" : "blue.600"} style={{ marginRight: '0.75rem' }} />
                  <Text fontWeight="medium">{item.label}</Text>
                </Flex>
                {active && <ChevronRight size={16} color="white" />}
              </Flex>
            </Link>
          )
        })}

        {/* Reemplazo del Divider */}
        <CustomDivider />

        {/* Botón de cerrar sesión */}
        <Link to="/" onClick={() => localStorage.removeItem("jwtToken")}>
          <Flex
            align="center"
            justify="space-between"
            p="3"
            borderRadius="lg"
            color="red.600"
            border="1px"
            borderColor="red.100"
            _hover={{ bg: "red.50" }}
            transition="all 0.2s"
            mt="2"
          >
            <Flex align="center">
              <LogOut size={20} color="red.500" style={{ marginRight: '0.75rem' }} />
              <Text fontWeight="medium">Cerrar sesión</Text>
            </Flex>
          </Flex>
        </Link>
      </Box>

      {/* Logo de la empresa */}
      <Box p="4" borderTop="1px" borderColor="blue.100" bg="white">
        <Flex direction="column" align="center">
          <Text fontSize="xs" color="blue.600" mb="2" fontWeight="medium">
            Desarrollada por
          </Text>
          <ChakraImage src="/logoRical.avif" alt="Logo de la empresa" boxSize="100px" borderRadius="lg" />
        </Flex>
      </Box>
    </Box>
  )
}