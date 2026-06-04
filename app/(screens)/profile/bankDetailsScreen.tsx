import { AppText } from "@/components/AppText";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBanksService, resolveBankAccountService, updateBankAccountService } from "@/services/profileServices";
import Modal from "@/components/modal/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import EmptyStateCard from "@/components/cards/EmptyStateCard";
import { router } from "expo-router";

const EditScreen = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [bankName, setBankName] = useState(user?.bank_name || "");
  const [bankCode, setBankCode] = useState(user?.bank_code || "");
  const [accountNumber, setAccountNumber] = useState(user?.bank_account_number || "");
  const [accountName, setAccountName] = useState(user?.bank_account_name || "");

  const [showBankModal, setShowBankModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      setBankName(user.bank_name || "");
      setBankCode(user.bank_code || "");
      setAccountNumber(user.bank_account_number || "");
      setAccountName(user.bank_account_name || "");
    }
  }, [user]);

  const {
    data: banksResponse,
    isLoading: isLoadingBanks,
    refetch: refetchBanks,
  } = useQuery({
    queryKey: ["banksSearch", searchQuery],
    queryFn: () => getBanksService(searchQuery),
    enabled: showBankModal,
  });

  const banksList = Array.isArray(banksResponse?.data) ? banksResponse.data : [];

  const resolveMutation = useMutation({
    mutationFn: (payload: { account_number: string; bank_code: string }) =>
      resolveBankAccountService(payload),
    onSuccess: (response: any) => {
      const resolvedName = response?.data?.account_name;
      if (resolvedName) {
        setAccountName(resolvedName);
      }
    },
    onError: (err: any) => {
      setAccountName("");
      Toast.show({
        type: "error",
        text1: "Failed to resolve account",
        text2: err.response?.data?.message || err.message || "Invalid account number or bank selection.",
      });
    },
  });

  useEffect(() => {
    if (bankCode && accountNumber.length === 10) {
      resolveMutation.mutate({
        account_number: accountNumber,
        bank_code: bankCode,
      });
    }
  }, [bankCode, accountNumber]);

  const updateMutation = useMutation({
    mutationFn: (payload: {
      account_name: string;
      account_number: string;
      bank_name: string;
      bank_code: string;
    }) => updateBankAccountService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: data?.message || "Bank details updated successfully.",
      });
      router.back();
    },
    onError: (err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to update bank details",
        text2: err.response?.data?.message || err.message,
      });
    },
  });

  const handleSubmit = () => {
    if (!bankName || !bankCode) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select a bank.",
      });
      return;
    }
    if (accountNumber.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Account number must be 10 digits.",
      });
      return;
    }
    if (!accountName) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please wait for account name to be resolved.",
      });
      return;
    }

    updateMutation.mutate({
      account_name: accountName,
      account_number: accountNumber,
      bank_name: bankName,
      bank_code: bankCode,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        {/* Bank name */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Bank name</AppText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowBankModal(true)}
            style={[styles.input, { justifyContent: "center" }]}
          >
            <AppText style={{ color: bankName ? "black" : "#9CA3AF", fontSize: 16 }}>
              {bankName || "Select bank"}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Account number */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Account number</AppText>
          <TextInput
            placeholder="Account number"
            placeholderTextColor="#9CA3AF"
            value={accountNumber}
            onChangeText={(text) => setAccountNumber(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            maxLength={10}
            style={styles.input}
          />
        </View>

        {/* Account name */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Account name</AppText>
          <TextInput
            placeholder="Account name will be resolved"
            placeholderTextColor="#9CA3AF"
            value={accountName}
            editable={false}
            style={[styles.input, { backgroundColor: "#F5F5F5", color: "#666" }]}
          />
          {resolveMutation.isPending && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 }}>
              <ActivityIndicator size="small" color="#154A22" />
              <AppText style={{ fontSize: 13, color: "#666", fontFamily: "quickRegular" }}>
                Resolving account name...
              </AppText>
            </View>
          )}
        </View>

        <TouchableOpacity
          disabled={updateMutation.isPending}
          onPress={handleSubmit}
          style={styles.button}
        >
          {updateMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText style={styles.buttonText}>Submit</AppText>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showBankModal}
        customMode
        onClose={() => setShowBankModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end w-full">
          <View style={[styles.modalContainer, { paddingBottom: 10 }]} className="h-[75%]">
            <AppText className="mb-4 text-xl text-gray-900" style={{ fontFamily: "quickBold" }}>
              Select Bank
            </AppText>

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search banks..."
              placeholderTextColor="#9CA3AF"
              className="rounded-lg border font-quickRegular border-gray-200 bg-white px-3 h-12 text-base text-black mb-4"
            />

            {isLoadingBanks ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#154A22" />
              </View>
            ) : (
              <FlatList
                data={banksList}
                keyExtractor={(item: any) => item.id?.toString() || item.code}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setBankName(item.name || "");
                      setBankCode(item.code || "");
                      setShowBankModal(false);
                    }}
                    className="rounded-xl bg-secondary px-4 py-4 mb-3"
                  >
                    <AppText className="text-base text-gray-900 font-quickMedium">
                      {item.name}
                    </AppText>
                  </Pressable>
                )}
                onRefresh={refetchBanks}
                refreshing={isLoadingBanks}
                ListEmptyComponent={
                  isLoadingBanks ? null : (
                    <EmptyStateCard 
                      title={
                        searchQuery.trim() !== "" 
                          ? `No banks match search query - '${searchQuery}'` 
                          : "No banks found"
                      } 
                    />
                  )
                }
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
              />
            )}

            <Pressable
              onPress={() => setShowBankModal(false)}
              className="mt-2 mb-4 rounded-xl bg-gray-100 px-4 py-4"
            >
              <AppText className="text-center text-base text-gray-700 font-quickSemiBold">
                Cancel
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    marginTop: 30
  },

  secondContainer: {
    height: Platform.select({
      ios: "65%",
      android: "70%",
    }),
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 20,
    marginBottom: 12,
    color: "black",
    fontFamily: "quickSemiBold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 60,
    fontSize: 16,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#144520",
    height: Platform.select({
      ios: 60,
      android: 53,
    }),
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    height: 50,
    display: "flex",
    alignItems: "center",

  },

  modalContainer: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
