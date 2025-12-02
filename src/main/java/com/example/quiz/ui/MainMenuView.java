package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.Difficulty;
import com.example.quiz.model.Question;
import com.example.quiz.model.QuizSession;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.Spinner;
import javafx.scene.control.SpinnerValueFactory;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

import java.util.List;

public class MainMenuView {

    private final AppContext ctx;
    private final BorderPane root = new BorderPane();

    public MainMenuView(AppContext ctx) {
        this.ctx = ctx;
        build();
    }

    public Parent getRoot() {
        return root;
    }

    private void build() {
        // Title
        Label title = UI.title("Quiz Trivia Game");

        // Category selection
        Label catLabel = new Label("Category");
        ComboBox<String> categoryBox = new ComboBox<>();
        categoryBox.getItems().addAll("General", "Science", "Sports", "Movies");
        categoryBox.getSelectionModel().select(ctx.currentCategory);

        // Difficulty selection
        Label diffLabel = new Label("Difficulty");
        ComboBox<Difficulty> difficultyBox = new ComboBox<>();
        difficultyBox.getItems().addAll(Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD);
        difficultyBox.getSelectionModel().select(ctx.currentDifficulty);

        // Number of questions
        Label numLabel = new Label("Number of questions");
        Spinner<Integer> numSpinner = new Spinner<>();
        numSpinner.setValueFactory(new SpinnerValueFactory.IntegerSpinnerValueFactory(3, 20, ctx.numberOfQuestions));

        // Buttons
        Button playBtn = new Button("Play");
        Button highScoresBtn = new Button("High Scores");

        playBtn.setOnAction(e -> {
            ctx.currentCategory = categoryBox.getValue();
            ctx.currentDifficulty = difficultyBox.getValue();
            ctx.numberOfQuestions = numSpinner.getValue();

            List<Question> questions = ctx.questionRepo.getQuestions(
                    ctx.currentCategory,
                    ctx.currentDifficulty,
                    ctx.numberOfQuestions
            );

            if (questions.isEmpty()) {
                // Very simple feedback – you can later replace with nicer dialog
                System.out.println("Not enough questions for this category/difficulty.");
                return;
            }

            ctx.currentSession = new QuizSession(questions);
            Nav.goToGame(ctx);
        });

        highScoresBtn.setOnAction(e -> Nav.goToHighScores(ctx));

        HBox buttons = new HBox(10, playBtn, highScoresBtn);
        buttons.setAlignment(Pos.CENTER);

        VBox center = new VBox(15,
                title,
                catLabel, categoryBox,
                diffLabel, difficultyBox,
                numLabel, numSpinner,
                buttons
        );
        center.setPadding(new Insets(20));
        center.setAlignment(Pos.TOP_LEFT);

        root.setCenter(center);
        BorderPane.setMargin(center, new Insets(40));
    }
}