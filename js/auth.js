async function signup(e){
    let mybutton=document.getElementById('signup-button')
    try{
         e.preventDefault();
        let myform=document.getElementById('signup-form')
        let form=new FormData(myform)
        let plaindata=Object.fromEntries(form)
        mybutton.disabled = true;
        mybutton.classList.add('loading');
        for (let key of new FormData(myform).keys()){
            document.getElementById(`error-signup-${key}`).innerText='';
        }
        let response=await fetch('https://byteshield-gateway-backend.onrender.com/api/v1/auth/signup/',{
            'method':'POST',
            'headers':{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(plaindata)
        })
        let data=await response.json();
        if (response.status==201){
            localStorage.setItem('access_token',data.access_token)
            localStorage.setItem('refresh_token',data.refresh_token)
            window.location.href='dashboard.html'
            myform.reset();
            mybutton.disabled = false;
            mybutton.classList.remove('loading');
        }
        else{
            for (let field of Object.keys(data.errors)){
                let errorspan=document.getElementById(`error-signup-${field}`);
                if (errorspan){
                    errorspan.innerText=data.errors[field][0]
                }
            }
            mybutton.disabled = false;
            mybutton.classList.remove('loading');
        }
    }catch(error){
        mybutton.disabled = false;
        mybutton.classList.remove('loading');
        if (!navigator.onLine) {
            alert("No Internet Connection! Please check your network and try again.");
        }
        else {
            alert("Server is currently unreachable. We are experiencing technical difficulties, please try again later.");
        }
    }
}

async function login_user(e){
    let mybutton=document.getElementById('login-button')
    try{
        e.preventDefault();
        let myform=document.getElementById('login-form')
        let form=new FormData(myform)
        let plaindata=Object.fromEntries(form)
        for (let key of new FormData(myform).keys()){
            document.getElementById(`login-error-${key}`).innerText=''
        }
        document.getElementById('username-password-incorrect-error').innerText='';
        mybutton.disabled = true;
        mybutton.classList.add('loading');
        let response=await fetch('https://byteshield-gateway-backend.onrender.com/api/v1/auth/login/',{
            'method':'POST',
            'headers':{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(plaindata)
        })
        let data=await response.json();
        if (response.status==200){
            localStorage.setItem('access_token',data.access_token)
            localStorage.setItem('refresh_token',data.refresh_token)
            localStorage.setItem('current_page','dashboard')
            window.location.href='dashboard.html'
            myform.reset();
            mybutton.disabled = false;
            mybutton.classList.remove('loading');
        }
        if(response.status==401){
            document.getElementById('username-password-incorrect-error').innerText=data.detail;
        }
        mybutton.disabled = false;
        mybutton.classList.remove('loading');
        if(response.status==400){
            for (let field of Object.keys(data.errors)){
                let errorspan=document.getElementById(`login-error-${field}`);
                if(errorspan){
                    errorspan.innerText=data.errors[field][0]
                }
            }
        }
        mybutton.disabled = false;
        mybutton.classList.remove('loading');
    }catch(error){
        mybutton.disabled = false;
        mybutton.classList.remove('loading');
        if (!navigator.onLine) {
            alert("No Internet Connection! Please check your network and try again.");
        }
        else {
            alert("Server is currently unreachable. We are experiencing technical difficulties, please try again later.");
        }
    }

}


async function logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('current_page'); 
    window.location.href='index.html';
}







