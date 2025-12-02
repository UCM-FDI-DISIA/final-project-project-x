package com.example.quiz.ui;

import javafx.scene.control.Label;
import javafx.scene.layout.Region;

/**
 * UI helper methods (titles, spacers, etc.).
 */
public class UI {

    public static Label title(String text) {
        Label l = new Label(text);
        l.getStyleClass().add("app-title");
        return l;
    }

    public static Label h1(String text) {
        Label l = new Label(text);
        l.getStyleClass().add("h1");
        return l;
    }

    public static Label h2(String text) {
        Label l = new Label(text);
        l.getStyleClass().add("h2");
        return l;
    }

    public static Region spacer() {
        Region r = new Region();
        r.setMinSize(0, 0);
        r.setPrefSize(Region.USE_COMPUTED_SIZE, Region.USE_COMPUTED_SIZE);
        return r;
    }
}