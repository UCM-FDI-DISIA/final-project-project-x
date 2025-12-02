package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.model.HighScore;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class HighScoresView {

    private final AppContext ctx;
    private final BorderPane root = new BorderPane();

    public HighScoresView(AppContext ctx) {
        this.ctx = ctx;
        build();
    }

    public Parent getRoot() {
        return root;
    }

    private void build() {
        var scores = FXCollections.observableArrayList(ctx.highScoreStore.all());

        TableView<HighScore> table = new TableView<>(scores);
        table.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY_ALL_COLUMNS);

        TableColumn<HighScore, String> nameCol = new TableColumn<>("Name");
        nameCol.setCellValueFactory(new PropertyValueFactory<>("playerName"));

        TableColumn<HighScore, String> catCol = new TableColumn<>("Category");
        catCol.setCellValueFactory(new PropertyValueFactory<>("category"));

        TableColumn<HighScore, String> diffCol = new TableColumn<>("Difficulty");
        diffCol.setCellValueFactory(new PropertyValueFactory<>("difficulty"));

        TableColumn<HighScore, Integer> correctCol = new TableColumn<>("Correct");
        correctCol.setCellValueFactory(new PropertyValueFactory<>("correct"));

        TableColumn<HighScore, Integer> totalCol = new TableColumn<>("Total");
        totalCol.setCellValueFactory(new PropertyValueFactory<>("total"));

        TableColumn<HighScore, Double> percCol = new TableColumn<>("Percentage");
        percCol.setCellValueFactory(new PropertyValueFactory<>("percentage"));

        TableColumn<HighScore, java.time.LocalDateTime> timeCol = new TableColumn<>("When");
        timeCol.setCellValueFactory(new PropertyValueFactory<>("timestamp"));

        table.getColumns().addAll(nameCol, catCol, diffCol, correctCol, totalCol, percCol, timeCol);

        Button backBtn = new Button("Back to Menu");
        backBtn.setOnAction(e -> Nav.goToMainMenu(ctx));

        HBox bottom = new HBox(backBtn);
        bottom.setAlignment(Pos.CENTER_RIGHT);
        bottom.setPadding(new Insets(10));

        VBox center = new VBox(10, UI.h1("High Scores"), table);
        center.setPadding(new Insets(20));

        root.setCenter(center);
        root.setBottom(bottom);
        BorderPane.setMargin(center, new Insets(20));
    }
}