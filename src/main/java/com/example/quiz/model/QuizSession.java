package com.example.quiz.model;

import java.util.List;

/**
 * Represents a single quiz run.
 */
public class QuizSession {
    private final List<Question> questions;
    private int currentIndex = 0;
    private int correctCount = 0;

    public QuizSession(List<Question> questions) {
        this.questions = questions;
    }

    public Question getCurrentQuestion() {
        if (currentIndex >= 0 && currentIndex < questions.size()) {
            return questions.get(currentIndex);
        }
        return null;
    }

    public int getCurrentIndex() {
        return currentIndex;
    }

    public int getTotalQuestions() {
        return questions.size();
    }

    public int getCorrectCount() {
        return correctCount;
    }

    public void recordAnswer(boolean correct) {
        if (correct) correctCount++;
    }

    public boolean hasNextQuestion() {
        return currentIndex + 1 < questions.size();
    }

    public void moveToNextQuestion() {
        if (hasNextQuestion()) currentIndex++;
    }

    public List<Question> getQuestions() {
        return questions;
    }
}