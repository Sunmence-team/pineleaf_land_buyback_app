// components/Modal.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface modalProps {
  children: React.ReactNode;
  onClose: () => void;
  showClose?: boolean;
  customMode?: boolean;
  visible?: boolean;
}

const Modal = ({
  children,
  onClose,
  showClose = true,
  customMode = false,
  visible = true,
}: modalProps) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      style={{
        borderWidth: 3,
        borderColor: "yellow"
      }}
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {customMode ? (
          children
        ) : (
          <View style={styles.container}>
            {showClose && (
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <View className="flex-1 bg-secondary w-10 h-10 items-center justify-center rounded-full">
                  {/* Simple close icon replacement */}
                 <Ionicons name="close-outline" size={22} />
                </View>
              </TouchableOpacity>
            )}

            {children}
          </View>
        )}
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)", // bg-black/80
    justifyContent: "flex-end",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 600, // approximates lg:w-1/2
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: "90%",
  },

  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 100,
    padding: 8,
  }
});