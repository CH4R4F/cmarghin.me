const menuToggle = document.getElementById("toggle");
const nav = document.getElementById("mobileNav");
const lightMode = document.getElementById("light");
const darkMode = document.getElementById("dark");
const menuLines = document.querySelectorAll("#toggle span");
const everything = document.querySelectorAll("main > *:not(header)");
const logoPath = document.getElementById("Path_1");

const modeIcons = document.querySelector(".modeIcons");

const loadedContent = document.querySelectorAll(".load");

menuToggle.addEventListener("click", function () {
  let { state } = this.dataset;
  if (state == "closed") {
    this.dataset.state = "opened";
    darkMode.classList.add("hidden");
    lightMode.classList.add("hidden");
  } else {
    this.dataset.state = "closed";
    if (document.documentElement.classList.contains("dark")) {
      lightMode.classList.remove("hidden");
    } else {
      darkMode.classList.remove("hidden");
    }
  }
  nav.classList.toggle("opacity-0", state != "closed");
  nav.classList.toggle("!-z-30", state != "closed");
  everything.forEach((section) => {
    section.classList.toggle("hidden", state == "closed");
  });
  menuLines[1].classList.toggle("hidden", state == "closed");

  menuLines[0].classList.toggle("origin-[33%]", state == "closed");
  menuLines[2].classList.toggle("origin-[33%]", state == "closed");
  menuLines[0].classList.toggle("rotate-45", state == "closed");
  menuLines[2].classList.toggle("-rotate-45", state == "closed");
  menuLines[0].classList.toggle("w-8", state == "closed");
  menuLines[2].classList.toggle("w-8", state == "closed");
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    document.documentElement.classList.contains("dark") ? lightMode.classList.remove("hidden") : darkMode.classList.remove("hidden");
  }
});

modeIcons.addEventListener("click", (e) => {
  let id = e.target.id;
  let clr = id == "light" ? "#00062C" : "#ffff";
  id == "light" ? darkMode.classList.remove("hidden") : lightMode.classList.remove("hidden");

  document.documentElement.classList.toggle("dark", id == "dark");
  e.target.classList.add("hidden");
  logoPath.setAttribute("fill", clr);

  localStorage.theme = id;
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
    darkMode.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    lightMode.classList.add("hidden");
    logoPath.setAttribute("fill", "#00062C");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("load", !entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.5,
  }
);

loadedContent.forEach((element) => {
  observer.observe(element);
});
