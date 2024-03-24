package com.zr3kh.budgetly.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zr3kh.budgetly.model.Expense;
import com.zr3kh.budgetly.service.ExpenseService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ExpenseController {

    @Autowired
    ExpenseService expenseService;

    @GetMapping("/api/v1")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return new ResponseEntity<>(expenseService.getAllExpensesDB(), HttpStatus.OK);
    }
    @GetMapping("/api/v1/{objectID}")
    public ResponseEntity<Optional<Expense>> getSingleExpense(@PathVariable ObjectId objectID) {
        return new ResponseEntity<>(expenseService.getSingleExpenseDB(objectID), HttpStatus.OK);
    }
    @PostMapping("/api/v1")
    public ResponseEntity<?> createSingleExpense(@RequestBody String body) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return new ResponseEntity<>(expenseService.createExpenseDB(objectMapper.readValue(body, Expense.class)), HttpStatus.CREATED);
        } catch(JsonProcessingException jpe) {
            jpe.printStackTrace();
            return new ResponseEntity<>("Data format is incorrect.", HttpStatus.BAD_REQUEST);
        }
    }
}
