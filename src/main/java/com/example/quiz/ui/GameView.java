package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.Question;
import com.example.quiz.model.QuizSession;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.*;

import java.util.ArrayList;
import java.util.List;

public class GameView {

    private final AppContext ctx;
    private final StackPane root = new StackPane();

    private Label questionLabel;
    private Label progressLabel;
    private Label scoreLabel;
    private Label categoryLabel;
    private final List<Button> answerButtons = new ArrayList<>();
    private Button nextButton;

    private boolean answeredCurrent = false;

    public GameView(AppContext ctx) {
        this.ctx = ctx;
        build();
    }

    public Parent getRoot() {
        return root;
    }

    private void build() {
        QuizSession session = ctx.currentSession;
        if (session == null || session.getTotalQuestions() == 0) {
            Nav.goToMainMenu(ctx);
            return;
        }

        // Card container
        VBox card = new VBox(18);
        card.getStyleClass().add("card");
        card.setMaxWidth(700);

        // Top bar: category + difficulty + progress + score
        categoryLabel = new Label(ctx.currentCategory + " · " + ctx.currentDifficulty);
        categoryLabel.getStyleClass().add("pill");

        progressLabel = new Label();
        progressLabel.getStyleClass().addAll("pill", "pill-strong");

        scoreLabel = new Label();
        scoreLabel.getStyleClass().add("pill");

        HBox topLeft = new HBox(8, categoryLabel);
        HBox topRight = new HBox(8, progressLabel, scoreLabel);
        topLeft.setAlignment(Pos.CENTER_LEFT);
        topRight.setAlignment(Pos.CENTER_RIGHT);

        HBox topBarInner = new HBox(10, topLeft, UI.spacer(), topRight);
        topBarInner.setAlignment(Pos.CENTER);
        topBarInner.getStyleClass().add("top-bar");

        // Question text
        questionLabel = new Label();
        questionLabel.getStyleClass().add("h1");
        questionLabel.setWrapText(true);

        // Answer buttons
        VBox answersBox = new VBox(10);
        for (int i = 0; i < 4; i++) {
            Button b = new Button("Option " + (i + 1));
            b.getStyleClass().add("answer-btn");
            b.setMaxWidth(Double.MAX_VALUE);
            int index = i;
            b.setOnAction(e -> handleAnswer(index));
            answerButtons.add(b);
        }
        answersBox.getChildren().addAll(answerButtons);
        answersBox.setFillWidth(true);

        // Bottom controls
        nextButton = new Button("Next →");
        nextButton.getStyleClass().add("primary-button");
        Button quitButton = new Button("Quit");

        nextButton.setDisable(true);

        nextButton.setOnAction(e -> goNext());
        quitButton.setOnAction(e -> Nav.goToMainMenu(ctx));

        HBox bottomBar = new HBox(10, quitButton, nextButton);
        bottomBar.setAlignment(Pos.CENTER_RIGHT);

        card.getChildren().addAll(
                topBarInner,
                questionLabel,
                answersBox,
                bottomBar
        );
        card.setPadding(new Insets(18));

        root.getChildren().add(card);
        StackPane.setAlignment(card, Pos.CENTER);

        refreshUI();
    }

    private void refreshUI() {
        QuizSession session = ctx.currentSession;
        Question q = session.getCurrentQuestion();
        if (q == null) {
            Nav.goToResults(ctx);
            return;
        }

        answeredCurrent = false;
        nextButton.setDisable(true);

        questionLabel.setText(q.getText());
        List<String> opts = q.getOptions();
        for (int i = 0; i < answerButtons.size(); i++) {
            Button b = answerButtons.get(i);
            if (i < opts.size()) {
                b.setText(opts.get(i));
                b.setDisable(false);
                b.getStyleClass().removeAll("answer-correct", "answer-wrong");
            } else {
                b.setText("");
                b.setDisable(true);
            }
        }

        int currentIndex1Based = session.getCurrentIndex() + 1;
        progressLabel.setText("Q " + currentIndex1Based + "/" + session.getTotalQuestions());
        scoreLabel.setText("Score: " + session.getCorrectCount());
    }

    private void handleAnswer(int selectedIndex) {
        if (answeredCurrent) return;

        QuizSession session = ctx.currentSession;
        Question q = session.getCurrentQuestion();
        if (q == null) return;

        int correctIndex = q.getCorrectIndex();
        boolean correct = (selectedIndex == correctIndex);
        session.recordAnswer(correct);

        for (int i = 0; i < answerButtons.size(); i++) {
            Button b = answerButtons.get(i);
            if (i == correctIndex) {
                b.getStyleClass().add("answer-correct");
            } else if (i == selectedIndex) {
                b.getStyleClass().add("answer-wrong");
            }
            b.setDisable(true);
        }

        answeredCurrent = true;
        nextButton.setDisable(false);
        scoreLabel.setText("Score: " + session.getCorrectCount());
    }

    private void goNext() {
        QuizSession session = ctx.currentSession;
        if (session.hasNextQuestion()) {
            session.moveToNextQuestion();
            refreshUI();
        } else {
            Nav.goToResults(ctx);
        }
    }
}