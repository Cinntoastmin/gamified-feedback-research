export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    const jsonResponse = (body, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });

    // ✅ Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const { action, owner, repo } = payload;
    if (!action || !owner || !repo) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    const githubHeaders = {
      "Authorization": `token ${env.GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "gamified-feedback-research-worker"
    };

    /* ---------- 1. Balanced condition assignment ---------- */
    if (action === "assign-condition") {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?labels=experimental&state=all&per_page=100`,
        { headers: githubHeaders }
      );

      const issues = await res.json();
      const condition = issues.length < 8 ? "experimental" : "control";

      return jsonResponse({ condition });
    }

    /* ---------- 2. Create participant issue ---------- */
    if (action === "create-issue") {
      const { participantId, condition } = payload;

      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          method: "POST",
          headers: githubHeaders,
          body: JSON.stringify({
            title: `Participant: ${participantId}`,
            labels: [condition],
            body: `
Participant ID: ${participantId}
Condition: ${condition}
Initialized: ${new Date().toISOString()}
            `.trim()
          })
        }
      );

      const data = await res.json();
      return jsonResponse(data, res.status);
    }

    /* ---------- 3. Add response comment ---------- */
    if (action === "add-comment") {
      const { participantId, comment } = payload;

      const listRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
        { headers: githubHeaders }
      );
      const issues = await listRes.json();

      const issue = issues.find(i =>
        i.title.includes(participantId)
      );

      if (!issue) {
        return jsonResponse({ error: "Participant issue not found" }, 404);
      }

      const commentRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issue.number}/comments`,
        {
          method: "POST",
          headers: githubHeaders,
          body: JSON.stringify({ body: comment })
        }
      );

      const data = await commentRes.json();
      return jsonResponse(data, commentRes.status);
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  }
};
``