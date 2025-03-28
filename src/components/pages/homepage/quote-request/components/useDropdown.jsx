import { useState } from "react";

/**
 * Custom hook for managing dropdown state
 *
 * @returns {Object} Object with isOpen state and toggle function
 */
export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, toggle };
}
