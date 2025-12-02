package com.example.quiz;

import com.example.quiz.model.Difficulty;
import com.example.quiz.model.QuizSession;
import com.example.quiz.service.HighScoreStore;
import com.example.quiz.service.QuestionRepository;
import javafx.stage.Stage;

/**
 * Holds shared state and services for the app.
 */
public class AppContext {
    public final QuestionRepository questionRepo;
    public final HighScoreStore highScoreStore;
    public final Stage stage;

    // Current quiz configuration/state
    public String currentCategory = "General";
    public Difficulty currentDifficulty = Difficulty.EASY;
    public int numberOfQuestions = 10;

    public QuizSession currentSession;

    public AppContext(QuestionRepository questionRepo, HighScoreStore highScoreStore, Stage stage) {
        this.questionRepo = questionRepo;
        this.highScoreStore = highScoreStore;
        this.stage = stage;
    }
}