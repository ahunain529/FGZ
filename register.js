
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAWTIELrkLw89MT3tVRzmeBwsI4N1pdsIg",
    authDomain: "field-genie-71297.firebaseapp.com",
    projectId: "field-genie-71297",
    storageBucket: "field-genie-71297.appspot.com",
    messagingSenderId: "150048388304",
    appId: "1:150048388304:web:a37a25eb69011e3f861ad5"
};

//initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//submit buttons
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    //inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Sign up krdo
            const user = userCredential.user;
            async function showAlert() {
                const result = await Swal.fire({
                    title: `<b> Registering ${username}</b>`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false, 
                    allowEscapeKey: false,  // Uncomment to disable Esc key closing
                });
            }
            showAlert().then(() => {
                console.log("This line will not execute until the user confirms the alert.");
            });
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

})

const showPasswordBtn = document.getElementById('show_pass1');
const passwordInput = document.getElementById('password');

showPasswordBtn.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = 'Hide password';
    } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = 'Show password';
    }
});