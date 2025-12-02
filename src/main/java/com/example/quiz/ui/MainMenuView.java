package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.Difficulty;
import com.example.quiz.model.Question;
import com.example.quiz.model.QuizSession;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;

import java.util.List;

public class MainMenuView {

    private final AppContext ctx;
    private final StackPane root = new StackPane();

    public MainMenuView(AppContext ctx) {
        this.ctx = ctx;
        build();
    }

    public Parent getRoot() {
        return root;
    }

    private void build() {
        // Card container
        VBox card = new VBox(18);
        card.getStyleClass().add("card");
        card.setMaxWidth(420);

        // 🔹 Logo
        ImageView logoView = null;
        var logoUrl = getClass().getResource("/images/logo.png");
        if (logoUrl != null) {
            logoView = new ImageView(new Image(logoUrl.toExternalForm()));
            logoView.setFitHeight(40);
            logoView.setPreserveRatio(true);
        }

        // Title & subtitle
        Label title = UI.title("Quiz Trivia");
        Label subtitle = new Label("Pick a setup and test your brain.");
        subtitle.getStyleClass().add("h2");

        // Header: logo + title in a row
        HBox header = new HBox(10);
        header.setAlignment(Pos.CENTER_LEFT);
        if (logoView != null) {
            header.getChildren().add(logoView);
        }
        header.getChildren().add(title);

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
        numSpinner.setMaxWidth(120);

        // Buttons
        Button playBtn = new Button("Play ▶");
        playBtn.getStyleClass().add("primary-button");
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
                // Basic feedback for now
                System.out.println("Not enough questions for this category/difficulty.");
                return;
            }

            ctx.currentSession = new QuizSession(questions);
            Nav.goToGame(ctx);
        });

        highScoresBtn.setOnAction(e -> Nav.goToHighScores(ctx));

        HBox buttons = new HBox(10, playBtn, highScoresBtn);
        buttons.setAlignment(Pos.CENTER_RIGHT);

        card.getChildren().addAll(
                header,
                subtitle,
                new Separator(),
                catLabel, categoryBox,
                diffLabel, difficultyBox,
                numLabel, numSpinner,
                buttons
        );
        card.setPadding(new Insets(22));

        root.getChildren().add(card);
        StackPane.setAlignment(card, Pos.CENTER);
    }
}