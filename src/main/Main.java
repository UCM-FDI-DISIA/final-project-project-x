package main;

import service.QuizService;
import model.Question;
import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        QuizService quizService = new QuizService();

        System.out.println("=======================================");
        System.out.println("         PROJECT X: TRIVIA QUIZ        ");
        System.out.println("=======================================\n");

        List<Question> questions = quizService.getQuestions();
        List<Integer> userAnswers = new ArrayList<>();

        int questionNumber = 1;

        for (Question q : questions) {
            System.out.println("Q" + questionNumber + ": " + q.getQuestionText());

            List<String> options = q.getOptions();

            for (int i = 0; i < options.size(); i++) {
                System.out.println((i + 1) + ") " + options.get(i));
            }

            System.out.print("Your answer (1-4): ");
            int answer;
            while (true) {
                try {
                    answer = scanner.nextInt();
                    if (answer < 1 || answer > options.size()) {
                        System.out.print("Invalid! Enter a number between 1–4: ");
                        continue;
                    }
                    break;
                } catch (InputMismatchException e) {
                    System.out.print("Invalid! Enter a number between 1–4: ");
                    scanner.next(); 
                }
            }

            userAnswers.add(answer - 1);
            System.out.println();
            questionNumber++;
        }

        // SUBMIT QUIZ – matches use case
        int score = quizService.calculateScore(userAnswers);

        System.out.println("=======================================");
        System.out.println("               YOUR SCORE              ");
        System.out.println("=======================================");
        System.out.println("Final Score: " + score + "/" + questions.size());
        System.out.println("=======================================");

        scanner.close();
    }
}
