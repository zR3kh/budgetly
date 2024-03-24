package com.zr3kh.budgetly.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "expenses")
public class Expense {

    @Id
    private ObjectId id;
    private String name;
    private Date date;
    private CategoryExpense categoryExpense;
    private int cost;

    public Expense(String name, Date date, CategoryExpense categoryExpense, int cost) {
        this.name = name;
        this.date = date;
        this.categoryExpense = categoryExpense;
        this.cost = cost;
    }

    public Expense() {

    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public CategoryExpense getCategoryExpense() {
        return categoryExpense;
    }
    public void setCategoryExpense(CategoryExpense categoryExpense) {
        this.categoryExpense = categoryExpense;
    }
    public int getCost() {
        return cost;
    }
    public void setCost(int cost) {
        this.cost = cost;
    }
}
