import React, { createContext, useContext, useState } from "react";

interface ForgotData {
  email: string;
  code: string;
  reset_token: string;
}

interface ForgotContextType {
  forgotData: ForgotData;
  updateForgotData: (data: Partial<ForgotData>) => void;
  resetForgotData: () => void;
}

const ForgotContext = createContext<ForgotContextType | undefined>(undefined);

export const ForgotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forgotData, setForgotData] = useState<ForgotData>({
    email: "",
    code: "",
    reset_token: "",
  });

  const updateForgotData = (data: Partial<ForgotData>) => {
    setForgotData((prev) => ({ ...prev, ...data }));
  };

  const resetForgotData = () => {
    setForgotData({
      email: "",
      code: "",
      reset_token: "",
    });
  };

  return (
    <ForgotContext.Provider value={{ forgotData, updateForgotData, resetForgotData }}>
      {children}
    </ForgotContext.Provider>
  );
};

export const useForgot = () => {
  const context = useContext(ForgotContext);
  if (!context) {
    throw new Error("useForgot must be used within a ForgotProvider");
  }
  return context;
};
