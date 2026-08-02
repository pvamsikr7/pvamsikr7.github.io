/*==================================================

Vamsi Krishna Portfolio
script.js
Part 1

- Mobile Navigation
- Sticky Navbar
- Smooth Scrolling
- Active Navigation
- Scroll Reveal
- Scroll To Top
- Floating Hero Cards

==================================================*/

"use strict";

/*==================================================
DOM Elements
==================================================*/

const navbar = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

/*==================================================
Mobile Navigation
==================================================*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");

    } else {

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    });

});

/*==================================================
Sticky Navbar
==================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

});

/*==================================================
Smooth Scrolling
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*==================================================
Active Navigation Highlight
==================================================*/

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

/*==================================================
Scroll Reveal Animation
==================================================*/

const revealElements = document.querySelectorAll(

    ".section-title, \
    .hero-left, \
    .hero-right, \
    .about-left, \
    .about-right, \
    .expertise-card, \
    .timeline-item, \
    .cert-card, \
    .education-card, \
    .contact-card"

);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.88;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if(top < trigger){

            el.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/*==================================================
Create Scroll To Top Button
==================================================*/

const topButton = document.createElement("div");

topButton.className = "top-btn";

topButton.innerHTML =

'<i class="fas fa-arrow-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        topButton.classList.add("show");

    }

    else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
Floating Hero Cards
==================================================*/

const floatingCards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth/2 - e.clientX)/35;
    const y = (window.innerHeight/2 - e.clientY)/35;

    floatingCards.forEach((card,index)=>{

        const speed = (index+1)*0.4;

        card.style.transform =

        `translate(${x*speed}px,${y*speed}px)`;

    });

});

/*==================================================
Hero Image Tilt
==================================================*/

const profileCard = document.querySelector(".profile-card");

if(profileCard){

profileCard.addEventListener("mousemove",(e)=>{

    const rect = profileCard.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x/rect.width)-0.5)*14;

    const rotateX = -((y/rect.height)-0.5)*14;

    profileCard.style.transform=

    `perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)`;

});

profileCard.addEventListener("mouseleave",()=>{

    profileCard.style.transform=

    "perspective(1000px) rotateX(0) rotateY(0)";

});

}

/*==================================================
Navbar Fade
==================================================*/

window.addEventListener("scroll",()=>{

    navbar.style.background=

    window.scrollY>30 ?

    "rgba(8,17,31,.92)"

    :

    "rgba(8,17,31,.75)";

});

/*==================================================
Simple Fade-In Class
==================================================*/

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},

{

threshold:.18

}

);

document.querySelectorAll(

".expertise-card,\
.timeline-item,\
.cert-card,\
.education-card,\
.contact-card"

).forEach(el=>{

observer.observe(el);

});

/*==================================================
End Part 1
==================================================*/
/*==================================================

Vamsi Krishna Portfolio
script.js
Part 2

- Typing Animation
- Animated Counters
- Tech Tag Animation
- Timeline Progress
- Particle Background
- Loading Screen
- Hero Text Animation
- Mouse Glow
- Parallax
- Random Floating Animation

==================================================*/

"use strict";

/*==================================================
Typing Animation
==================================================*/

const typingTarget = document.querySelector(".hero-left h2");

if (typingTarget) {

    const words = [
        "GenAI Architect",
        "Enterprise Solution Architect",
        "Cloud Architect",
        "AI Technical Leader",
        "Enterprise Technology Consultant"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const current = words[wordIndex];

        if (!deleting) {

            typingTarget.textContent =
                current.substring(0, charIndex++);

            if (charIndex > current.length) {

                deleting = true;

                setTimeout(typeEffect, 1700);

                return;
            }

        } else {

            typingTarget.textContent =
                current.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length)
                    wordIndex = 0;

            }

        }

        setTimeout(typeEffect, deleting ? 40 : 80);

    }

    typeEffect();

}

