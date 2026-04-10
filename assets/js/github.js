import { OWNER, REPO, TOKEN, EXP_GRP_SIZE} from "./config.js";

export async function assignConditionBalanced(){
    const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/issues?labels=experimental&state=all`,
    {
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Accept": "application/vnd.github+json"
        }
    }
    );

    const issues = await res.json();
    return issues.length < EXP_GRP_SIZE ? "experimental" : "control";
}

export async function logResponse({
    pageNumber,
    givenAnswer,
    correctAnswer,
    confidence,
    isCorrect,
    feedbackShown,
}) {
    const uid = localStorage.getItem("participant_id")
    const issueNum = await findParticipantIssue()

    const body = 
    `
    ### Page ${pageNumber}

    Answer Given: ${givenAnswer}
    Correct Answer: ${correctAnswer}
    Correct: ${isCorrect}
    Confidence: ${confidence}
    Feedback Shown: ${feedbackShown}
    timestamp: ${new Date().toISOString()}
    `.trim();

    await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issueNum}`,
        {
            method: "POST",
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Accept": "application/vnd.github+json"
            },
            body: JSON.stringify({ body })
        }
    );
}

async function findParticipantIssue(){
    const pid = localStorage.getItem("participant_id");

    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=all&per_page=10`,
        {
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    const issues = await res.json();
    const issue = issues.find(i => i.title.includes(pid));

    if (!issue) {
        throw new Error("Participant issue not found!");
    }

    return issue.number;
}

async function createParticipantIssue(condition){
    const pid = localStorage.getItem("participant_id");

    await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`,
        {
            method: "POST",
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Accept": "application/vnd.github+json"
            },
            body: JSON.stringify({
                title: `Participant: ${pid}`,
                labels: [condition],
                body: 
                    `
                    Participant ID: ${pid}
                    Condition: ${condition}
                    Initialized: ${new Date().toISOString()}
                    `.trim()
            })
        }
    );
}