import { conditionalExpTrigger } from "./experiment.js";
import { logResponse }  from "./github.js";

export function answerHandler({
    pageNumber,
    givenAnswer,
    correctAnswer,
    confidence
}) {
    const isCorrect = givenAnswer === correctAnswer;

    /**
    conditionalExpTrigger({
        isCorrect,
        pageNumber,
        givenAnswer,
        correctAnswer
    });*/

    logResponse({
        pageNumber,
        givenAnswer,
        correctAnswer,
        confidence,
        isCorrect,
        feedbackShown: !isCorrect && localStorage.getItem("condition") === "experimental"
    });
}