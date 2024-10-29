if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const sliderContainers = document.querySelectorAll(".slider-container");
    const prevButtons = document.querySelectorAll(".prev");
    const nextButtons = document.querySelectorAll(".next");

    sliderContainers.forEach((sliderContainer, index) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      sliderContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        sliderContainer.classList.add("active");
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
      });

      sliderContainer.addEventListener("mouseleave", () => {
        isDown = false;
        sliderContainer.classList.remove("active");
      });

      sliderContainer.addEventListener("mouseup", () => {
        isDown = false;
        sliderContainer.classList.remove("active");
      });

      sliderContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2; // *2 para mayor desplazamiento
        sliderContainer.scrollLeft = scrollLeft - walk;
      });

      prevButtons[index].addEventListener("click", () => {
        sliderContainer.scrollBy({
          top: 0,
          left: -sliderContainer.clientWidth / 2, // Ajusta según el tamaño del item
          behavior: "smooth",
        });
      });

      nextButtons[index].addEventListener("click", () => {
        sliderContainer.scrollBy({
          top: 0,
          left: sliderContainer.clientWidth / 2, // Ajusta según el tamaño del item
          behavior: "smooth",
        });
      });
    });
  });
}
