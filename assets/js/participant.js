import { assignConditionBalanced, createParticipantIssue } from "./github.js";

export async function initializeParticipant(){
    if(!localStorage.getItem("participant_id")) {
        const uuid = crypto.randomUUID();
        localStorage.setItem("participant_id", uuid);
        console.log(`participants uuid: ${uuid}`)
    }

    if(!localStorage.getItem("condition")) {
        const condition = await assignConditionBalanced();
        localStorage.setItem("condition", condition);
        console.log(`participants condition: ${condition}`)
        await createParticipantIssue(condition);
    }
}