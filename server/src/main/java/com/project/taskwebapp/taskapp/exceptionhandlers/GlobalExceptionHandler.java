package com.project.taskwebapp.taskapp.exceptionhandlers;

import com.project.taskwebapp.taskapp.exceptions.EmailException;
import com.project.taskwebapp.taskapp.exceptions.InvalidPasswordException;
import com.project.taskwebapp.taskapp.exceptions.NotFoundException;
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
                "error",HttpStatus.BAD_REQUEST.name(),
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
        var error = new HashMap<String, Object>();
        error.put("timestamp", LocalDateTime.now());
        error.put("error", HttpStatus.BAD_REQUEST.name());
        error.put("message", exp.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<?> handleEmailNotFoundException(EmailException exp){
        var error = new HashMap<String, Object>();
        error.put("timestamp", LocalDateTime.now());
        error.put("error", HttpStatus.BAD_REQUEST.name());
        error.put("message",exp.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException exp){
        var error = new HashMap<String, String>();
        error.put("message",exp.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
