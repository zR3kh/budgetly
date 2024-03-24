package com.zr3kh.budgetly.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zr3kh.budgetly.model.Expense;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;

    public List<Expense> getAllExpensesDB() {
        return expenseRepository.findAll();
    }

    public Optional<Expense> getSingleExpenseDB(ObjectId objectID) {
        return expenseRepository.findById(objectID);
    }

    public Expense createExpenseDB(Expense expense) {
        return expenseRepository.save(expense);
    }
}
