package com.zr3kh.budgetly.service;

import com.zr3kh.budgetly.model.Expense;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends MongoRepository<Expense, ObjectId> {

}
