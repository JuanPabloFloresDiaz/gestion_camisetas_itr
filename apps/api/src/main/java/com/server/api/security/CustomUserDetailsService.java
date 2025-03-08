package com.server.api.security;

import com.server.api.repository.AdministradorRepository;
import com.server.api.model.Administrador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Administrador administrador = administradorRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Correo no encontrado: " + correo));
        return new CustomUserDetails(administrador);
    }
}