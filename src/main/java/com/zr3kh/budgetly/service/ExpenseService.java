package com.zr3kh.budgetly.service;

import com.zr3kh.budgetly.model.Expense;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Expense createExpenseDB(String data) {
        Expense expense = new Expense()
        return expenseRepository.save(data);
    }
}
