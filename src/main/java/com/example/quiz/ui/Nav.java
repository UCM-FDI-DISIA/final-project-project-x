package com.example.quiz.ui;

import com.example.quiz.AppContext;
import com.example.quiz.MainApp;
import javafx.scene.Node;

/**
 * Simple navigation helper between screens.
 */
public class Nav {

    private static MainApp appFromCtx(AppContext ctx) {
        return (MainApp) ctx.stage.getProperties().get("app");
    }

    private static void set(AppContext ctx, Node root) {
        appFromCtx(ctx).setContent(root);
    }

    public static void goToMainMenu(AppContext ctx) {
        set(ctx, new MainMenuView(ctx).getRoot());
    }

    public static void goToGame(AppContext ctx) {
        set(ctx, new GameView(ctx).getRoot());
    }

    public static void goToResults(AppContext ctx) {
        set(ctx, new ResultView(ctx).getRoot());
    }

    public static void goToHighScores(AppContext ctx) {
        set(ctx, new HighScoresView(ctx).getRoot());
    }
}