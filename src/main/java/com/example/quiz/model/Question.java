package com.example.quiz.model;

import java.util.List;

public class Question {
    private final String category;
    private final Difficulty difficulty;
    private final String text;
    private final List<String> options; // size 4
    private final int correctIndex;     // 0..3

    public Question(String category, Difficulty difficulty, String text, List<String> options, int correctIndex) {
        this.category = category;
        this.difficulty = difficulty;
        this.text = text;
        this.options = List.copyOf(options);
        this.correctIndex = correctIndex;
    }

    public String getCategory() {
        return category;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public String getText() {
        return text;
    }

    public List<String> getOptions() {
        return options;
    }

    public int getCorrectIndex() {
        return correctIndex;
    }
}