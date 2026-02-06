document.addEventListener("DOMContentLoaded", () => {

  /* 🎵 MUSIC */
  let musicStarted = false;
  window.startMusic = function () {
    if (!musicStarted) {
      document.getElementById("music").play();
      musicStarted = true;
    }
  };

  /* 💖 FLOATING HEARTS */
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = "5s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
  }, 400);

  /* 💘 CLICK HEART GAME */
  let clickScore = 0;
  let shown = false;

  window.clickHeart = function () {
    clickScore++;
    document.getElementById("clickScore").innerText = clickScore;

    if (clickScore === 100 && !shown) {
      shown = true;
      alert("You clicked the heart enough times to have it forever 💖\n");
    }
  };

  /* 🧠 MEMORY MATCH */
  const emojis = ["💖","💖","🌹","🌹","🐻","🐻"];
  const board = document.getElementById("memoryBoard");
  const msg = document.getElementById("memoryMessage");
  let first = null;
  let lock = false;
  let matches = 0;

  emojis.sort(() => Math.random() - 0.5);

  emojis.forEach(e => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerText = "❓";
    c.onclick = () => {
      if (lock || c === first || c.innerText !== "❓") return;
      c.innerText = e;
      if (!first) {
        first = c;
      } else {
        if (first.innerText === c.innerText) {
          matches++;
          msg.innerText = "Match! 💕";
          first = null;
          if (matches === emojis.length / 2) {
            msg.innerText = "All matched! 🥰";
          }
        } else {
          lock = true;
          setTimeout(() => {
            first.innerText = "❓";
            c.innerText = "❓";
            first = null;
            lock = false;
          }, 800);
        }
      }
    };
    board.appendChild(c);
  });

  /* 💬 QUIZ */
  window.quiz = function () {
    document.getElementById("quizResult").innerText =
      "WE LOVE EACHOTHER EQUALLYYY";
  };

  /* 💗 HEART CATCH GAME */
  const area = document.getElementById("catchArea");
  const basket = document.getElementById("basket");
  let score = 0;

  function moveBasket(x) {
    const rect = area.getBoundingClientRect();
    let pos = x - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width));
    basket.style.left = pos + "px";
  }

  area.addEventListener("mousemove", e => moveBasket(e.clientX));
  area.addEventListener("touchmove", e => {
    e.preventDefault();
    moveBasket(e.touches[0].clientX);
  });

  setInterval(() => {
    const h = document.createElement("div");
    h.innerText = "💗";
    h.style.position = "absolute";
    h.style.left = Math.random() * 90 + "%";
    h.style.top = "0";
    area.appendChild(h);

    const fall = setInterval(() => {
      h.style.top = h.offsetTop + 4 + "px";
      const hr = h.getBoundingClientRect();
      const br = basket.getBoundingClientRect();

      if (hr.bottom >= br.top && hr.left < br.right && hr.right > br.left) {
        score++;
        document.getElementById("catchScore").innerText = score;
        h.remove();
        clearInterval(fall);
      }

      if (h.offsetTop > area.clientHeight) {
        h.remove();
        clearInterval(fall);
      }
    }, 30);
  }, 900);

  /* ⌨️ LOVE TYPER */
  window.typeCheck = function () {
    if (document.getElementById("typeInput").value.toLowerCase() === "i love you") {
      document.getElementById("typeResult").innerText = "I LOVE U TOO CLARR 💖";
    }
  };

});