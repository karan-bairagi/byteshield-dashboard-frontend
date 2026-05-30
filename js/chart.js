async function load_pure_html_chart() {
    let token = localStorage.getItem('access_token');
    let chartBox = document.getElementById('html-chart-box');    
    if (!chartBox) {
        console.error("DOM Initialization Error: Element 'html-chart-box' is missing in HTML structure.");
        return;
    }
    if (!token) {
        chartBox.innerHTML = '<p style="color:#ef4444; text-align:center; width:100%; font-size:14px;">Authentication Required. Redirecting...</p>';
        setTimeout(() => { window.location.href = "login.html"; }, 2000);
        return;
    }
    try {
        let response = await fetch('https://byteshield-gateway-backend.onrender.com/api/v1/dashboard/metrics/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let data = await response.json();
        if (response.status === 200) {
            chartBox.innerHTML = ''; 
            
            if (data && data.graph_data && data.graph_data.length > 0) {
                let maxHits = Math.max(...data.graph_data.map(item => item.hits !== undefined ? item.hits : 0)) || 1;
                for (let item of data.graph_data) {
                    let totalHits = item.hits !== undefined ? item.hits : 0;
                    let displayTime = item.time ? item.time : "00:00";
                    let barHeightPercent = (totalHits / maxHits) * 90;
                    if (barHeightPercent < 8) barHeightPercent = 8; 
                    chartBox.innerHTML += `
                        <div class="bar-wrapper">
                            <span class="bar-hits">${totalHits}</span>
                            <div class="bar" style="height: ${barHeightPercent}%;"></div>
                            <span class="bar-label">${displayTime}</span>
                        </div>
                    `;
                }
            } else {
                chartBox.innerHTML = '<p style="color:#94a3b8; text-align:center; width:100%; font-size:14px; padding:40px 0;">No security logs captured within the past 24 hours.</p>';
            }
        } else if (response.status === 401) {
            chartBox.innerHTML = '<p style="color:#ef4444; text-align:center; width:100%; font-size:14px;">Session expired. Re-authenticating...</p>';
            alert('Session Expired. Please login again.');
            window.location.href = 'index.html';
        } else {
            chartBox.innerHTML = `<p style="color:#ef4444; text-align:center; width:100%; font-size:14px;">Analytics Error: ${data.detail || 'Failed to sync telemetry timeline stream.'}</p>`;
        }
    } catch (error) {
        console.error("Critical Exception in load_pure_html_chart():", error);
        chartBox.innerHTML = '<p style="color:#ef4444; text-align:center; width:100%; font-size:14px;">Network Breakdown: Remote server unreachable or CORS policy blocked.</p>';
    }
}
