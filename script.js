// Sidebar for mobile devices

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar-menu');
    const closeBtn = sidebar.querySelector('.close-btn');

    hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});


// Logo is unclickable on homepage, but on any other page
// it shall take you to it.

const logo = document.querySelector('.logo a');
if (window.location.pathname.endsWith("index.html")){
    logo.removeAttribute('href');
}


// Back to top button

const goTopBtn = document.getElementById("goTopBtn")

goTopBtn.addEventListener("click", () =>{
    window.scrollTo({ top: 0, behavior: "smooth" });
});