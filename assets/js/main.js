import { initializeParticipant } from "./participant.js"
import { answerHandler } from "./survey.js";
import { conditionalExpTrigger } from "./experiment.js";

document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("[data-page]")

    if(!root) return;

    const pageNumber = Number(root.dataset.page)
    if(Number.isNaN(pageNumber)) {
        console.error("invalid data-page value");
        return;
    }
    console.log(`Page number is valid: #${pageNumber}`)

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

            const shouldDelay = await answerHandler({
                pageNumber,
                givenAnswer,
                correctAnswer,
                confidence,
                goToNextPage
            });

            if(!shouldDelay){ goToNextPage(pageNumber); }
            
        } catch (err) {
            console.error("Error Submitting response", err);
            alert("Submission failed. please try again");
            if(submitButton) submitButton.disabled = false;
        }
    });
});

function goToNextPage(pageNum) {
    if(pageNum < 6) {
        window.location.href = `/gamified-feedback-research/survey_q${pageNum+1}`
    } else {
        window.location.href = "/gamified-feedback-research/survey_end";
    }
}

function accessAnswerKey(pageNumber){
    const ANSWER_KEY = {
        1:"B",
        2:"A",
        3:"C",
        4:"A",
        5:"B",
        6:"B"
    }

    return ANSWER_KEY[pageNumber];
}