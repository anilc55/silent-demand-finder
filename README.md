<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Silent Demand Finder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f7fb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      margin: 30px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      font-size: 22px;
      color: #1e7f3b;
    }
    p {
      text-align: center;
      font-size: 14px;
      color: #555;
    }
    input {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
    button {
      width: 100%;
      margin-top: 12px;
      padding: 12px;
      background: #1e7f3b;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #166a30;
    }
    .result {
      margin-top: 20px;
    }
    .card {
      background: #f1fdf5;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    .card h3 {
      margin: 0 0 6px;
      font-size: 16px;
      color: #1e7f3b;
    }
    ul {
      padding-left: 18px;
      margin: 5px 0;
    }
    .score {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      color: #0b5d2a;
    }
  </style>
</head>

<body>

<div class="container">
  <h1>🔍 Silent Demand Finder</h1>
  <p>Hidden content demand discover karo — trend banne se pehle</p>

  <input type="text" id="keyword" placeholder="Enter keyword (e.g. AI tools for teachers)">
  <button onclick="analyze()">Find Silent Demand</button>

  <div id="output" class="result"></div>
</div>

<script>
function analyze() {
  const keyword = document.getElementById("keyword").value.trim();
  if (keyword === "") {
    alert("Keyword daalo bhai 🙂");
    return;
  }

  const nicheWords = ["how", "problem", "solution", "without", "low", "for", "small", "beginners"];
  const genericWords = ["news", "trending", "viral", "latest", "top"];

  let score = 50;

  nicheWords.forEach(word => {
    if (keyword.toLowerCase().includes(word)) score += 8;
  });

  genericWords.forEach(word => {
    if (keyword.toLowerCase().includes(word)) score -= 10;
  });

  if (score > 95) score = 95;
  if (score < 20) score = 20;

  const risingKeywords = [
    keyword + " without ads",
    "future of " + keyword,
    keyword + " for beginners",
    "low competition " + keyword,
    keyword + " problem solution"
  ];

  const contentIdeas = [
    "Why " + keyword + " will boom in next 6 months (Hindi)",
    "Hidden problems in " + keyword + " nobody talks about",
    keyword + " explained simply – for common people"
  ];

  let platform = "Blog";
  if (score > 70) platform = "YouTube + Reels";
  else if (score > 50) platform = "YouTube";
  else platform = "Blog / SEO";

  document.getElementById("output").innerHTML = `
    <div class="card">
      <h3>📈 Rising Keywords (Early Stage)</h3>
      <ul>${risingKeywords.map(k => `<li>${k}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>🎥 Content Ideas</h3>
      <ul>${contentIdeas.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>🚀 Best Platform</h3>
      <p>${platform}</p>
    </div>

    <div class="card">
      <h3>🔔 Silent Demand Score</h3>
      <div class="score">${score} / 100</div>
    </div>
  `;
}
</script>

</body>
</html>
