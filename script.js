function findDemand() {
  const keyword = document.getElementById("keyword").value.trim();
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!keyword) {
    results.innerHTML = "<div class='result'>❌ Pehle keyword likho</div>";
    return;
  }

  // BASIC SILENT DEMAND LOGIC (FREE)
  const ideas = [
    {
      tag: "WHY",
      text: `${keyword} log search kar rahe hain par openly discuss nahi karte`
    },
    {
      tag: "HOW",
      text: `${keyword} beginners ke liye simple kaise kare`
    },
    {
      tag: "PROBLEM",
      text: `${keyword} se related hidden problem jo Google par search hoti hai`
    },
    {
      tag: "COMPARE",
      text: `${keyword} vs alternative – kaunsa better hai`
    },
    {
      tag: "MISTAKE",
      text: `${keyword} me beginners ki common galtiyan`
    }
  ];

  ideas.forEach(item => {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `<span class="tag">${item.tag}</span><br>${item.text}`;
    results.appendChild(div);
  });
}

/* -------------------------
   MONETIZATION SYSTEM
-------------------------- */

function showPremium() {
  alert(
    "🚀 Premium Version Coming Soon!\n\n" +
    "✔ Real Google Trends\n" +
    "✔ Competition Score\n" +
    "✔ Viral Content Angle\n" +
    "✔ Export Report\n\n" +
    "Payment: ₹299/month (Planned)"
  );
}

/* -------------------------
   API READY STRUCTURE
-------------------------- */

/*
FUTURE API LOGIC (example):

async function fetchRealDemand(keyword) {
  const response = await fetch("https://api.yourservice.com/demand", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keyword })
  });

  const data = await response.json();
  return data;
}

NOTE:
- API KEY server-side pe rakho
- GitHub Pages = frontend only
- Real API ke liye backend (Node / Cloudflare / Replit) lagega
*/
