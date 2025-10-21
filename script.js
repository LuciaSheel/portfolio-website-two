/*jslint browser:true*/
//Tell JSLint that document global variable is allowed
// Typewriter effect for hero message
const text = "Mature. Reliable. Early riser.";
const speed = 100; // Delay in milliseconds between each character
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index += 1;
        setTimeout(typeWriter, speed);
    }
}
// Start when page loads
window.onload = typeWriter;

// Get the "Back to Top" button
const backToTopBtn = document.getElementById("backToTop");

// Show button when user scrolls down a certain amount
window.onscroll = function () {
    if (window.scrollY > 300) { // Show when scrolled 300px
        backToTopBtn.style.display = "block";
    } else { // Hide the button
        backToTopBtn.style.display = "none";
    }
};

// Smooth scroll to top when button is clicked
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        behavior: "smooth",
        top: 0
    });
});

// Hamburger menu functionality
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");

hamburger.addEventListener("click", function () {
    navList.classList.toggle("active");
});

// Close menu when clicking on a nav link
navList.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        navList.classList.remove("active");
    }
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove("active");
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("wKVTxruCmaIFdqXpa");
})();

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validation
    if (name && email && message) {
        // Show sending message
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("responseMessage").textContent = "Sending your message, " + name + "...";

        // Send email using EmailJS
        emailjs.send("service_qucf25s", "template_29n64vc", {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(function(response) {
            // Success!
            document.getElementById("responseMessage").textContent = "Thanks for reaching out, " + name + "! I'll get back to you soon.";
            document.getElementById("contactForm").reset();
        }, function(error) {
            // Error
            document.getElementById("responseMessage").textContent = "Oops! Something went wrong. Please try again.";
            console.log("EmailJS error:", error);
        });
    } else {
        // Validation error
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("responseMessage").textContent = "Please fill in all fields.";
    }
});