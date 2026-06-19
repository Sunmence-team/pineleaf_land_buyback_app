import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import StatusCard from "@/components/cards/StatusCard";
import CustomModal from "@/components/modal/CustomModal";
import Modal from "@/components/modal/Modal";
import { globals } from "@/lib/constants";
import {
  formatISODateToYYYYMMDD,
  formatterUtility,
} from "@/helpers/formatterUtility";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import {
  acceptPropertyOfferService,
  declinePropertyOfferService,
  getPropertyDetailsService,
} from "@/services/propertiesServices";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View, Pressable, TouchableOpacity } from "react-native";

const Offer = () => {
  const { offerId } = useLocalSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<"accept" | "decline">(
    "accept",
  );
  const [selectedBranch, setSelectedBranch] = React.useState<string | null>(
    null,
  );
  const [showBranchModal, setShowBranchModal] = React.useState(false);

  const fetchPropertyDetails = () => getPropertyDetailsService(Number(offerId));

  const {
    data: offer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["propertyDetails", offerId],
    queryFn: fetchPropertyDetails,
    enabled: !!offerId,
  });

  const acceptOfferMutation = useMutation({
    mutationFn: ({ branch }: { branch: string }) =>
      acceptPropertyOfferService(Number(offerId), branch),
    onSuccess: () => {
      showSuccessToast("Offer Accepted Successfully");
      setModalType("accept");
      setOpenModal(false);
    },
    onError: (err: any) => {
      showErrorToast(
        err.response?.data?.message || err.message || "Failed to accept offer",
      );
      console.error("Accept offer failed:", err);
    },
  });

  const declineOfferMutation = useMutation({
    mutationFn: () => declinePropertyOfferService(Number(offerId)),
    onSuccess: () => {
      showSuccessToast("Offer Declined Successfully");
      setModalType("decline");
      setOpenModal(true);
    },
    onError: (err: any) => {
      showErrorToast(
        err.response?.data?.message || err.message || "Failed to decline offer",
      );
      console.error("Decline offer failed:", err);
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading offer details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading offer: {error.message}</Text>
      </View>
    );
  }

  const handleAcceptOffer = () => {
    if (!selectedBranch) {
      showErrorToast("Please select a branch");
      return;
    }

    acceptOfferMutation.mutate({
      branch: selectedBranch,
    });
  };

  const handleDeclineOffer = () => {
    declineOfferMutation.mutate();
  };

  const handleProceed = () => {
    setOpenModal(false);

    setTimeout(() => {
      if (modalType === "accept") {
        router.push("/(tabs)");
      } else {
        router.push("/(tabs)/properties");
      }
    }, 500);
  };

  return (
    <View
      className="flex-1 bg-secondary pt-6"
      style={{ paddingHorizontal: 20 }}
    >
      <View>
        <ScrollView
          style={{ borderRadius: 20 }}
          className="bg-white border border-gray-200 rounded-lg p-5 mb-4 w-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="border border-gray-300 rounded-xl p-4">
            <View className="flex-row justify-between items-start mb-4">
              <AppText className="text-xl capitalize" style={{ fontFamily: "quickSemiBold" }}>
                {offer?.property?.name}
              </AppText>

              <StatusCard currentStatus={offer?.offer_status} />
            </View>

            <View className="flex-row justify-between mb-4">
              <View>
                <AppText
                  style={{ fontFamily: "quickMedium" }}
                  className="text-lg"
                >
                  Plot
                </AppText>
                <AppText style={{ fontFamily: "quickMedium" }}>
                  {offer?.number_of_plots || 0}
                </AppText>
              </View>
              <View>
                <AppText
                  style={{ fontFamily: "quickMedium" }}
                  className="text-lg"
                >
                  Purchased value
                </AppText>
                <AppText style={{ fontFamily: "quickMedium" }}>
                  {formatterUtility(Number(offer?.price_per_plots || 0))}
                </AppText>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View>
                <AppText
                  style={{ fontFamily: "quickMedium" }}
                  className="text-lg"
                >
                  Purchase Date
                </AppText>
                <AppText style={{ fontFamily: "quickMedium" }}>
                  {formatISODateToYYYYMMDD(offer?.purchase_date || "")}
                </AppText>
              </View>
              <View>
                <AppText
                  style={{ fontFamily: "quickMedium" }}
                  className="text-lg"
                >
                  Plot numbers
                </AppText>
                <AppText style={{ fontFamily: "quickMedium" }}>
                  {offer?.plot_numbers || ""}
                </AppText>
              </View>
            </View>
          </View>

          <View className="rounded-xl bg-secondary p-4 h-40 mt-5 items-center justify-center">
            <AppText className="text-lg mb-4 ">Company Buyback Offer</AppText>
            <AppText className="text-4xl font-semibold text-primary mb-4">
              {formatterUtility(Number(offer?.offer_amount || 0))}
            </AppText>
            <AppText className="text-base text-gray-600 font-medium">
              +
              {formatterUtility(
                Number(offer?.offer_amount || 0) -
                  Number(offer?.total_value || 0),
              )}{" "}
              above your purchase price
            </AppText>
          </View>

          {/* Select Branch Trigger */}
          <View className="flex flex-col gap-2 mt-5">
            <AppText className="text-sm font-semibold text-gray-900">
              Select branch for document submission
            </AppText>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowBranchModal(true)}
              className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4"
            >
              <AppText
                className={`text-base ${selectedBranch ? "text-black font-semibold" : "text-gray-400"}`}
              >
                {selectedBranch || "Select branch"}
              </AppText>
              <Ionicons name="chevron-down-outline" size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-2 my-4">
            <Ionicons
              name="alert-circle-outline"
              size={24}
              color="#000000"
              className="my-4"
            />
            <AppText className="w-80 ">
              This is a fixed company offer. No negotiation is approved on this
              amount.
            </AppText>
          </View>

          <ActionButton
            action={handleAcceptOffer}
            name="Accept Offer"
            loading={acceptOfferMutation.isPending}
            disabled={
              acceptOfferMutation.isPending || declineOfferMutation.isPending
            }
          />
          <ActionButton
            action={handleDeclineOffer}
            name="Decline Offer"
            hasBG={false}
            loading={declineOfferMutation.isPending}
            disabled={
              acceptOfferMutation.isPending || declineOfferMutation.isPending
            }
          />
        </ScrollView>
        <CustomModal
          visible={openModal}
          type={"decline"}
          onClose={() => setOpenModal(false)}
          onProceed={handleProceed}
          title={modalType === "accept" ? "Offer Accepted" : "Offer Declined"}
          description={
            modalType === "accept"
              ? "Your next step is to submit physical documents."
              : `You have declined the offer for ${offer?.property?.name}.`
          }
          buttonText={modalType === "accept" ? "Go Home" : "Return to Property"}
          buttonColor={modalType === "accept" ? "#14532D" : "#14532D"}
          icon={
            modalType === "accept" ? (
              <AntDesign name="check-circle" size={70} color={"#154A22"} />
            ) : (
              <AntDesign name="close-circle" size={70} color={"#A80B00"} />
            )
          }
          showGuide={modalType === "accept"}
          footerText={
            modalType === "accept" ? "Takes 3-4 business day" : "Request again"
          }
        />

        {/* Branch Selector Modal */}
        <Modal
          visible={showBranchModal}
          customMode
          onClose={() => setShowBranchModal(false)}
        >
          <View className="flex-1 bg-black/40 justify-end w-full">
            <View className="w-full rounded-t-3xl bg-white px-5 py-6 max-h-[80%]">
              <AppText className="text-lg font-semibold text-gray-900 mb-4">
                Select Branch
              </AppText>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex flex-col gap-2">
                  {globals.branches.map((branch, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedBranch(branch);
                        setShowBranchModal(false);
                      }}
                      className={`p-4 rounded-lg border ${
                        selectedBranch === branch
                          ? "bg-primary/10 border-primary"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <AppText
                        className={`text-base font-medium ${
                          selectedBranch === branch
                            ? "text-primary"
                            : "text-gray-900"
                        }`}
                      >
                        {branch}
                      </AppText>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
};

export default Offer;
