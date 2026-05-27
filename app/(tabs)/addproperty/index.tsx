import Screen1 from "@/components/addpropertiesscreens/screen1";
import Screen2 from "@/components/addpropertiesscreens/screen2";
import Screen3, {
  DocumentItem,
} from "@/components/addpropertiesscreens/screen3";
import Screen4 from "@/components/addpropertiesscreens/screen4";
import { AppText } from "@/components/AppText";
import StepProgress from "@/components/StepProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

/**
 * Add Property Screen
 *
 * USAGE GUIDE:
 * ============
 *
 * 1. Track the current step with state:
 *    const [currentStep, setCurrentStep] = useState(1);
 *
 * 2. Build the step status array for StepProgress component:
 *    - Each step needs { label, status: "done" | "current" | "todo" }
 *    - "done": Step completed (shows green checkmark)
 *    - "current": Current step (shows step number with green border)
 *    - "todo": Not yet reached (shows gray step number)
 *
 *    Example:
 *    const steps = [
 *      { label: "Details", status: currentStep > 1 ? "done" : currentStep === 1 ? "current" : "todo" },
 *      { label: "Value", status: currentStep > 2 ? "done" : currentStep === 2 ? "current" : "todo" },
 *      { label: "Documents", status: currentStep > 3 ? "done" : currentStep === 3 ? "current" : "todo" },
 *      { label: "Reviews", status: currentStep === 4 ? "current" : "todo" },
 *    ];
 *
 * 3. Implement your form content in renderStepContent():
 *    - Add form inputs for each step (TextInput, Picker, etc)
 *    - Manage form state with useState hooks
 *    - Return different JSX based on currentStep value
 *
 * 4. Update step navigation:
 *    - Back button: decrements currentStep
 *    - Next button: increments currentStep (changes to "Submit" on step 4)
 *
 * COMPONENTS USED:
 * - StepProgress: Displays the multi-step indicator with 4 steps
 * - AppText: Custom text component with font "quickRegular"
 * - SafeAreaView, ScrollView, View, TouchableOpacity: React Native base components
 */

interface AddPropertyFormValues {
  propertyName: string;
  purchaseDate: string;
  purchaseType: string;
  numberOfPlots: string;
  plotNumbers: string;
  pricePerPlot: string;
  documents: DocumentItem[];
}

const defaultDocuments: DocumentItem[] = [
  { key: "allocationLetter", label: "Allocation letter", status: "empty" },
  { key: "deedOfAssignment", label: "Deed of assignment", status: "empty" },
  { key: "companyReceipt", label: "Company receipt", status: "empty" },
  {
    key: "electronicReceipt",
    label: "Electronic receipt (if applicable)",
    status: "empty",
    optional: true,
  },
  {
    key: "otherDocument",
    label: "Other document (Optional)",
    status: "empty",
    optional: true,
  },
];

const defaultFormValues: AddPropertyFormValues = {
  propertyName: "",
  purchaseDate: "",
  purchaseType: "",
  numberOfPlots: "",
  plotNumbers: "",
  pricePerPlot: "",
  documents: defaultDocuments,
};

const documentSchema = Yup.object({
  status: Yup.string().oneOf(["empty", "uploaded"]).required(),
  optional: Yup.boolean(),
}).test(
  "required-document-uploaded",
  "Upload all required documents before continuing",
  (doc) => Boolean(doc?.optional || doc?.status === "uploaded"),
);

const validationSchema = Yup.object({
  propertyName: Yup.string()
    .trim()
    .min(2, "Type at least 2 characters")
    .required("Property name is required"),
  purchaseDate: Yup.string().trim().required("Purchasing date is required"),
  purchaseType: Yup.string().trim().required("Purchasing type is required"),
  numberOfPlots: Yup.number()
    .typeError("Enter a valid number")
    .integer("Use a whole number")
    .positive("At least 1 plot")
    .required("Number of plots is required"),
  plotNumbers: Yup.string().trim().required("Plot number is required"),
  pricePerPlot: Yup.number()
    .typeError("Enter a valid amount")
    .positive("Amount must be greater than 0")
    .required("Price per plot is required"),
  documents: Yup.array().of(documentSchema),
});

const stepValidationSchemas: Record<number, Yup.AnyObjectSchema> = {
  1: validationSchema.pick([
    "propertyName",
    "purchaseDate",
    "purchaseType",
    "numberOfPlots",
    "plotNumbers",
  ]),
  2: validationSchema.pick(["numberOfPlots", "pricePerPlot"]),
  3: validationSchema.pick(["documents"]),
  4: validationSchema,
};

const stepFields: Record<number, (keyof AddPropertyFormValues)[]> = {
  1: [
    "propertyName",
    "purchaseDate",
    "purchaseType",
    "numberOfPlots",
    "plotNumbers",
  ],
  2: ["numberOfPlots", "pricePerPlot"],
  3: ["documents"],
  4: [],
};

