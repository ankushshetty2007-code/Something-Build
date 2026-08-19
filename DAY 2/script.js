/* =====================================================
   ANKUSH SHETTY PORTFOLIO
   JavaScript interactions
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const id = entry.target.getAttribute("id");

                navItems.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        threshold: 0.35
    }

);

sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☾";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeBtn.textContent =
        isLight ? "☾" : "☼";

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

});


/* =====================================================
   CURSOR GLOW
===================================================== */

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", event => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 1.5 + 0.3;

        this.speedX =
            (Math.random() - 0.5) * 0.25;

        this.speedY =
            (Math.random() - 0.5) * 0.25;

        this.opacity =
            Math.random() * 0.5 + 0.1;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(155,92,255,${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
            ? 45
            : 100;

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(67,133,255,${0.08 * (1 - distance / 120)})`;

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =====================================================
   CARD TILT EFFECT
===================================================== */

const tiltCards =
    document.querySelectorAll(".tilt-card");

tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 25;

            const rotateY =
                (centerX - x) / 25;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        }
    );

});


/* =====================================================
   STATISTICS COUNTER
===================================================== */

const statNumbers =
    document.querySelectorAll(
        ".stat-number"
    );

const statsSection =
    document.querySelector(
        ".stats-grid"
    );

let statsAnimated = false;


function animateNumbers() {

    if (statsAnimated)
        return;

    statsAnimated = true;


    statNumbers.forEach(number => {

        const target =
            Number(
                number.dataset.target
            );

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 40)
            );


        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                number.textContent =
                    current;

            }, 30);

    });

}


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (
                entries[0].isIntersecting
            ) {

                animateNumbers();

            }

        },

        {
            threshold: 0.4
        }

    );


statsObserver.observe(statsSection);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "Please complete all fields.";

            return;

        }


        formMessage.textContent =
            `Thanks, ${name}! Your message is ready to send.`;

        contactForm.reset();


        setTimeout(() => {

            formMessage.textContent = "";

        }, 5000);

    }
);


/* =====================================================
   SMOOTH BUTTON FEEDBACK
===================================================== */

document
    .querySelectorAll(".btn, .project-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.style.transform =
                    "scale(0.97)";

                setTimeout(() => {

                    button.style.transform =
                        "";

                }, 120);

            }
        );

    });


/* =====================================================
   PARALLAX HERO VISUAL
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );

window.addEventListener(
    "scroll",
    () => {

        if (!heroVisual)
            return;

        const scrollY =
            window.scrollY;

        if (scrollY < window.innerHeight) {

            heroVisual.style.transform =
                `translateY(${scrollY * 0.08}px)`;

        }

    }
);