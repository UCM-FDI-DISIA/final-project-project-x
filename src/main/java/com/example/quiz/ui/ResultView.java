package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.HighScore;
import com.example.quiz.model.QuizSession;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.layout.*;

import java.time.LocalDateTime;

public class ResultView {

    private final AppContext ctx;
    private final StackPane root = new StackPane();

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

        VBox card = new VBox(14);
        card.getStyleClass().add("card");
        card.setMaxWidth(480);
        card.setPadding(new Insets(20));

        Label title = UI.h1("Quiz Results");
        Label scoreLabel = new Label("Score: " + correct + " / " + total);
        Label percentLabel = new Label(String.format("Percentage: %.1f%%", percentage));
        Label msgLabel = new Label(getMessage(percentage));
        msgLabel.getStyleClass().add("h2");
        msgLabel.setWrapText(true);

        Label nameLabel = new Label("Your name (for high scores):");
        TextField nameField = new TextField();
        nameField.setPromptText("Enter your name");

        Button saveAndMenu = new Button("Save & Back to Menu");
        saveAndMenu.getStyleClass().add("primary-button");
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
            var questions = ctx.questionRepo.getQuestions(
                    ctx.currentCategory, ctx.currentDifficulty, ctx.numberOfQuestions
            );
            ctx.currentSession = new com.example.quiz.model.QuizSession(questions);
            Nav.goToGame(ctx);
        });

        justMenu.setOnAction(e -> Nav.goToMainMenu(ctx));

        HBox buttons = new HBox(10, saveAndMenu, playAgain, justMenu);
        buttons.setAlignment(Pos.CENTER_RIGHT);

        card.getChildren().addAll(
            title,
            new Label("Category: " + ctx.currentCategory + " · " + ctx.currentDifficulty),
            scoreLabel,
            percentLabel,
            msgLabel,
            new Separator(),        // <-- needs import
            nameLabel,
            nameField,
            buttons
        );

        root.getChildren().add(card);
        StackPane.setAlignment(card, Pos.CENTER);
    }

    private String getMessage(double percentage) {
        if (percentage >= 90) return "Amazing! Trivia master 😎";
        if (percentage >= 70) return "Nice job! You know your stuff 👌";
        if (percentage >= 50) return "Not bad! Keep practicing 💪";
        return "Tough round… try again and beat your score! 🔁";
    }
}