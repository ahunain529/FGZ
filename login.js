
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
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
const submit = document.getElementById('submit1');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    //inputs
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;
    const username = email.split('@')[0];

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // const username = "alihunain"; // Assuming you have extracted the username

            async function showAlert() {
                const result = await Swal.fire({
                    title: `<b>Welcome ${username}</b>`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    allowEscapeKey: false,  // Uncomment to disable Esc key closing
                });
            }
            showAlert().then(() => {
                console.log("This line will not execute until the user confirms the alert.");
            });

            window.location.href = "chatbot.html";

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

})

const showPasswordBtn = document.getElementById('show_pass');
const passwordInput = document.getElementById('password1');

showPasswordBtn.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = 'Hide password';
    } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = 'Show password';
    }
});

const forgotpassword = document.getElementById('fg_pass');
forgotpassword.addEventListener('click', function(){
    alert('For password query email at k213397@gmail.com');
})
