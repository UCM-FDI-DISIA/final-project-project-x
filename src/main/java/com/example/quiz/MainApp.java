package com.example.quiz;

import com.example.quiz.service.HighScoreStore;
import com.example.quiz.service.InMemoryQuestionRepository;
import com.example.quiz.service.QuestionRepository;
import com.example.quiz.ui.MainMenuView;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MainApp extends Application {

    private AppContext ctx;
    private BorderPane root;
    private Scene scene;

    @Override
    public void start(Stage stage) {
        // Services
        QuestionRepository questionRepo = new InMemoryQuestionRepository();
        HighScoreStore highScoreStore = new HighScoreStore();

        // Shared context
        ctx = new AppContext(questionRepo, highScoreStore, stage);

        // Root layout
        root = new BorderPane();
        scene = new Scene(root, 900, 600);
        scene.getStylesheets().add(getClass().getResource("/styles.css").toExternalForm());

        stage.setTitle("Quiz Trivia Game");
        stage.setScene(scene);

        // Expose this app instance so Nav can get to it if needed
        stage.getProperties().put("app", this);

        // First screen: main menu
        setContent(new MainMenuView(ctx).getRoot());

        stage.show();
    }

    public void setContent(javafx.scene.Node node) {
        root.setCenter(node);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
