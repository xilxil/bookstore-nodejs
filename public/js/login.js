const email = document.querySelector(".form-email");
const password = document.querySelector(".form-password");
const loginBtn = document.querySelector(".form-btn");
const error = document.querySelector(".error");
const url = window.location.href;
let loading = false;

if (loading == true) loginBtn.classList.add("disabled");
else loginBtn.classList.remove("disabled");

function validateEmail(value) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(value);
}
function validatePassword(value) {
	return value.length >= 8;
}

function validate() {
	const emailValid = validateEmail(email.value);
	const passwordValid = validatePassword(password.value);
	if (!(emailValid && passwordValid)) {
		loginBtn.classList.remove("disabled");
		loading = false;
		loginBtn.innerText = "Let's Go";
		error.style.opacity = 1;
	}
	return emailValid && passwordValid;
}

function login() {
	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value,
		}),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.error) {
				error.innerText = data.message;
				error.style.opacity = 1;
			} else {
				window.location.replace(window.location.origin);
			}
		})
		.catch((err) => {
			loginBtn.classList.remove("disabled");
			loading = false;
			loginBtn.innerText = "Let's Go";
			error.innerText = "Something went wrong! try again.";
			error.style.opacity = 1;
		});
}

loginBtn.addEventListener("click", () => {
	if (loading) return;
	console.log("object");
	loginBtn.classList.add("disabled");
	loading = true;
	loginBtn.innerText = "Hold on...";
	error.style.opacity = 0;
	validate() && login();
});