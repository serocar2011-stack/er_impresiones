import "../styles/Gallery.css"


function GalleryItem({ src, alt }) {
  return (
    <li className="img_previsualizacion">
      <a href={src} target="_blank">
        <img src={src} alt={alt} />
      </a>
    </li>
  );
}

export default GalleryItem;