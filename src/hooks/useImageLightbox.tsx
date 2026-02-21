import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LightboxState {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  images: { src: string; alt: string }[];
  currentIndex: number;
}

interface LightboxContextType {
  state: LightboxState;
  openImage: (src: string, alt?: string, images?: { src: string; alt: string }[]) => void;
  closeImage: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

const defaultState: LightboxState = {
  isOpen: false,
  imageSrc: "",
  imageAlt: "",
  images: [],
  currentIndex: 0,
};

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LightboxState>(defaultState);

  const openImage = useCallback((src: string, alt: string = "", images?: { src: string; alt: string }[]) => {
    const imageList = images || [{ src, alt }];
    const index = imageList.findIndex((img) => img.src === src);
    setState({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt,
      images: imageList,
      currentIndex: index >= 0 ? index : 0,
    });
  }, []);

  const closeImage = useCallback(() => {
    setState(defaultState);
  }, []);

  const nextImage = useCallback(() => {
    setState((prev) => {
      if (prev.images.length <= 1) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.images.length;
      const next = prev.images[nextIndex];
      return { ...prev, imageSrc: next.src, imageAlt: next.alt, currentIndex: nextIndex };
    });
  }, []);

  const prevImage = useCallback(() => {
    setState((prev) => {
      if (prev.images.length <= 1) return prev;
      const prevIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
      const prevImg = prev.images[prevIndex];
      return { ...prev, imageSrc: prevImg.src, imageAlt: prevImg.alt, currentIndex: prevIndex };
    });
  }, []);

  return (
    <LightboxContext.Provider value={{ state, openImage, closeImage, nextImage, prevImage }}>
      {children}
    </LightboxContext.Provider>
  );
};

export const useImageLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    console.warn("useImageLightbox: No LightboxProvider found, lightbox functionality disabled");
    return {
      state: defaultState,
      openImage: () => {},
      closeImage: () => {},
      nextImage: () => {},
      prevImage: () => {},
    };
  }
  return context;
};
