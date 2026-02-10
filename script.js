document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
        document.getElementById('hamburger').classList.toggle('active');
        document.getElementById('mobileMenu').classList.toggle('active');
    }

    if (e.target.matches('.nav-btn')) {
        const pageId = e.target.dataset.page || e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
        document.querySelectorAll('.page-section').forEach(function(page) {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        document.querySelectorAll(`.nav-btn[data-page="${pageId}"], .nav-btn[onclick*="${pageId}"]`).forEach(function(b) {
            b.classList.add('active');
        });

        window.scrollTo(0, 0);

        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }
});

window.addEventListener('scroll', function() {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }
});




const contactForm = document.getElementById('contact-form');
const resultDisplay = document.getElementById('result');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    resultDisplay.style.display = "block";
    resultDisplay.innerHTML = "Sending...";
    resultDisplay.style.color = "#ffffff";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                resultDisplay.innerHTML = "Message sent successfully!";
                resultDisplay.style.color = "#4ade80";
                contactForm.reset();
            } else {
                console.log(response);
                resultDisplay.innerHTML = json.message;
                resultDisplay.style.color = "#ef4444";
            }
        })
        .catch(error => {
            console.log(error);
            resultDisplay.innerHTML = "Something went wrong!";
            resultDisplay.style.color = "#ef4444";
        })
        .then(function() {
            setTimeout(() => {
                resultDisplay.style.display = "none";
            }, 5000);
        });
});
