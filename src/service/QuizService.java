package service;

import model.Question;
import java.util.*;

public class QuizService {

    private List<Question> questions;

    public QuizService() {
        this.questions = loadQuestions();
    }

    // LOAD QUESTIONS – matches "System loads questions" from use case
    private List<Question> loadQuestions() {
        List<Question> list = new ArrayList<>();

        list.add(new Question(
                "What is the capital of France?",
                Arrays.asList("Madrid", "Paris", "Rome", "Berlin"),
                1
        ));

        list.add(new Question(
                "Which planet is known as the Red Planet?",
                Arrays.asList("Earth", "Mars", "Jupiter", "Venus"),
                1
        ));

        list.add(new Question(
                "Who wrote 'Hamlet'?",
                Arrays.asList("Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"),
                1
        ));

        list.add(new Question(
                "What is the largest ocean?",
                Arrays.asList("Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"),
                2
        ));

        list.add(new Question(
                "Which gas do plants absorb from the atmosphere?",
                Arrays.asList("Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"),
                1
        ));

        // RANDOMIZE QUESTIONS (as specified)
        Collections.shuffle(list);

        return list;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    // SCORE QUIZ – matches “System evaluates the answers”
    public int calculateScore(List<Integer> userAnswers) {
        int score = 0;

        for (int i = 0; i < questions.size(); i++) {
            if (userAnswers.get(i) == questions.get(i).getCorrectIndex()) {
                score++;
            }
        }
        return score;
    }
}
