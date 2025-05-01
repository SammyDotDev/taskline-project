package com.project.taskwebapp.taskapp.config;

import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    ToDto toUserDto(){
        return new ToDto();
    }
}
