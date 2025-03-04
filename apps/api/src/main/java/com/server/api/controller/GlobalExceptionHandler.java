package com.server.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja excepciones de tipo HttpMediaTypeNotSupportedException.
     * Devuelve un mensaje de error detallado cuando el Content-Type no es soportado.
     */
/*     @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<String> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex) {
        String errorMessage = "Tipo de contenido no soportado: " + ex.getContentType() + 
                              ". Se esperaba: application/json.";
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(errorMessage);
    } */

    /**
     * Maneja excepciones genéricas.
     * Devuelve un mensaje de error genérico para cualquier otra excepción no manejada.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        String errorMessage = "Error interno del servidor: " + ex.getMessage();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }
}