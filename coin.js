window.addEventListener("DOMContentLoaded", () => {
    const coinIcon = document.getElementById("coin-icon");
    const coinPopup = document.getElementById("coin-popup");
    const coinCount = document.getElementById("coin-count");
  
    // Function to refresh the popup content and counter
    window.updateCoinPopup = function () {
      const coinsList = JSON.parse(localStorage.getItem("coinsList")) || [];
      const totalCoins = coinsList.reduce((sum, item) => sum + item.coins, 0);
      coinCount.textContent = totalCoins;
  
      let content = `<p style="font-weight:bold;">💰 You’ve earned ${totalCoins} coins</p><hr>`;
      coinsList.slice().reverse().forEach(entry => {
        content += `<p style="font-size: 14px; margin: 5px 0;">
          ${entry.date}<br>
          <strong>${entry.product}</strong> - ${entry.quantity} tubes = ${entry.coins} coins
        </p>`;
      });
  
      coinPopup.innerHTML = content;
    };
  
    if (coinIcon && coinPopup && coinCount) {
      updateCoinPopup();
  
      coinIcon.addEventListener("click", (e) => {
        coinPopup.style.display = (coinPopup.style.display === "block") ? "none" : "block";
        e.stopPropagation();
      });
  
      document.addEventListener("click", (e) => {
        if (!coinIcon.contains(e.target) && !coinPopup.contains(e.target)) {
          coinPopup.style.display = "none";
        }
      });
    }
  });
  