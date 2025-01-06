import { useEffect, useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Product {
  title: string;
  alt: string;
  description: string;
  height: number;
  url: string;
  width: number;
}

type Props = {
  productgallery: Product[];
  postId: number;
};

export const ProductGallery = ({ productgallery, postId }: Props) => {
  const slides = productgallery.map((product) => ({
    src: product.url,
    alt: product.alt,
    width: product.width,
    height: product.height,
    title: product.title,
    description: product.description,
  }));

  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  return (
    <div className="product-gallery-container">
      <div className="product-gallery flex flex-row flex-wrap gap-3 mt-3 justify-center items-center">
        {productgallery.map((product, index) => (
          <div
            key={index}
            className="product-item"
            onClick={() => {
              setPhotoIndex(index);
              setOpen(true);
            }}
          >
            <img
              src={product.url}
              alt={product.alt}
              className="max-w-[55px] sm:max-w-[70px]"
            />
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          slides={slides}
          open={open}
          index={photoIndex}
          close={() => setOpen(false)}
          plugins={[Thumbnails]}
          thumbnails={{ ref: thumbnailsRef }}
          on={{
            // @ts-ignore
            click: () => {
              if (thumbnailsRef.current) {
                // @ts-ignore
                thumbnailsRef.current.visible
                  ? // @ts-ignore
                    thumbnailsRef.current.hide()
                  : // @ts-ignore
                    thumbnailsRef.current.show();
              }
            },
            // @ts-ignore
            slideChange: ({ index }) => setPhotoIndex(index),
          }}
        />
      )}
    </div>
  );
};
