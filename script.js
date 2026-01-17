document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const datetimeInput = document.getElementById("datetime");
  const filesInput = document.getElementById("vehicleDetails");

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

  // Collect files
  const files = filesInput.files;
  const formData = new FormData();

  formData.append("name", document.getElementById("name").value || "");
  formData.append("email", document.getElementById("email").value || "");
  formData.append("phone", document.getElementById("phone").value || "");
  formData.append("service", document.getElementById("service").value || "");
  formData.append("date", date);
  formData.append("time", time);

  // Append multiple images
  for (let i = 0; i < files.length; i++) {
    formData.append("vehicleImages", files[i]);
  }

  // Correct backend detection (local vs production)
  const API_BASE =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://elite-detailiz-backend.onrender.com";

  try {
    const response = await fetch(`${API_BASE}/send-quote`, {
      method: "POST",
      body: formData // Use FormData for files
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
