package com.project.taskwebapp.taskapp.config;

import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    ToDto toUserDto(){
        return new ToDto();
    }

    @Bean
    ToObject toObject(){
        return new ToObject();
    }
}
