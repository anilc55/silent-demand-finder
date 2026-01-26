function findDemand() {
  const keyword = document.getElementById("keyword").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (keyword === "") {
    resultsDiv.innerHTML = "<p>❌ Keyword likho</p>";
    return;
  }

  const modifiers = [
    "for beginners",
    "without investment",
    "in Hindi",
    "free tools",
    "for students",
    "for teachers",
    "low competition",
    "AI based",
    "2026",
    "step by step"
  ];

  modifiers.forEach(mod => {
    const demandType = getDemandType(mod);
    const platform = suggestPlatform(mod);

    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <strong>${keyword} ${mod}</strong><br>
      <span class="tag">Demand: ${demandType}</span><br>
      <span class="tag">Best Platform: ${platform}</span>
    `;
    resultsDiv.appendChild(div);
  });
}

function getDemandType(mod) {
  if (mod.includes("2026") || mod.includes("AI")) return "🔥 Rising";
  if (mod.includes("free") || mod.includes("Hindi")) return "🟡 Silent";
  return "🟢 Stable";
}

function suggestPlatform(mod) {
  if (mod.includes("students") || mod.includes("teachers")) return "YouTube + App";
  if (mod.includes("tools") || mod.includes("AI")) return "Website / SaaS";
  return "YouTube / Blog";
}
