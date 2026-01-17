// =========================
// ===== MOBILE REDIRECT ====
// =========================
if (window.innerWidth <= 768) {
  // Change this to the path of your mobile HTML file
  window.location.href = "index-mobile.html";
}

// =========================
// ===== QUOTE FORM ========
// =========================
document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const datetimeInput = document.getElementById("datetime");
  const detailsInput = document.getElementById("vehicleDetails");

  if (!datetimeInput) {
    alert("Datetime input not found");
    return;
  }

  const datetimeValue = datetimeInput.value;

  let date = "";
  let time = "";

  if (datetimeValue.includes("T")) {
    [date, time] = datetimeValue.split("T");
  }

  const data = {
    name: document.querySelector("input[type='text']")?.value || "",
    email: document.querySelector("input[type='email']")?.value || "",
    phone: document.querySelector("input[type='tel']")?.value || "",
    service: document.querySelector("select")?.value || "",
    date: date,
    time: time,
    vehicleDetails: detailsInput?.value || ""
  };

  // ✅ Correct backend detection (file://, localhost, live)
  const API_BASE =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://elite-detailiz-backend.onrender.com";

  try {
    const response = await fetch(`${API_BASE}/send-quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("✅ Quote sent successfully!");
      document.getElementById("quoteForm").reset();
    } else {
      alert("❌ Server error");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Backend not reachable");
  }
});
