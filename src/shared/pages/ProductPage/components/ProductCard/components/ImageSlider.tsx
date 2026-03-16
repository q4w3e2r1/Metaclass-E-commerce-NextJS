'use client';
import { ArrowDownIcon } from '@components';

import { useState } from 'react';

import Image from 'next/image';

import styles from './ImageSlider.module.scss';

type ImageSliderProps = {
  images: string[];
  alt: string;
};

export const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  if (images.length === 1) {
    return (
      <div className={styles.slider}>
        <Image
          src={images[0]}
          alt={alt}
          width={600}
          height={600}
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div className={styles.slider}>
      <div className={styles.imageWrapper}>
        <Image
          src={images[current]}
          alt={alt}
          width={600}
          height={600}
          className={styles.image}
        />

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          aria-label="Previous image"
        >
          <ArrowDownIcon
            fill="white"
            style={{ transform: 'rotate(90deg)', display: 'block' }}
          />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          aria-label="Next image"
        >
          <ArrowDownIcon
            fill="white"
            style={{ transform: 'rotate(-90deg)', display: 'block' }}
          />
        </button>
      </div>

      <div className={styles.thumbnails}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.thumbnail} ${i === current ? styles.thumbnailActive : ''}`}
            onClick={() => setCurrent(i)}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              width={80}
              height={80}
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
