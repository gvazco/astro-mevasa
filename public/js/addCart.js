if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado y analizado");
    const buttons = document.querySelectorAll(".budget__button");
    buttons.forEach((button) => {
      if (button) {
        console.log("Botón encontrado: ", button);
        button.addEventListener("click", () => {
          const titulo = button.getAttribute("data-titulo");
          const slug = button.getAttribute("data-slug");
          const postId = button.getAttribute("data-postId");
          const image = button.getAttribute("data-image");
          postTitle(titulo, slug, postId, image);
        });
      } else {
        console.log("Botón no encontrado");
      }
    });
  });

  function postTitle(titulo, slug, postId, image) {
    console.log("Ejecutando postTitle");

    // Obtener los items existentes del local storage
    let cotizador = JSON.parse(localStorage.getItem("cotizador")) || [];

    // Verificar si ya existe un item con el mismo slug
    const exists = cotizador.some((item) => item.slug === slug);

    if (!exists) {
      // Añadir el nuevo item si no existe
      cotizador.push({
        titulo: titulo,
        slug: slug,
        postId: postId,
        image: image,
      });

      // Guardar de nuevo en el local storage
      localStorage.setItem("cotizador", JSON.stringify(cotizador));

      alert(`Título ${titulo} añadido al cotizador`);
    } else {
      alert(`El título ${titulo} ya está en el cotizador`);
    }
  }
}
