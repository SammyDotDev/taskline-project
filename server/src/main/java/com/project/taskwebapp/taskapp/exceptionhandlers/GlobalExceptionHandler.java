package com.project.taskwebapp.taskapp.exceptionhandlers;

import com.project.taskwebapp.taskapp.exceptions.EmailNotFoundException;
import com.project.taskwebapp.taskapp.exceptions.InvalidPasswordException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(DataIntegrityViolationException exp){
        String rootMessage = exp.getRootCause().getMessage() != null ? exp.getRootCause().getMessage():exp.getMessage();

        String message;
        if(rootMessage != null && rootMessage.contains("users_email_key")){
            message = "Email is already taken";
        }else{
            message = "Database constraint violated";
        }

        Map<String, Object> body = Map.of(
                "timestamp",LocalDateTime.now(),
                "status",HttpStatus.BAD_REQUEST.value(),
                "error",HttpStatus.BAD_REQUEST.toString(),
                "message",message
        );
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException exp){
        var errors = new HashMap<String, String>();
        exp.getBindingResult().getAllErrors().forEach(error->{
            var fieldName = ((FieldError)error).getField();
            var errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<?>handleEmailEmpty(InvalidPasswordException exp){
        var errors = new HashMap<String, String>();
        errors.put("error", exp.getMessage());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<?> handleEmailNotFoundException(EmailNotFoundException exp){
        var error = new HashMap<String, String>();
        error.put("error",exp.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
