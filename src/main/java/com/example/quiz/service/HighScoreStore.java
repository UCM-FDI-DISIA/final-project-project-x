package com.example.quiz.service;

import com.example.quiz.model.HighScore;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple in-memory high score store.
 */
public class HighScoreStore {
    private final List<HighScore> scores = new ArrayList<>();

    public void add(HighScore score) {
        scores.add(score);
    }

    public List<HighScore> top(int n) {
        return scores.stream()
                .sorted(Comparator.comparingDouble(HighScore::getPercentage).reversed())
                .limit(n)
                .collect(Collectors.toList());
    }

    public List<HighScore> all() {
        return new ArrayList<>(scores);
    }
}