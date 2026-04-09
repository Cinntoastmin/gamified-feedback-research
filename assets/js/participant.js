async function initializeParticipant(){
    if(!localStorage.getItem("participant_id")) {
        localStorage.setItem("participant_id", crypto.randomUUID());
    }

    if(!localStorage.getItem("condition")) {
        const condition = await assignConditionBalanced();
        localStorage.setItem("condition", condition);
        await createParticipantIssue(condition);
    }
}