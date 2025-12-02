package com.example.quiz.service;

import com.example.quiz.model.Difficulty;
import com.example.quiz.model.Question;

import java.util.List;

public interface QuestionRepository {
    List<Question> getQuestions(String category, Difficulty difficulty, int count);
}