package com.zr3kh.budgetly.controller;

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
    public ResponseEntity<Expense> createSingleExpense(@RequestBody String body) {
        return new ResponseEntity<>(expenseService.createExpenseDB(body), HttpStatus.CREATED);
    }
}
