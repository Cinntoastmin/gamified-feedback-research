import { conditionalExpTrigger } from "./experiment.js";
import { logResponse }  from "./github.js";

export function answerHandler({
    pageNumber,
    givenAnswer,
    correctAnswer,
    confidence,
    callback
}) {
    const isCorrect = givenAnswer === correctAnswer;

    logResponse({
        pageNumber,
        givenAnswer,
        correctAnswer,
        confidence,
        isCorrect,
        feedbackShown: !isCorrect && localStorage.getItem("condition") === "experimental"
    });

    return conditionalExpTrigger({
        isCorrect,
        pageNumber,
        givenAnswer,
        correctAnswer,
        callback
    });
}