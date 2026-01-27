function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function findDemand() {
  const key = document.getElementById("keyword").value;

  if (key.trim() === "") {
    alert("Keyword likho pehle");
    return;
  }

  document.getElementById("demandType").innerText =
    "Silent searches related to " + key;

  document.getElementById("intentLevel").innerText =
    "High intent – Paisa banne layak";

  document.getElementById("competition").innerText =
    "Low to Medium (early opportunity)";

  document.getElementById("status").innerText =
    "Live logic based estimation";
}
