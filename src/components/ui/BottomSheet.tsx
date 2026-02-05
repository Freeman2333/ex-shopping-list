import React, { useEffect } from "react";
import Icon from "../../assets/icons.tsx";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg z-50 transform translate-y-0 transition-transform duration-300 ease-out shadow-2xl">
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 bg-transparent border-0 outline-none"
          >
            <Icon.Close />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
