import "../../styles/Gallery.css";
import { galleryImages } from "../Scripts/galleryImages.js";
import GalleryItem from "../GalleryItem.jsx";

function Gallery() {
  return (
    <div className="galery-wrapper">
      <ul className="galeria">
        {galleryImages.map((img, index) => (
          <GalleryItem key={index} src={img.src} alt={img.alt} />
        ))}
      </ul>
    </div>
  );
}

export default Gallery;
