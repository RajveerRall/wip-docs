// src/components/ImageLightbox.tsx
import React, { useState, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ImageLightbox.module.css';

type Props = {
  src: string; // Image source
  alt: string; // Alt text for accessibility
  caption?: ReactNode; // Optional: caption to display below the image
  className?: string; // Optional: additional class for the wrapper <figure> element
  // Remove thumbnailWidth and thumbnailHeight as props if Docusaurus handles sizing
};

const ImageLightbox: React.FC<Props> = ({
  src,
  alt,
  caption,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  return (
    <>
      {/*
        Use a <figure> for semantic grouping of image and caption.
        Docusaurus themes might already style <figure> and <figcaption>.
        The .clickableImageWrapper is primarily for the onClick.
      */}
      <figure className={clsx(styles.clickableImageWrapper, className)}>
        <img
          src={src}
          alt={alt}
          // No inline styles for width/height here, let Docusaurus/CSS handle it
          // className={styles.inlineImage} // Add this class for specific clickable styling if needed
          onClick={openLightbox}
          loading="lazy"
        />
        {caption && (
          <figcaption className={styles.imageCaption}> {/* Style caption if needed */}
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className={styles.lightboxOverlay}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${alt}`}
        >
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close image"
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ImageLightbox;