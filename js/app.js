function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function runFinder(){

  const keyword = document.getElementById("keyword").value.trim();
  const box = document.getElementById("results");
  box.innerHTML = "";

  if(keyword === ""){
    alert("Pehle keyword likho");
    return;
  }

  const demandData = [
    {
      tag:"WHY",
      text:`"${keyword}" ko log search karte hain par openly discuss nahi karte.`,
      score:"High emotional intent"
    },
    {
      tag:"HOW",
      text:`"${keyword}" beginners ke liye step-by-step kaise shuru kare.`,
      score:"Beginner + Course potential"
    },
    {
      tag:"PROBLEM",
      text:`"${keyword}" se related real problems jo log Google par chup-chaap search karte hain.`,
      score:"Pain-based monetization"
    },
    {
      tag:"COMPARE",
      text:`"${keyword}" vs alternatives — kaunsa better, sasta aur effective hai.`,
      score:"Buyer intent"
    },
    {
      tag:"MISTAKE",
      text:`"${keyword}" me beginners ki common galtiyan jo paisa aur time barbaad karti hain.`,
      score:"Education + Trust"
    },
    {
      tag:"SECRET",
      text:`"${keyword}" ke hidden tricks jo experts batate nahi.`,
      score:"High curiosity click"
    },
    {
      tag:"FUTURE",
      text:`"${keyword}" ka future scope aur earning potential.`,
      score:"Investor / long-term intent"
    }
  ];

  demandData.forEach(item=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="tag">${item.tag}</div>
      <div class="text">${item.text}</div>
      <div class="score">${item.score}</div>
    `;
    box.appendChild(div);
  });
}
