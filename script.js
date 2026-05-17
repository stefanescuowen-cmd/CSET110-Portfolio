// Sidebar for mobile devices

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar-menu');
    const closeBtn = sidebar ? sidebar.querySelector('.close-btn') : null;

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
});


// Logo is unclickable on homepage, but on any other page
// it shall take you to it.

const logo = document.querySelector('.logo a');
if (window.location.pathname.endsWith("index.html")){
    if (logo) {
        logo.removeAttribute('href');
    }
}


// Back to top button

const goTopBtn = document.getElementById("goTopBtn")

if (goTopBtn) {
    goTopBtn.addEventListener("click", () =>{
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
