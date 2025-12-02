package com.example.quiz.service;

import com.example.quiz.model.Difficulty;
import com.example.quiz.model.Question;

import java.util.*;
import java.util.stream.Collectors;

public class InMemoryQuestionRepository implements QuestionRepository {

    private final List<Question> allQuestions = new ArrayList<>();

    public InMemoryQuestionRepository() {
        seed();
    }

    private void seed() {
        // General / EASY
        allQuestions.add(new Question(
                "General", Difficulty.EASY,
                "What is the capital of France?",
                List.of("Madrid", "Paris", "Berlin", "Rome"),
                1
        ));
        allQuestions.add(new Question(
                "General", Difficulty.EASY,
                "Which planet is known as the Red Planet?",
                List.of("Mars", "Venus", "Jupiter", "Mercury"),
                0
        ));
        allQuestions.add(new Question(
                "General", Difficulty.EASY,
                "How many continents are there on Earth?",
                List.of("5", "6", "7", "8"),
                2
        ));

        // Science / MEDIUM
        allQuestions.add(new Question(
                "Science", Difficulty.MEDIUM,
                "What is the chemical symbol for water?",
                List.of("O2", "H2O", "CO2", "NaCl"),
                1
        ));
        allQuestions.add(new Question(
                "Science", Difficulty.MEDIUM,
                "Which gas do plants absorb from the atmosphere?",
                List.of("Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"),
                2
        ));

        // Sports / EASY
        allQuestions.add(new Question(
                "Sports", Difficulty.EASY,
                "How many players are there in a football (soccer) team on the field?",
                List.of("9", "10", "11", "12"),
                2
        ));

        // Movies / MEDIUM
        allQuestions.add(new Question(
                "Movies", Difficulty.MEDIUM,
                "Which movie features the quote, \"I'll be back\"?",
                List.of("Terminator", "Rocky", "Die Hard", "Rambo"),
                0
        ));

        // Add more if you want; for now this is enough to demo.
    }

    @Override
    public List<Question> getQuestions(String category, Difficulty difficulty, int count) {
        List<Question> pool = allQuestions.stream()
                .filter(q -> q.getCategory().equalsIgnoreCase(category))
                .filter(q -> q.getDifficulty() == difficulty)
                .collect(Collectors.toList());

        Collections.shuffle(pool);
        if (pool.size() > count) {
            return new ArrayList<>(pool.subList(0, count));
        }
        return pool;
    }
}