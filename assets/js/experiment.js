export function conditionalExpTrigger({
    isCorrect,
    pageNumber,
    givenAnswer,
    correctAnswer
}) {
    const condition = localStorage.getItem("condition");

    if (!isCorrect || condition !== "experimental") {
        return;
    }

    expTrigger({
        pageNumber,
        givenAnswer,
        correctAnswer
    })
}

function expTrigger(data) {
    // exp implementation goes here
}