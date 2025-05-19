package DumbFlix.DumbFlix_BE.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FuncErrorException.class)
    public ResponseEntity<Map<String, Object>> handleFuncErrorException(FuncErrorException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("message", ex.getMessage());

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
