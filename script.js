const form = document.getElementById("quoteForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", document.getElementById("name").value);
  data.append("email", document.getElementById("email").value);
  data.append("phone", document.getElementById("phone").value);
  data.append("service", document.getElementById("service").value);

  const datetimeValue = document.getElementById("datetime").value;
  let date = "", time = "";
  if (datetimeValue.includes("T")) [date, time] = datetimeValue.split("T");
  data.append("date", date);
  data.append("time", time);

  const fileInput = document.getElementById("vehicleImage");
  if (fileInput.files[0]) data.append("vehicleImage", fileInput.files[0]);

  const API_BASE =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://elite-detailiz-backend.onrender.com";

  try {
    const response = await fetch(`${API_BASE}/send-quote`, {
      method: "POST",
      body: data
    });

    if (response.ok) {
      alert("✅ Quote sent successfully!");
      form.reset();
    } else {
      alert("❌ Server error");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Backend not reachable");
  }
});
