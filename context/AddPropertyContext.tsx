import React, { createContext, useContext, useState } from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { DocumentItem } from "@/lib/interfaces";
import { addPropertyService } from "@/services/propertiesServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";

export interface AddPropertyFormValues {
  property_id: string;
  property_name: string;
  purchase_date: string;
  purchase_type: string;
  number_of_plots: string;
  plot_numbers: string;
  price_per_plots: string;
  documents: DocumentItem[];
}

export const defaultDocuments: DocumentItem[] = [
  { key: "allocation_letter", label: "Allocation letter", status: "empty" },
  { key: "deed_of_assignment", label: "Deed of assignment", status: "empty" },
  { key: "company_receipt", label: "Company receipt", status: "empty" },
  {
    key: "electronic_receipt",
    label: "Electronic receipt (if applicable)",
    status: "empty",
    optional: true,
  },
  {
    key: "other_document",
    label: "Other document (Optional)",
    status: "empty",
    optional: true,
  },
];

export const defaultFormValues: AddPropertyFormValues = {
  property_id: "",
  property_name: "",
  purchase_date: "",
  purchase_type: "",
  number_of_plots: "",
  plot_numbers: "",
  price_per_plots: "",
  documents: defaultDocuments,
};

const documentSchema = Yup.object({
  status: Yup.string().oneOf(["empty", "uploaded"]).required(),
  optional: Yup.boolean(),
});

export const validationSchema = Yup.object({
  property_id: Yup.string().trim().required("Property selection is required"),
  property_name: Yup.string().trim().required("Property name is required"),
  purchase_date: Yup.string().trim().required("Purchasing date is required"),
  purchase_type: Yup.string().trim().required("Purchasing type is required"),
  number_of_plots: Yup.number()
    .typeError("Enter a valid number")
    .integer("Use a whole number")
    .positive("At least 1 plot")
    .required("Number of plots is required"),
  plot_numbers: Yup.string()
    .trim()
    .required("Plot number is required")
    .test(
      "plot-count-matches",
      "Plot numbers count must match the number of plots",
      function (value) {
        const { number_of_plots } = this.parent;
        if (!value || !number_of_plots) return true;

        const plots = value
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        const expected = Number(number_of_plots);
        if (Number.isNaN(expected)) return true;

        if (plots.length !== expected) {
          return this.createError({
            message: `You must enter exactly ${expected} plot number${expected === 1 ? "" : "s"} *separated by comma (you entered ${plots.length})`,
          });
        }
        return true;
      }
    ),
  price_per_plots: Yup.number()
    .typeError("Enter a valid amount")
    .positive("Amount must be greater than 0")
    .required("Price per plot is required"),
  documents: Yup.array().of(documentSchema),
});

export const stepValidationSchemas: Record<number, Yup.AnyObjectSchema> = {
  1: validationSchema.pick([
    "property_id",
    "property_name",
    "purchase_date",
    "purchase_type",
    "number_of_plots",
    "plot_numbers",
  ]),
  2: validationSchema.pick(["number_of_plots", "price_per_plots"]),
  3: validationSchema.pick(["documents"]),
  4: validationSchema,
};

export const stepFields: Record<number, (keyof AddPropertyFormValues)[]> = {
  1: [
    "property_id",
    "property_name",
    "purchase_date",
    "purchase_type",
    "number_of_plots",
    "plot_numbers",
  ],
  2: ["number_of_plots", "price_per_plots"],
  3: ["documents"],
  4: [],
};

interface AddPropertyContextType {
  formik: FormikProps<AddPropertyFormValues>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  showSubmitModal: boolean;
  setShowSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
  hasSubmit: boolean;
  setHasSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  submitMutation: any;
  resetAddPropertyFlow: () => void;
  isStepValid: (step: number) => boolean;
  touchStepFields: (step: number) => void;
}

const AddPropertyContext = createContext<AddPropertyContextType | undefined>(undefined);

export const AddPropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (values: AddPropertyFormValues) => {
      const formData = new FormData();
      formData.append("property_id", values.property_id);
      formData.append("purchase_date", values.purchase_date);
      formData.append("purchase_type", values.purchase_type);
      formData.append("number_of_plots", values.number_of_plots);
      formData.append("plot_numbers", values.plot_numbers);
      formData.append("price_per_plots", values.price_per_plots);

      const price = Number(values.price_per_plots.replace(/[^0-9]/g, ""));
      const plots = Number(values.number_of_plots.replace(/[^0-9]/g, ""));
      const total = String(price * plots);
      formData.append("total_value", total);

      // Add files
      values.documents.forEach((doc) => {
        if (doc.status === "uploaded" && doc.file) {
          formData.append(doc.key, {
            uri: doc.file.uri,
            name: doc.file.name,
            type: doc.file.type,
          } as any);
        }
      });

      const response = await addPropertyService(formData);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      setHasSubmit(true);
      setShowSubmitModal(false);
      showSuccessToast(data.message || "Property registered successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: any) => {
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Failed to register property");
      console.log(
        "FULL ERROR DETAILS:",
        JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
      );
    },
  });

  const formik = useFormik<AddPropertyFormValues>({
    initialValues: defaultFormValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      setShowSubmitModal(true);
    },
  });

  const resetAddPropertyFlow = () => {
    formik.resetForm();
    setCurrentStep(1);
    setShowSubmitModal(false);
    setHasSubmit(false);
  };

  const isStepValid = (step: number) => {
    return stepValidationSchemas[step].isValidSync(formik.values);
  };

  const touchStepFields = (step: number) => {
    const nextTouched = stepFields[step].reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {},
    );
    formik.setTouched({ ...formik.touched, ...nextTouched }, true);
  };

  return (
    <AddPropertyContext.Provider
      value={{
        formik,
        currentStep,
        setCurrentStep,
        showSubmitModal,
        setShowSubmitModal,
        hasSubmit,
        setHasSubmit,
        isSubmitting: submitMutation.isPending,
        submitMutation,
        resetAddPropertyFlow,
        isStepValid,
        touchStepFields,
      }}
    >
      {children}
    </AddPropertyContext.Provider>
  );
};

export const useAddProperty = () => {
  const context = useContext(AddPropertyContext);
  if (!context) {
    throw new Error("useAddProperty must be used within an AddPropertyProvider");
  }
  return context;
};
