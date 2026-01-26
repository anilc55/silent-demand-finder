function findDemand(){
  const keyword = document.getElementById("keyword").value;
  const box = document.getElementById("results");

  if(keyword.trim()===""){
    alert("Keyword likho");
    return;
  }

  box.innerHTML = `
    <div class="card">
      <div class="tag">WHY</div>
      Log "${keyword}" search kar rahe hain par openly discuss nahi karte
    </div>

    <div class="card">
      <div class="tag">HOW</div>
      ${keyword} beginners ke liye simple kaise kare
    </div>

    <div class="card">
      <div class="tag">PROBLEM</div>
      ${keyword} se related hidden problems
    </div>

    <div class="card">
      <div class="tag">COMPARE</div>
      ${keyword} vs alternatives
    </div>

    <div class="card">
      <div class="tag">MISTAKE</div>
      ${keyword} me beginners ki common galtiyan
    </div>
  `;
}
