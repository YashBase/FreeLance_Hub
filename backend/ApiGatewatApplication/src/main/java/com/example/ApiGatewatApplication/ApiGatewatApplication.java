package com.example.ApiGatewatApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;



@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewatApplication.class, args);
	}

}
