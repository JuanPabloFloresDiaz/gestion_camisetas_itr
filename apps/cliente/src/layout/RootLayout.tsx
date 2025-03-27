// layouts/RootLayout.tsx
import { Outlet } from '@tanstack/react-router'
import { Flex, Box } from '@chakra-ui/react'
import { CustomSidebar } from '../components/CustomSidebar'

export function RootLayout() {
  return (
    <Flex>
      <CustomSidebar />
      <Box flex="1" p="4">
        <Outlet />
      </Box>
    </Flex>
  )
}
