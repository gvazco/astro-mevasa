import { useEffect } from "react";

type Props = {
  slug: string;
  titulo: string;
  postId: number;
};

export const BudgetButton = ({ slug, titulo, postId }: Props) => {
  useEffect(() => {
    const button = document.getElementById(slug);

    const handleButtonClick = () => {
      const titulo = button?.getAttribute("data-titulo") ?? "";
      const slug = button?.getAttribute("data-slug") ?? "";
      const postId = button?.getAttribute("data-postid") ?? ""; // minúsculas

      if (titulo && slug && postId) {
        postTitle(titulo, slug, postId);
      } else {
        console.error("Error: Atributo faltante en el botón.");
      }
    };

    button?.addEventListener("click", handleButtonClick);

    // Cleanup event listener
    return () => {
      button?.removeEventListener("click", handleButtonClick);
    };
  }, [slug]);

  const postTitle = (titulo: string, slug: string, postId: string) => {
    console.log("Ejecutando postTitle");
    let cotizador = JSON.parse(localStorage.getItem("cotizador") || "[]");
    const exists = cotizador.some((item: any) => item.slug === slug);
    if (!exists) {
      cotizador.push({ titulo, slug, postId });
      localStorage.setItem("cotizador", JSON.stringify(cotizador));
      alert(`Título ${titulo} añadido al cotizador`);
    } else {
      alert(`El título ${titulo} ya está en el cotizador`);
    }
  };

  return (
    <div className="budget max-w-sm mx-auto w-full pr-1">
      <button
        id={slug}
        className={`w-full budget__button ${slug}`}
        data-postid={postId} // minúsculas
        data-titulo={titulo}
        data-slug={slug}
      >
        Ver en cotizador
      </button>
    </div>
  );
};
