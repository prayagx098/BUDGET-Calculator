// UI SCRIPT

function shiftPanel(formId) {

    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    document.getElementById(formId).style.display = 'block';
    }


shiftPanel('login');




// LOGICAL

// register

function register(){
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;

    user = {
        username : username,
        email : email,
        password : password,
        transaction : []
    }

    console.log(user);
    if(username == '' || email == '' || password == '' || repassword == ''){
        alert("Enter the complete details to continue");
    }else{
        if(password === repassword){


            if(user.email in localStorage){
                alert("Uer Already Exist");
                console.log("User already Exist");
            }else{
                localStorage.setItem(user.email, JSON.stringify(user));
                alert("Registration Completed");
                shiftPanel('login');

            }
        }else{
            alert("Password does not Match");
        }
    }
}

localStorage.clear();
sessionStorage.clear();

// login

function login(){
    let email = document.getElementById('logEmail').value;
    let password = document.getElementById('logPass').value;

    if(email == '' || password == ''){
        alert("Enter the deatails");
    }else{
        let userData = localStorage.getItem(email);

        if (userData) {
            let user = JSON.parse(userData);
    
            if (user.password === password) {
                alert("Login successful");
                sessionStorage.setItem('userName',user.email)

                function initializeTransactionNumber() {
                    if (!localStorage.getItem('transactionNumber')) {
                        localStorage.setItem('transactionNumber', 1000);
                    }
                }

                initializeTransactionNumber();

                window.location="home.html"

            } else {
                alert("Incorrect password");
            }
        }else{
            alert("No User Found")
        }
    }


}