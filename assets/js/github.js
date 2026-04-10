import { OWNER, REPO, TOKEN, WORKER_URL} from "./config.js";


export async function assignConditionBalanced() {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "assign-condition",
      owner: "cinntoastmin",
      repo: "gamified-feedback-research"
    })
  });

  const data = await res.json();
  return data.condition;
}




export async function logResponse({
    pageNumber,
    givenAnswer,
    correctAnswer,
    confidence,
    isCorrect,
    feedbackShown
}) {
    const participantId = localStorage.getItem("participant_id");

    const comment = `
        ### Page ${pageNumber}

        Answer Given: ${givenAnswer}
        Correct Answer: ${correctAnswer}
        Correct: ${isCorrect}
        Confidence: ${confidence}
        Feedback Shown: ${feedbackShown}
        Timestamp: ${new Date().toISOString()}
        `.trim();

    await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "add-comment",
            owner: "cinntoastmin",
            repo: "gamified-feedback-research",
            participantId,
            comment
        })
    });
}

export async function createParticipantIssue(condition){
    const pid = localStorage.getItem("participant_id");

    console.log(`Does pid match ${pid}`);

    const rep = await fetch(
        "https://survey-github-proxy.YOURNAME.workers.dev", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "create",
            owner: "cinntoastmin",
            repo: "gamified-feedback-research",
            body: {
                title: `Participant: ${participantId}`,
                labels: [condition],
                body: `
                Participant ID: ${participantId}
                Condition: ${condition}
                Initialized: ${new Date().toISOString()}
                `.trim()
            }
        })
    });


    console.log(rep.status);
}