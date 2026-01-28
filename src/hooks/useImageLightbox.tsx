import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LightboxState {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
}

interface LightboxContextType {
  state: LightboxState;
  openImage: (src: string, alt?: string) => void;
  closeImage: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const openImage = useCallback((src: string, alt: string = "") => {
    setState({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt,
    });
  }, []);

  const closeImage = useCallback(() => {
    setState({
      isOpen: false,
      imageSrc: "",
      imageAlt: "",
    });
  }, []);

  return (
    <LightboxContext.Provider value={{ state, openImage, closeImage }}>
      {children}
    </LightboxContext.Provider>
  );
};

export const useImageLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useImageLightbox must be used within a LightboxProvider");
  }
  return context;
};
