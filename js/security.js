async function security_fetch(url, options = {}) {
    let error_display = document.getElementById('Technical-error');
    let token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['Content-Type'] = 'application/json';
    options.headers['Authorization'] = `Bearer ${token}`;
    try {
        let response = await fetch(url, options);
        if (response.ok) {
            if (error_display) error_display.innerText = '';
            return await response.json();
        }
        if (response.status == 401) {
            let data = await response.json();
            let refresh_token = localStorage.getItem('refresh_token');
            let refresh_response = await fetch('https://byteshield-gateway-backend.onrender.com/api/v1/auth/token/refresh/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'refresh': refresh_token })
            });  
            if (refresh_response.status == 200) {
                let refresh_data = await refresh_response.json();
                let new_access_token = refresh_data.access;
                localStorage.setItem('access_token', new_access_token);
                options.headers['Authorization'] = `Bearer ${new_access_token}`;
                let retry_response = await fetch(url, options);
                if (retry_response.ok) {
                    if (error_display) error_display.innerText = '';
                    return await retry_response.json();
                }
            } else {
                window.location.href = 'index.html';
                return;
            }
        }
        if (response.status==400){
            let data = await response.json();
            return data;
        }
        if (response.status == 403 || response.status == 429) {
            if (error_display) error_display.innerText = data.detail || 'Error occurred';
            return null;
        }
    } catch (error) {
        console.error("Fetch function crashed:", error);
        if (error_display) error_display.innerText = 'Unable to connect to the server.';
        return null;
    }
}