const AddProperty = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  const formik = useFormik<AddPropertyFormValues>({
    initialValues: defaultFormValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      setShowSubmitModal(true);
    },
  });

  const handleFieldChange = <K extends keyof AddPropertyFormValues>(
    field: K,
    value: AddPropertyFormValues[K],
  ) => {
    formik.setFieldValue(field, value);
  };

  const handleFieldBlur = (field: keyof AddPropertyFormValues) => {
    formik.setFieldTouched(field, true);
  };

  const handleDocumentUpload = (key: string, fileName: string) => {
    const nextDocuments = formik.values.documents.map((doc) =>
      doc.key === key
        ? {
            ...doc,
            status: "uploaded",
            fileName,
          }
        : doc,
    );
    formik.setFieldTouched("documents", true);
    formik.setFieldValue("documents", nextDocuments);
  };

  const resetAddPropertyFlow = () => {
    formik.resetForm();
    setCurrentStep(1);
    setShowSubmitModal(false);
    setHasSubmit(false);
  };

  const handleBackHome = () => {
    resetAddPropertyFlow();
    router.replace("/(tabs)");
  };

  const handleClose = () => {
    resetAddPropertyFlow();
    router.replace("/(tabs)");
  };

  const touchCurrentStep = () => {
    const nextTouched = stepFields[currentStep].reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {},
    );
    formik.setTouched({ ...formik.touched, ...nextTouched }, true);
  };

  const isCurrentStepValid = stepValidationSchemas[currentStep].isValidSync(
    formik.values,
  );

  const handleNext = async () => {
    touchCurrentStep();

    if (!isCurrentStepValid) return;

    if (currentStep === 4) {
      await formik.submitForm();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const steps: { label: string; status: "done" | "current" | "todo" }[] = [
    {
      label: "Details",
      status: currentStep > 1 ? "done" : currentStep === 1 ? "current" : "todo",
    },
    {
      label: "Value",
      status: currentStep > 2 ? "done" : currentStep === 2 ? "current" : "todo",
    },
    {
      label: "Documents",
      status: currentStep > 3 ? "done" : currentStep === 3 ? "current" : "todo",
    },
    {
      label: "Reviews",
      status: hasSubmit ? "done" : currentStep === 4 ? "current" : "todo",
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Screen1
            values={formik.values}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
      case 2:
        return (
          <Screen2
            values={formik.values}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
      case 3:
        return (
          <Screen3
            documents={formik.values.documents}
            onUpload={handleDocumentUpload}
            error={
              !formik.errors.documents
                ? undefined
                : typeof formik.errors.documents === "string"
                  ? formik.errors.documents
                  : "Upload all required documents before continuing"
            }
            touched={Boolean(formik.touched.documents)}
          />
        );
      case 4:
        return (
          <Screen4
            values={formik.values}
            documents={formik.values.documents}
            showSubmitModal={showSubmitModal}
            setShowSubmitModal={setShowSubmitModal}
            hasSubmit={hasSubmit}
            setHasSubmit={setHasSubmit}
            onBackHome={handleBackHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-col justify-between flex-1">
      <View className="flex-row items-center justify-between border-b border-gray-200 px-5 py-4">
        {currentStep <= 1 || hasSubmit ? (
          <TouchableOpacity className=" w-[10%]" onPress={handleClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className=" w-[10%]">
            <Ionicons
              name="chevron-back-outline"
              size={20}
              color="black"
              onPress={() => {
                setCurrentStep((prev) => Math.max(prev - 1, 1));
                if (hasSubmit) {
                  setHasSubmit(false);
                }
              }}
            />
          </TouchableOpacity>
        )}
        <AppText className="text-xl font-quickSemiBold">Add Property</AppText>
        <View className="w-6" />
      </View>

      <View className="px-5 w-full">
        <StepProgress steps={steps} />
      </View>

      <ScrollView
        className="flex-1 px-5 mt-3"
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      <View className="absolute bottom-8 left-0 right-0 bg-neutral/50 px-5 py-4">
        <View className="flex-row items-center justify-between gap-3">
          {/* <TouchableOpacity
            onPress={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="flex-1 rounded-3xl border border-gray-200 bg-white px-5 py-4"
          >
            <AppText className="text-center text-sm text-gray-600">
              Back
            </AppText>
          </TouchableOpacity> */}
          {!hasSubmit && (
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isCurrentStepValid}
              className={`flex-1 rounded-xl px-5 py-4 ${
                isCurrentStepValid ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <AppText className="text-center text-lg font-semibold text-white">
                {currentStep === 4 ? "Submit" : "Next"}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProperty;
