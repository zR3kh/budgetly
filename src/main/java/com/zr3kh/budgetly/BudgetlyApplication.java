package com.zr3kh.budgetly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })

public class BudgetlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgetlyApplication.class, args);
	}

}
