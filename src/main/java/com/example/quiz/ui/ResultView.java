package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.HighScore;
import com.example.quiz.model.QuizSession;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.*;

import java.time.LocalDateTime;

public class ResultView {

    private final AppContext ctx;
    private final BorderPane root = new BorderPane();

    public ResultView(AppContext ctx) {
        this.ctx = ctx;
        build();
    }

    public Parent getRoot() {
        return root;
    }

    private void build() {
        QuizSession session = ctx.currentSession;
        if (session == null) {
            Nav.goToMainMenu(ctx);
            return;
        }

        int correct = session.getCorrectCount();
        int total = session.getTotalQuestions();
        double percentage = total == 0 ? 0.0 : (correct * 100.0 / total);

        Label title = UI.h1("Quiz Results");
        Label scoreLabel = new Label("Score: " + correct + " / " + total);
        Label percentLabel = new Label(String.format("Percentage: %.1f%%", percentage));
        Label msgLabel = new Label(getMessage(percentage));

        // Enter name for high score
        Label nameLabel = new Label("Your name (optional, for high scores):");
        TextField nameField = new TextField();

        Button saveAndMenu = new Button("Save & Back to Menu");
        Button playAgain = new Button("Play Again");
        Button justMenu = new Button("Back to Menu");

        saveAndMenu.setOnAction(e -> {
            String name = nameField.getText().trim();
            if (!name.isEmpty()) {
                HighScore hs = new HighScore(
                        name,
                        ctx.currentCategory,
                        ctx.currentDifficulty,
                        correct,
                        total,
                        LocalDateTime.now()
                );
                ctx.highScoreStore.add(hs);
            }
            Nav.goToMainMenu(ctx);
        });

        playAgain.setOnAction(e -> {
            // Start a new session with same settings
            var questions = ctx.questionRepo.getQuestions(
                    ctx.currentCategory, ctx.currentDifficulty, ctx.numberOfQuestions
            );
            ctx.currentSession = new com.example.quiz.model.QuizSession(questions);
            Nav.goToGame(ctx);
        });

        justMenu.setOnAction(e -> Nav.goToMainMenu(ctx));

        HBox buttons = new HBox(10, saveAndMenu, playAgain, justMenu);
        buttons.setAlignment(Pos.CENTER_RIGHT);

        VBox center = new VBox(10,
                title,
                scoreLabel,
                percentLabel,
                msgLabel,
                nameLabel,
                nameField,
                buttons
        );
        center.setPadding(new Insets(20));
        center.setAlignment(Pos.TOP_LEFT);

        root.setCenter(center);
        BorderPane.setMargin(center, new Insets(40));
    }

    private String getMessage(double percentage) {
        if (percentage >= 90) return "Amazing! Trivia master 😎";
        if (percentage >= 70) return "Nice job! You know your stuff 👌";
        if (percentage >= 50) return "Not bad! Keep practicing 💪";
        return "Tough round… try again and beat your score! 🔁";
    }
}