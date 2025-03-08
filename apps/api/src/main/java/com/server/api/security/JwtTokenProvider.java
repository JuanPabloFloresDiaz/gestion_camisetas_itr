package com.server.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
// Importaciones existentes...
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private int jwtExpirationInMs;

    @Value("${app.jwt.algorithm}")
    private String algorithm;

    @Value("${app.jwt.iterations}")
    private int iterations;

    @Value("${app.jwt.key-length}")
    private int keyLength;

    @Value("${app.jwt.salt}")
    private String jwtSalt;

    private byte[] salt() {
        return Base64.getDecoder().decode(jwtSalt);
    }

    private SecretKey getSigningKey() {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            KeySpec spec = new PBEKeySpec(
                jwtSecret.toCharArray(),
                salt(),
                iterations,
                keyLength
            );
            return new SecretKeySpec(factory.generateSecret(spec).getEncoded(), algorithm);
        } catch (Exception e) {
            logger.error("Error generando clave JWT", e);
            throw new RuntimeException("Error generando clave JWT", e);
        }
    }

    public String generateToken(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            logger.error("Firma JWT inválida: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.error("Token JWT mal formado: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.error("Token JWT expirado: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.error("Token JWT no soportado: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string está vacío: {}", ex.getMessage());
        } catch (JwtException ex) {
            logger.error("Error general JWT: {}", ex.getMessage());
        }
        return false;
    }
}


