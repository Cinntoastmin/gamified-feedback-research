import { initializeParticipant } from "./participant.js"
import { handleAnswer } from "./survey.js";

initializeParticipant();

document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("[data-page]")

    if(!root) return;

    const pageNumber = Number(root.dataset.page)
    if(Number.isNaN(pageNumber)) {
        console.error("invalid data-page value");
        return;
    }

    if(pageNumber === 1) {
        try {
            await initializeParticipant();
        } catch (err) {
            console.error("Failed to init participant", err);
            alert("Initialization failed. please refresh and try again.");

        }
    }

    const form = document.getElementById("survey-form")
    if (!form) {
        console.warn("no survey form on this page.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector("button[type='submit']");
        if (submitButton) submitButton.disabled = true;

        try {
            const formData = new FormData(form);

            const givenAnswer = formData.get("answer");
            const confidence = formData.get("confidence");

            if (!givenAnswer || !confidence) {
                alert("please answer all questions before continuing.");
                if(submitButton) submitButton.disabled = false;
                return;
            }

            const correctAnswer = accessAnswerKey(pageNumber)

            await handleAnswer({
                pageNumber,
                givenAnswer,
                correctAnswer,
                confidence
            });

            goToNextPage(pageNumber);
        } catch (err) {
            console.error("Error Submitting response", err);
            alert("Submission failed. please try again");
            if(submitButton) submitButton.disabled = false;
        }
    });
});

function goToNextPage(pageNum) {
    if(pageNum < 6) {
        window.location.href = `/survey_q${pageNum+1}.html`
    } else {
        window.location.href = "/thanks.html";
    }
}

function accessAnswerKey(pageNumber){
    const ANSWER_KEY = {
        1:"a",
        2:"b",
        3:"c",
        4:"d",
        5:"a",
        6:"b"
    }

    return ANSWER_KEY[pageNumber];
}