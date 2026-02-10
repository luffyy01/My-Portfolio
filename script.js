document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
        document.getElementById('hamburger').classList.toggle('active');
        document.getElementById('mobileMenu').classList.toggle('active');
    }

    if (e.target.matches('.nav-btn')) {
        const pageId = e.target.dataset.page;
        
        document.querySelectorAll('.page-section').forEach(function(page) {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        document.querySelectorAll(`.nav-btn[data-page="${pageId}"]`).forEach(function(b) {
            b.classList.add('active');
        });

        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
        
        window.scrollTo(0, 0);
    }
});

const nav = document.querySelector('nav');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";

    if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const cards = document.querySelectorAll('.hover-3d');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xMid = rect.width / 2;
        const yMid = rect.height / 2;
        
        const rotateX = ((y - yMid) / yMid) * -5;
        const rotateY = ((x - xMid) / xMid) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

const contactForm = document.getElementById('contact-form');
const resultDisplay = document.getElementById('result');

if(contactForm) {
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
}
