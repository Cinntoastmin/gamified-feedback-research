import { assignConditionBalanced } from "./github.js";
import { WORKER_URL } from "./config.js";


export async function initializeParticipant() {
  if (!localStorage.getItem("participant_id")) {
    localStorage.setItem("participant_id", crypto.randomUUID());
  }

  if (!localStorage.getItem("condition")) {
    const participantId = localStorage.getItem("participant_id");
    const condition = await assignConditionBalanced();

    localStorage.setItem("condition", condition);

    await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create-issue",
        owner: "cinntoastmin",
        repo: "gamified-feedback-research",
        participantId,
        condition
      })
    });
  }
}
