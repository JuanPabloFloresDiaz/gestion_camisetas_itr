// src/pages/Login.tsx
import React, { useState } from "react"
import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input"
import { Divider } from "@chakra-ui/layout"
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { authentication } from "../services/auth.service"
import { toast } from "sonner"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: authentication,
    onSuccess: (data) => {
      localStorage.setItem("jwtToken", data.token)
      navigate({ to: "/main/dashboard" })
      toast.success("Autenticación correcta")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data || error.message
      if (
        typeof errorMessage === "string" &&
        errorMessage.includes("Bad credentials")
      ) {
        toast.error("Credenciales incorrectas")
      } else {
        toast.error("Error al autenticar el usuario")
      }
      setError(errorMessage)
    },
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    mutation.mutate({ correo: email, clave: password })
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, blue.50, white, blue.100)"
      p={4}
      position="relative"
      fontFamily="Poppins, sans-serif"
    >
      {/* Elementos decorativos de fondo */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="16rem"
        bgGradient="linear(to-r, blue.500, blue.700)"
        borderBottomRadius="30%"
        opacity={0.1}
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="0"
        right="0"
        width="16rem"
        height="16rem"
        bg="blue.400"
        borderRadius="full"
        filter="blur(24px)"
        opacity={0.1}
        zIndex={0}
      />

      <Box
        maxW="md"
        width="100%"
        bg="whiteAlpha.800"
        boxShadow="xl"
        borderWidth="1px"
        borderColor="blue.100"
        borderRadius="md"
        overflow="hidden"
        position="relative"
        zIndex={10}
      >
        {/* Barra superior con degradado */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="4px"
          bgGradient="linear(to-r, blue.400, blue.600)"
        />

        <Box p={8}>
          <Flex direction="column" align="center" mb={6}>
            <Box
              bg="blue.50"
              p={4}
              borderRadius="xl"
              boxShadow="md"
              borderWidth="1px"
              borderColor="blue.100"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
              mb={4}
            >
              <Image
                src="/logo.avif"
                alt="Logo del sistema"
                boxSize="80px"
                borderRadius="md"
              />
            </Box>
            <Heading as="h2" size="lg" color="blue.900" textAlign="center">
              Bienvenido a ITR-TeeManager
            </Heading>
            <Text color="blue.700" textAlign="center">
              Ingresa tus credenciales para acceder al sistema.
            </Text>
          </Flex>

          <Box as="form" onSubmit={handleLogin}>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel color="blue.800">Correo Electrónico</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Mail color="blue.500" size={20} />
                </InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  bg="blue.50"
                  _focus={{ borderColor: "blue.500" }}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired mb={4}>
              <FormLabel color="blue.800">Contraseña</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock color="blue.500" size={20} />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  bg="blue.50"
                  _focus={{ borderColor: "blue.500" }}
                />
                <InputRightElement>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color="blue.500" size={20} />
                    ) : (
                      <Eye color="blue.500" size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box textAlign="right" mt={2}>
                <ChakraLink
                  fontSize="sm"
                  color="blue.600"
                  _hover={{ color: "blue.800", textDecoration: "underline" }}
                  href="#"
                >
                  ¿Olvidaste tu contraseña?
                </ChakraLink>
              </Box>
            </FormControl>

            <Button
              type="submit"
              width="full"
              bgGradient="linear(to-r, blue.600, blue.800)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, blue.700, blue.900)" }}
              py={2}
              borderRadius="md"
              boxShadow="md"
              transition="all 0.3s"
              mt={6}
            >
              <LogIn style={{ marginRight: "0.5rem" }} size={20} />
              Iniciar Sesión
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box p={4} textAlign="center">
          <Text fontSize="sm" color="blue.700">
            © 2025 ITR-TeeManager. Todos los derechos reservados.
          </Text>
          <Box mt={4}>
            <Image
              src="/logoRical.avif"
              alt="Logo de la empresa"
              boxSize="100px"
              borderRadius="md"
              mx="auto"
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Login
