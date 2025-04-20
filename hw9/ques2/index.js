const input = document.getElementById("passwordInput");
const toggleIcon = document.getElementById("icon");
const hint = document.getElementById("hint");
const title = document.getElementById("title");

toggleIcon.addEventListener('click', () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? 'text' : "password"


    if (isPassword) {
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye")

    }

    else {

        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash")

    }
})

passwordInput.addEventListener('input', () => {

    const password = passwordInput.value;

    if (password.length === 0) {
        hint.textContent = "Password input is empty"
        hint.style.color=" rgb(120, 120, 120)"
        title.style.color=" rgb(91, 162, 249)"
        toggleIcon.style.color=" rgb(91, 162, 249)"
        input.style.borderBottom=" 3px solid  rgb(91, 162, 249)"
    }
    else if (password.length < 7) {
        hint.textContent = "Min 8 characters with at insert one captal letter,a number and special charactert."
     hint.style.color="red"
       title.style.color="red"
       toggleIcon.style.color="red"
       input.style.borderBottom=" 3px solid red"
    }



    else {
        hint.textContent = "Password is good :)"
        hint.style.color=" rgb(120, 120, 120)"
        title.style.color=" rgb(91, 162, 249)"
        toggleIcon.style.color=" rgb(91, 162, 249)"
        input.style.borderBottom=" 3px solid  rgb(91, 162, 249)"

    }

})