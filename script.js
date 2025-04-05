async function getCropRecommendation() {
    const soil = document.getElementById("soil_type").value.trim().toLowerCase();
    const water = document.getElementById("water_content").value;
    const moisture = document.getElementById("moisture_content").value;
    const ph = document.getElementById("ph_value").value;
    const rain = document.getElementById("rain_availability").value;
  
    try {
        const response = await fetch("https://crop-backend-4kt5.onrender.com/predict_crop", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          soil_type: soil,
          water_content: water,
          moisture_content: moisture,
          ph_value: ph,
          rain_availability: rain
        })
      });
  
      if (!response.ok) {
        document.getElementById("result").innerHTML = "❌ Could not fetch crop recommendation. Please check your input.";
        return;
      }
  
      const data = await response.json();
  
      document.getElementById("result").innerHTML = `
        <strong>🌾 Recommended Crop:</strong> ${data.recommended_crop}<br>
        <strong>🌱 Fertilizer:</strong> ${data.fertilizer}<br>
        <strong>🐛 Pesticide:</strong> ${data.pesticide}
      `;
    } catch (error) {
      document.getElementById("result").innerHTML = `🚨 Error: ${error.message}`;
    }
  }
  