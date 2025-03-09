window.onscroll = function() {
    let navbar = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = "#333";
    } else {
        navbar.style.backgroundColor = "#333";
    }
};

let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 500;
let lastClaim = localStorage.getItem("lastClaim") ? parseInt(localStorage.getItem("lastClaim")) : 0;
        const dailyButton = document.getElementById("daily-claim");
        const dailyMessage = document.getElementById("daily-message");
        let fakeMoney = localStorage.getItem("fakeMoney") ? parseInt(localStorage.getItem("fakeMoney")) : 100;
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
        let bitcoin = localStorage.getItem("bitcoin") ? parseInt(localStorage.getItem("bitcoin")) : 0;
        let bitcoinMiningUnlocked = localStorage.getItem("bitcoinMiningUnlocked") === "true";
        let multiplier = localStorage.getItem("multiplier") ? parseInt(localStorage.getItem("multiplier")) : 1;
        let autoMiningActive = localStorage.getItem("autoMiningActive") === "true";
        let hasBought2x = localStorage.getItem("hasBought2x") === "true";

        function updateBalances() {
            document.getElementById("bitdrevv-balance").innerText = bitdrevv;
            document.getElementById("coins-balance").innerText = coins;
            document.getElementById("bitcoin-balance").innerText = bitcoin;
            if (bitcoinMiningUnlocked) {
                document.getElementById("buy-bitcoin").classList.add("hidden");
                document.getElementById("mine-bitcoin").classList.remove("hidden");
                document.getElementById("sell-bitcoin").classList.remove("hidden");
            }
            if (autoMiningActive) {
                document.getElementById("buy-auto-mining").disabled = true;
            }
            const buyButton = document.getElementById("buy-2x");
            if (hasBought2x) {
                buyButton.disabled = true;
            }
        }

        function buyAutoMining() {
            if (coins >= 6500 && bitdrevv >= 500) {
                coins -= 6500;
                bitdrevv -= 500;
                autoMiningActive = true;
                localStorage.setItem("coins", coins);
                localStorage.setItem("bitdrevv", bitdrevv);
                localStorage.setItem("autoMiningActive", "true");
                alert("Auto-mining activated!");
                setInterval(mineBitDrevv, 5000);
            } else {
                alert("Not enough resources to buy auto-mining.");
            }
        }

        if (autoMiningActive) {
            setInterval(mineBitDrevv, 1000);
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

        function buyBitcoinMining() {
            if (coins >= 10000 && bitdrevv >= 1000) {
                coins -= 10000;
                bitdrevv -= 1000;
                bitcoinMiningUnlocked = true;
                localStorage.setItem("coins", coins);
                localStorage.setItem("bitdrevv", bitdrevv);
                localStorage.setItem("bitcoinMiningUnlocked", "true");
                updateBalances();
                alert("Bitcoin mining unlocked!");
            } else {
                alert("Not enough resources to unlock Bitcoin mining.");
            }
        }

        function mineBitcoin() {
            if (bitcoinMiningUnlocked) {
                bitcoin++;
                localStorage.setItem("bitcoin", bitcoin);
                updateBalances();
            }
        }

        function sellBitcoin() {
            if (bitcoin > 0) {
                coins += bitcoin * 50;
                bitcoin = 0;
                localStorage.setItem("coins", coins);
                localStorage.setItem("bitcoin", bitcoin);
                updateBalances();
            } else {
                alert("You have no Bitcoin to sell!");
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

        function updateAdminValues() {
            coins = parseInt(document.getElementById("admin-coins").value);
            fakeWallet = parseInt(document.getElementById("admin-wallet").value);
            localStorage.setItem("coins", coins);
            updateBalances();
            alert("Admin values updated.");
        }

        function promptPassword() {
            let password = prompt("Enter admin password:");
            if (password === "drevviannptiowafamilia@736473764726") {
                document.getElementById("admin-panel").classList.remove("hidden");
            } else {
                alert("Incorrect password!");
            }
        }

        function banUser() {
            alert("You are banned for 10 seconds!");
            document.body.innerHTML = "<h1>You are banned!</h1>";
            setTimeout(() => {
                location.reload();
            }, 10000);
        }

        updateBalances();
        
        let questClaimed = localStorage.getItem("questClaimed") === "true";
        let quest2Claimed = localStorage.getItem("quest2Claimed") === "true";
        
        function updateQuestStatus() {
            const claimButton = document.getElementById("claim-reward");
            if (bitdrevv >= 1000 && !questClaimed) {
                claimButton.disabled = false;
                claimButton.classList.add("enabled");
            } else {
                claimButton.disabled = true;
                claimButton.classList.remove("enabled");
            }
            
            const claimButton2 = document.getElementById("claim-reward2");
            if (bitdrevv >= 5000 && coins >= 10000 && !quest2Claimed) {
                claimButton2.disabled = false;
                claimButton2.classList.add("enabled");
            } else {
                claimButton2.disabled = true;
                claimButton2.classList.remove("enabled");
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
                document.getElementById("quest-title").classList.add("quest-completed");
            }
        }
        
        function claimReward2() {
            if (bitdrevv >= 5000 && coins >= 10000 && !quest2Claimed) {
                fakeMoney += 500;
                coins += 500;
                localStorage.setItem("fakeMoney", fakeMoney);
                localStorage.setItem("coins", coins);
                localStorage.setItem("quest2Claimed", "true");
                alert("Quest completed! You received 500 Fake Money and 500 Coins.");
                document.getElementById("claim-reward2").disabled = true;
                document.getElementById("quest2-title").classList.add("quest-completed");
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

        function resetProgress() {
            localStorage.clear();
            alert("Progress has been reset.");
            location.reload();
        }
        
        function goToMine() {
            document.getElementById("quest").style.display = "none";
            document.getElementById("mine").style.display = "block";
            document.getElementById("controls").style.display = "flex";
            placeAzureShard();
            placePlayer();
        }
        
        function placeAzureShard() {
            let shard = document.getElementById("azure-shard");
            let container = document.querySelector(".mine-container");
            let maxX = container.clientWidth - 40;
            let maxY = container.clientHeight - 40;
            shard.style.left = Math.random() * maxX + "px";
            shard.style.top = Math.random() * maxY + "px";
        }
        
        function placePlayer() {
            let player = document.getElementById("player");
            let container = document.querySelector(".mine-container");
            let maxX = container.clientWidth - 40;
            let maxY = container.clientHeight - 40;
            player.style.left = Math.random() * maxX + "px";
            player.style.top = Math.random() * maxY + "px";
        }
        
        function movePlayer(direction) {
            let player = document.getElementById("player");
            let container = document.querySelector(".mine-container");
            let left = parseInt(player.style.left || "0");
            let top = parseInt(player.style.top || "0");
            if (direction === "up" && top > 0) top -= 10;
            if (direction === "down" && top < container.clientHeight - 30) top += 10;
            if (direction === "left" && left > 0) left -= 10;
            if (direction === "right" && left < container.clientWidth - 30) left += 10;
            player.style.left = left + "px";
            player.style.top = top + "px";
            checkShardCollision();
        }

        function checkShardCollision() {
            let player = document.getElementById("player").getBoundingClientRect();
            let shard = document.getElementById("azure-shard").getBoundingClientRect();
            if (player.x < shard.x + shard.width && player.x + player.width > shard.x &&
                player.y < shard.y + shard.height && player.y + player.height > shard.y) {
                foundAzureShard = true;
                alert("You found the Azure Shard!");
                document.getElementById("mine").style.display = "none";
                document.getElementById("quest").style.display = "block";
                document.getElementById("claim-reward3").disabled = false;
                document.getElementById("claim-reward3").classList.add("enabled");
                document.getElementById("go-to-mine").disabled = true;
                document.getElementById("go-to-mine").classList.remove("enabled");
            }
        }

        let quest3Claimed = localStorage.getItem("quest3Claimed") === "true";
        let foundAzureShard = localStorage.getItem("foundAzureShard") === "true";
        let goToMineDisabled = localStorage.getItem("goToMineDisabled") === "true";

        function claimReward3() {
            if (foundAzureShard && !quest3Claimed) {
                fakeMoney += 200;
                coins += 500;
                localStorage.setItem("fakeMoney", fakeMoney);
                localStorage.setItem("coins", coins);
                localStorage.setItem("quest3Claimed", "true");
                localStorage.setItem("goToMineDisabled", "true");
                alert("Quest completed! You received 200 Fake Money and 500 Coins.");
                document.getElementById("claim-reward3").disabled = true;
                document.getElementById("claim-reward3").classList.add("disabled");
                document.getElementById("go-to-mine").disabled = true;
                document.getElementById("go-to-mine").classList.add("disabled");
                document.getElementById("quest3-title").classList.add("quest-completed");
            }
        }

        if (foundAzureShard) {
            let claimButton = document.getElementById("claim-reward3");
            claimButton.disabled = false;
            claimButton.classList.add("enabled");
        }

        if (goToMineDisabled) {
            let mineButton = document.getElementById("go-to-mine");
            mineButton.disabled = true;
            mineButton.classList.add("disabled");
        }

        if (questClaimed) {
            document.getElementById("quest-title").classList.add("quest-completed");
        }

        if (quest2Claimed) {
            document.getElementById("quest2-title").classList.add("quest-completed");
        }

        if (quest3Claimed) {
            document.getElementById("quest3-title").classList.add("quest-completed");
        }

function showPage(page) {
    document.getElementById("home").style.display = "none";
    document.getElementById("topup").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("daily").style.display = "none";
    document.getElementById("quest").style.display = "none";
    document.getElementById("mine").style.display = "none";
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