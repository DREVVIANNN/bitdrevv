window.onscroll = function() {
    let navbar = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = "#222";
    } else {
        navbar.style.backgroundColor = "#333";
    }
};

let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0;
let lastClaim = localStorage.getItem("lastClaim") ? parseInt(localStorage.getItem("lastClaim")) : 0;
        const dailyButton = document.getElementById("daily-claim");
        const dailyMessage = document.getElementById("daily-message");
        let fakeMoney = localStorage.getItem("fakeMoney") ? parseInt(localStorage.getItem("fakeMoney")) : 0;
        document.getElementById("player-coins").innerText = coins;
        document.getElementById("fake-money").innerText = fakeMoney;
        
        function showPage(page) {
            document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
            document.getElementById(page).style.display = "block";
        }

        function toggleMenu() {
            document.getElementById("nav-links").classList.toggle("active");
        }

        function topUpCoin(cost, coinAmount) {
            let messageBox = document.getElementById("message");
            if (fakeMoney >= cost) {
                fakeMoney -= cost;
                coins += coinAmount;
                localStorage.setItem("fakeMoney", fakeMoney);
                localStorage.setItem("coins", coins);
                document.getElementById("fake-money").innerText = fakeMoney;
                document.getElementById("player-coins").innerText = coins;
                messageBox.innerText = "Transaction successful!";
                messageBox.className = "message success";
            } else {
                messageBox.innerText = "Transaction not successful. Not enough fake money.";
                messageBox.className = "message error";
            }
            messageBox.style.display = "block";
            setTimeout(() => { messageBox.style.display = "none"; }, 3000);
        }

        let bitdrevv = localStorage.getItem("bitdrevv") ? parseFloat(localStorage.getItem("bitdrevv")) : 0;
        let multiplier = localStorage.getItem("multiplier") ? parseInt(localStorage.getItem("multiplier")) : 1;
        let hasBought2x = localStorage.getItem("hasBought2x") === "true";

        function updateBalances() {
            document.getElementById("bitdrevv-balance").innerText = bitdrevv;
            document.getElementById("coins-balance").innerText = coins;
            const buyButton = document.getElementById("buy-2x");
            if (hasBought2x) {
                buyButton.disabled = true;
            }
        }

        function mineBitDrevv() {
            bitdrevv += multiplier;
            localStorage.setItem("bitdrevv", bitdrevv);
            updateBalances();
        }

        function sellBitDrevv() {
            if (bitdrevv > 0) {
                coins += bitdrevv;
                bitdrevv = 0;
                localStorage.setItem("coins", coins);
                localStorage.setItem("bitdrevv", bitdrevv);
                updateBalances();
            } else {
                alert("You have no BitDrevv to sell!");
            }
        }

        function buyMultiplier(multiplierValue, price) {
            if (coins >= price && !hasBought2x) {
                coins -= price;
                multiplier *= multiplierValue;
                hasBought2x = true;
                localStorage.setItem("coins", coins);
                localStorage.setItem("multiplier", multiplier);
                localStorage.setItem("hasBought2x", "true");
                updateBalances();
                alert("Purchase successful! Your mining power has permanently increased.");
            } else {
                alert("Not enough coins to buy this item.");
            }
        }

        updateBalances();
        
        let questClaimed = localStorage.getItem("questClaimed") === "true";
        
        function updateQuestStatus() {
            const claimButton = document.getElementById("claim-reward");
            if (bitdrevv >= 1000 && !questClaimed) {
                claimButton.disabled = false;
            } else {
                claimButton.disabled = true;
            }
        }
        
        function claimReward() {
            if (bitdrevv >= 1000 && !questClaimed) {
                fakeMoney += 100;
                coins += 500;
                localStorage.setItem("fakeMoney", fakeMoney);
                localStorage.setItem("coins", coins);
                localStorage.setItem("questClaimed", "true");
                alert("Quest completed! You received 100 Fake Money and 500 Coins.");
                document.getElementById("claim-reward").disabled = true;
            }
        }
        
        updateQuestStatus();

        function claimDaily() {
            let currentTime = Date.now();
            if (currentTime - lastClaim >= 86400000) { // 24 hours in milliseconds
                let reward = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
                coins += reward;
                localStorage.setItem("coins", coins);
                localStorage.setItem("lastClaim", currentTime);
                dailyMessage.innerText = `Success! You claimed ${reward} coins.`;
                dailyMessage.className = "message success";
                dailyButton.disabled = true;
                dailyButton.className = "disabled";
            } else {
                dailyMessage.innerText = "Daily login claim is not successful. Try again later.";
                dailyMessage.className = "message error";
            }
            dailyMessage.style.display = "block";
            setTimeout(() => { dailyMessage.style.display = "none"; }, 3000);
        }

        if (Date.now() - lastClaim < 86400000) {
            dailyButton.disabled = true;
            dailyButton.className = "disabled";
        }

function showPage(page) {
    document.getElementById("home").style.display = "none";
    document.getElementById("topup").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("daily").style.display = "none";
    document.getElementById("quest").style.display = "none";
    document.getElementById("credits").style.display = "none";
    document.getElementById(page).style.display = "block";
    
    let footer = document.getElementById("footer");
    if (page === "credits") {
        footer.style.display = "block";
    } else {
        footer.style.display = "none";
    }
}

function toggleMenu() {
    let navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}