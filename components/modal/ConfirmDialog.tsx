import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <View className="p-4 text-center">
        <Text className="text-xl font-semibold mb-4">{title}</Text>
        <View className="mb-6">
          {typeof message === "string" ? (
            <Text className="text-pryClr">{message}</Text>
          ) : (
            message
          )}
        </View>
        <View className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {cancelText && (
            <TouchableOpacity
              onPress={onCancel}
              className="w-full md:w-1/2 h-[50px] rounded-lg border border-gray-300 disabled:opacity-50"
              disabled={isLoading}
            >
              <Text className="text-gray-600">{cancelText}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onConfirm}
            className="w-full md:w-1/2 h-[50px] bg-primary rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            <Text className="text-white">
              {isLoading ? "Please wait..." : confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
