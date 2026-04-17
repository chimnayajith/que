package com.que.que;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class QueApplication {

    public static void main(String[] args) {
        SpringApplication.run(QueApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "QUE backend running 🚀";
    }
}