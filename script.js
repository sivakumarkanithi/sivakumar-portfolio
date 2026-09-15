/* =========================================================
   Sivakumar Kanithi — DevOps Portfolio
   1. Code-rain canvas background
   2. Web3Forms contact form submission
   3. Footer year
   ========================================================= */

/* ---------- 1. code rain ---------- */
(function codeRain() {
  var canvas = document.getElementById("matrix");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var chars = "01{}[]<>/\\|=+-*$#@&%;:ABCDEFKLMNPRSTVXZ".split("");
  var fontSize = 14;
  var width = 0, height = 0, columns = 0, drops = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.ceil(width / fontSize);
    drops = new Array(columns).fill(0).map(function () { return Math.random() * -50; });
  }
  resize();
  window.addEventListener("resize", resize);

  var frame = 0;
  (function draw() {
    requestAnimationFrame(draw);
    frame += 1;
    if (frame % 3 !== 0) return;

    ctx.fillStyle = "rgba(8, 10, 9, 0.22)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';

    for (var i = 0; i < columns; i++) {
      var char = chars[Math.floor(Math.random() * chars.length)];
      var y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.985
        ? "rgba(120, 240, 170, 0.55)"
        : "rgba(120, 240, 170, 0.16)";
      ctx.fillText(char, i * fontSize, y);
      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
  })();
})();

/* ---------- 2. contact form (Web3Forms) ---------- */
(function contactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var statusEl = document.getElementById("form-status");
  var button = form.querySelector('button[type="submit"]');
  var buttonText = document.getElementById("submit-text");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    statusEl.className = "form-status";
    statusEl.textContent = "";
    button.disabled = true;
    buttonText.textContent = "sending...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          statusEl.className = "form-status ok";
          statusEl.textContent = "Message sent — I'll reply soon.";
          form.reset();
        } else {
          statusEl.className = "form-status err";
          statusEl.innerHTML =
            (data.message || "Something went wrong sending your message.") +
            ' You can also email <a href="mailto:ksivakumar0829@gmail.com">ksivakumar0829@gmail.com</a>.';
        }
      })
      .catch(function () {
        statusEl.className = "form-status err";
        statusEl.innerHTML =
          'Network error. Please try again, or email <a href="mailto:ksivakumar0829@gmail.com">ksivakumar0829@gmail.com</a>.';
      })
      .finally(function () {
        button.disabled = false;
        buttonText.textContent = "send(message);";
      });
  });
})();

/* ---------- 3. footer year ---------- */
(function year() {
  var el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();