/*==================================================
Animated Statistics
==================================================*/

const statNumbers = document.querySelectorAll(".stat-card h1");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;

        const number = parseInt(element.textContent);

        let current = 0;

        const increment = Math.ceil(number / 80);

        const timer = setInterval(() => {

            current += increment;

            if (current >= number) {

                current = number;

                clearInterval(timer);

            }

            element.textContent = current + "+";

        }, 20);

        counterObserver.unobserve(element);

    });

});

statNumbers.forEach(num => counterObserver.observe(num));

/*==================================================
Technology Tag Hover Glow
==================================================*/

const tags = document.querySelectorAll(".tech-tags span");

tags.forEach(tag => {

    tag.addEventListener("mousemove", e => {

        const x = e.offsetX;
        const y = e.offsetY;

        tag.style.background =

            `radial-gradient(circle at ${x}px ${y}px,
            rgba(54,194,255,.7),
            rgba(54,194,255,.18))`;

    });

    tag.addEventListener("mouseleave", () => {

        tag.style.background = "";

    });

});

/*==================================================
Timeline Progress Bar
==================================================*/

const timeline = document.querySelector(".timeline");

const progress = document.createElement("div");

progress.style.position = "absolute";
progress.style.left = "50%";
progress.style.transform = "translateX(-50%)";
progress.style.top = "0";
progress.style.width = "4px";
progress.style.background = "#36C2FF";
progress.style.borderRadius = "20px";
progress.style.height = "0";

timeline.appendChild(progress);

window.addEventListener("scroll", () => {

    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();

    const total = timeline.offsetHeight;

    const visible = window.innerHeight - rect.top;

    const percent = Math.max(0, Math.min(visible / total, 1));

    progress.style.height = (percent * total) + "px";

});

/*==================================================
Background Particles
==================================================*/

const hero = document.querySelector("#hero");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        5 + Math.random() * 6 + "s";

    particle.style.animationDelay =
        Math.random() * 4 + "s";

    hero.appendChild(particle);

}

/*==================================================
Hero Fade
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*==================================================
Mouse Glow
==================================================*/

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

/*==================================================
Parallax Sections
==================================================*/

window.addEventListener("scroll", () => {

    const y = window.pageYOffset;

    document.querySelectorAll("section").forEach(section => {

        section.style.backgroundPositionY =
            y * 0.08 + "px";

    });

});

/*==================================================
Hero Image Floating
==================================================*/

const image = document.querySelector(".profile-card");

if (image) {

    setInterval(() => {

        image.animate([

            {

                transform:
                    "translateY(0px)"

            },

            {

                transform:
                    "translateY(-10px)"

            },

            {

                transform:
                    "translateY(0px)"

            }

        ], {

            duration: 3500,

            easing: "ease-in-out"

        });

    }, 3500);

}


document.querySelectorAll(".cert-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px) rotate(1deg)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



setInterval(() => {

    document.querySelectorAll(".floating-card")
        .forEach(card => {

            const x = (Math.random() * 8) - 4;

            const y = (Math.random() * 8) - 4;

            card.animate([

                {

                    transform:
                        `translate(${x}px,${y}px)`

                },

                {

                    transform:
                        "translate(0,0)"

                }

            ], {

                duration: 2500,

                easing: "ease-in-out"

            });

        });

}, 3000);



document.querySelectorAll(
".primary-btn,.secondary-btn,.resume-btn,.footer-resume")
.forEach(button => {

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=d+"px";
circle.style.height=d+"px";

circle.style.left=e.offsetX-d/2+"px";
circle.style.top=e.offsetY-d/2+"px";

circle.className="ripple";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});



console.log(

"%cVamsi Krishna Portfolio",

"color:#36C2FF;font-size:24px;font-weight:bold"

);

console.log(

"%cDesigned with HTML • CSS • JavaScript",

"color:white;font-size:14px"

);
