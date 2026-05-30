async function home() { 
    let statusContainer = document.getElementById('status_group');
    let techError = document.getElementById('Technical-error');
    let noDataEl = document.getElementById('no-data-availabel');
    if (techError) techError.innerText = '';
    if (noDataEl) noDataEl.innerText = '';
    try {
        let data = await security_fetch('https://byteshield-gateway-backend.onrender.com/api/v1/user/profile/', {'method':'GET'});
        if (!data) return;
        document.getElementById('count').innerText = data.count !== undefined ? data.count : "0";
        document.getElementById('average').innerText = data.avg?.average !== undefined && data.avg?.average !== null ? data.avg.average.toFixed(2) : "0.00";
        document.getElementById('here_username').innerText = data.username ? `Welcome ${data.username}` : "Welcome User";
        if (statusContainer) {
            statusContainer.innerHTML = '';
            if (data.status_group && data.status_group.length > 0) {
                for (let item of data.status_group) {
                    statusContainer.innerHTML += `<div>
                        <span>🔹 Status Code <b>${item.status_code}</b></span>
                        <span>Triggered <b>${item.group_count}</b> times</span>
                    </div>`;
                }
            } else if (noDataEl) {
                noDataEl.innerText = "No Status Data Available";
            }
        }
    } catch (error) {
        console.error("Critical Runtime Error in home():", error);
        if (techError) techError.innerText = 'Unable to connect to the server.';
    }
}
async function generate_api_key(e) {
    e.preventDefault();
    let input_box = document.getElementById('api_key');
    let errorSpans = document.querySelectorAll('[id^="error-"]');
    errorSpans.forEach(span => span.innerText = '');
    let key_name_input = document.getElementById('name_key');
    if (!key_name_input) return;
    let key_name = key_name_input.value;
    try {
        let data = await security_fetch('https://byteshield-gateway-backend.onrender.com/api/v1/api-keys/', {
            'method': 'POST',
            body: JSON.stringify({ "key_name": key_name })
        });
        if (!data) return;
        if (data.api_key) {
            if (input_box) {
                input_box.hidden = false;
                input_box.value = data.api_key;
            }
            allapikey();
        } else {
            if (data.errors) {
                for (let field of Object.keys(data.errors)){
                    let errorspan=document.getElementById(`error-${field}`);
                    if (errorspan){
                        errorspan.innerText=data.errors[field][0]
                    }
                }
            } else if (data.detail) {
                alert(data.detail);
            }
        }
    } catch (error) {
        console.error("Critical Runtime Error in generate_api_key():", error);
        alert("Failed to generate API Key due to network breakdown.");
    }
}
async function inactive(e, key_id) {
    e.preventDefault();
    try {
        let data = await security_fetch(`https://byteshield-gateway-backend.onrender.com/api/v1/api_key/inactive/?key_id=${key_id}`, {
            'method': 'PATCH',
        });
        if (!data) return;
        let currentStatusTd = document.getElementById(`status-${key_id}`);
        let currentButton = document.getElementById(`btn-${key_id}`);
        if (currentStatusTd && currentButton) {
            let statusResult = data.is_active;        
            if (statusResult === true || statusResult === "Active") {
                currentStatusTd.innerText = "Active";
                currentStatusTd.style.color = "green";
                currentButton.innerText = "Deactivate";
            } else {
                currentStatusTd.innerText = "Inactive";
                currentStatusTd.style.color = "red";
                currentButton.innerText = "Activate";
            }
        }
    } catch (error) {
        console.error("Critical Runtime Error in inactive():", error);
    }
}
async function allapikey() {
    let all_api = document.getElementById('all_data');
    let noKeysEl = document.getElementById('no-keys');
    let techErrKeys = document.getElementById('Technical-error-keys');
    if (!all_api) return;
    if (noKeysEl) noKeysEl.innerText = '';
    if (techErrKeys) techErrKeys.innerText = '';
    try {
        let data = await security_fetch('https://byteshield-gateway-backend.onrender.com/api/v1/api_key/all/', {
            'method': 'GET'
        });
        if (!data) return;
        all_api.innerHTML = '';
        if (data.user_all_api_key && data.user_all_api_key.length > 0) {
            for (let all_key of data.user_all_api_key) {
                let statusText = all_key.is_active ? "Active" : "Inactive";
                let statusColor = all_key.is_active ? "green" : "red";
                let cleanDate = "N/A";
                if (all_key.created_at) {
                    cleanDate = new Date(all_key.created_at).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    });
                }
                all_api.innerHTML += `
                <tr id="row-${all_key.id}">
                    <td>${all_key.key_name || 'Unnamed Key'}</td>
                    <td id="status-${all_key.id}" style="color: ${statusColor}; font-weight: bold;">${statusText}</td>
                    <td>${cleanDate}</td>
                    <td>
                        <button id="btn-${all_key.id}" onclick="inactive(event, ${all_key.id})">
                            ${all_key.is_active ? "Deactivate" : "Activate"}
                        </button>
                    </td>
                    <td>
                        <button id="remove-${all_key.id}" onclick="delete_key(event, ${all_key.id})">delete</button>
                    </td>
                </tr>`;
            }
        } else if (noKeysEl) {
            noKeysEl.innerText = 'API KEY Not Available';
        }
    } catch (error) {
        console.error("Critical Runtime Error in allapikey():", error);
        if (techErrKeys) techErrKeys.innerText = 'Failed to load keys data stack list.';
    }
}
async function delete_key(e, key_id) {
    if (!confirm("Are you sure you want to permanently delete this key?")) return;
    try {
        let data = await security_fetch(`https://byteshield-gateway-backend.onrender.com/api/v1/api_key/delete/?key_id=${key_id}`, {
            'method': 'DELETE',
        });
        if (!data) return;
        let fullRow = document.getElementById(`row-${key_id}`);
        if (fullRow) {
            fullRow.remove();
        }
        let all_api = document.getElementById('all_data');
        if (all_api && all_api.children.length === 0) {
            let noKeysEl = document.getElementById('no-keys');
            if (noKeysEl) noKeysEl.innerText = 'API KEY Not Available';
        }
    } catch (error) {
        console.error("Critical Runtime Error in delete_key():", error);
    }
}
async function company_name(e) {
    e.preventDefault();
    let current_name_input = document.getElementById('current_name');
    let errCompany = document.getElementById('error-company-name');
    let successUpdate = document.getElementById('success-update');   
    if (!current_name_input) return;
    if (errCompany) errCompany.innerText = ''; 
    try {
        let data = await security_fetch('https://byteshield-gateway-backend.onrender.com/api/v1/dashboard/charts/', {
            'method': 'PATCH',
            body: JSON.stringify({ 'company_name': current_name_input.value })
        });
        if (!data) return;
        if (data.company_name) {
            current_name_input.value = data.company_name || '';
            if (successUpdate) successUpdate.innerText = 'Updated successfully';
            setTimeout(function () {
                if (successUpdate) successUpdate.innerText = '';
                localStorage.setItem('current_page', 'dashboard');
            }, 1000);
        } else {
            if (errCompany) {
                errCompany.innerText = data.errors?.company_name ? data.errors.company_name[0] : (data.detail || 'Update Failed');
            }
        }
    } catch (error) {
        console.error("Critical Runtime Error in company_name():", error);
        if (errCompany) errCompany.innerText = 'Network connectivity failure.';
    }
}
async function load_company_name() {
    let current_name_input = document.getElementById('current_name');
    if (!current_name_input) return;
    try {
        let data = await security_fetch('https://byteshield-gateway-backend.onrender.com/api/v1/dashboard/charts/', {
            'method': 'GET',
        });
        if (data && data.current_name) {
            current_name_input.value = data.current_name || "";
        }
    } catch (error) {
        console.error("Critical Runtime Error in load_company_name():", error);
    }
}