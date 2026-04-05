document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".choice-btn, .difficulty-btn, .mini-link, .yt-link");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "";
    });
  });
});
