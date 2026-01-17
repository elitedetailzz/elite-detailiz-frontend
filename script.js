document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const datetimeValue = document.getElementById("datetime").value;
  const vehiclePhotos = document.getElementById("vehiclePhotos").files;

  // Validate required fields
  if (!name || !email || !phone || !service) {
    alert("Please fill in all required fields.");
    return;
  }

  // Split date and time if provided
  let date = "";
  let time = "";
  if (datetimeValue.includes("T")) {
    [date, time] = datetimeValue.split("T");
  }

  // Build FormData for file upload
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("service", service);
  formData.append("date", date);
  formData.append("time", time);

  // Append all selected images
  for (let i = 0; i < vehiclePhotos.length; i++) {
    formData.append("vehiclePhotos", vehiclePhotos[i]);
  }

  // Determine backend URL
  const API_BASE =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://elite-detailiz-backend.onrender.com";

  try {
    const response = await fetch(`${API_BASE}/send-quote`, {
      method: "POST",
      body: formData // send as multipart/form-data
    });

    if (response.ok) {
      alert("✅ Quote sent successfully!");
      document.getElementById("quoteForm").reset();
    } else {
      alert("❌ Server error. Quote not sent.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Backend not reachable");
  }
});
