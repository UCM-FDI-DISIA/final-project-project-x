package com.example.quiz.model;

import java.time.LocalDateTime;

public class HighScore {
    private final String playerName;
    private final String category;
    private final Difficulty difficulty;
    private final int correct;
    private final int total;
    private final LocalDateTime timestamp;

    public HighScore(String playerName, String category, Difficulty difficulty, int correct, int total, LocalDateTime timestamp) {
        this.playerName = playerName;
        this.category = category;
        this.difficulty = difficulty;
        this.correct = correct;
        this.total = total;
        this.timestamp = timestamp;
    }

    public String getPlayerName() {
        return playerName;
    }

    public String getCategory() {
        return category;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public int getCorrect() {
        return correct;
    }

    public int getTotal() {
        return total;
    }

    public double getPercentage() {
        return total == 0 ? 0.0 : (correct * 100.0 / total);
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}