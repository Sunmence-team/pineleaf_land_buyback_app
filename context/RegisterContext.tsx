import React, { createContext, useContext, useState } from "react";

/**
 * Shared context for multi-step registration.
 */

interface RegisterData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

interface RegisterContextType {
  registerData: RegisterData;
  updateRegisterData: (data: Partial<RegisterData>) => void;
  resetRegisterData: () => void;
} 

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  const resetRegisterData = () => {
    setRegisterData({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <RegisterContext.Provider value={{ registerData, updateRegisterData, resetRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};
