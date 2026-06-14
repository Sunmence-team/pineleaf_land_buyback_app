import { assets } from '@/assets/assets';
import CustomModal from '@/components/modal/CustomModal';
import { getPropertyDetailsService, declinePropertyOfferService, acceptPropertyOfferService } from '@/services/propertiesServices';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { formatterUtility, formatISODateToYYYYMMDD } from '@/helpers/formatterUtility';
import { showSuccessToast, showErrorToast } from '@/helpers/toast';
import StatusCard from '@/components/cards/StatusCard';
import ActionButton from '@/components/buttons/ActionButton';
import SelectBranch from '@/components/SelectBranch';

const Offer = () => {
  const { offerId } = useLocalSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<"accept" | "decline">("accept");
  const [selectedBranch, setSelectedBranch] = React.useState<string | null>(null);

  const fetchPropertyDetails = () => getPropertyDetailsService(Number(offerId));

  const { data: offer, isLoading, error } = useQuery({
    queryKey: ["propertyDetails", offerId],
    queryFn: fetchPropertyDetails,
    enabled: !!offerId
  });

  const acceptOfferMutation = useMutation({
    mutationFn: ({ branch }: { branch: string }) => acceptPropertyOfferService(Number(offerId), branch),
    onSuccess: () => {
      showSuccessToast("Offer Accepted Successfully");
      setModalType("accept");
      setOpenModal(false);
    },
    onError: (err: any) => {
      showErrorToast(err.response?.data?.message || err.message || "Failed to accept offer");
      console.error('Accept offer failed:', err);
    }
  });

  const declineOfferMutation = useMutation({
    mutationFn: () => declinePropertyOfferService(Number(offerId)),
    onSuccess: () => {
      showSuccessToast("Offer Declined Successfully");
      setModalType("decline");
      setOpenModal(true);
    },
    onError: (err: any) => {
      showErrorToast(err.response?.data?.message || err.message || "Failed to decline offer");
      console.error('Decline offer failed:', err);
    }
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading offer details...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading offer: {error.message}</Text>
      </View>
    )
  }

  const handleAcceptOffer = () => {
    if (!selectedBranch) {
      showErrorToast("Please select a branch");
      return;
    }

    acceptOfferMutation.mutate({
      branch: selectedBranch
    });
  }

  const handleDeclineOffer = () => {
    declineOfferMutation.mutate();
  };

  const handleProceed = () => {
    setOpenModal(false);

    setTimeout(() => {
      if (modalType === "accept") {
        router.push('/(tabs)/');
      } else {
        router.push('/(tabs)/properties');
      }
    }, 500);
  };

  return (
    <View className="flex-1 bg-secondary pt-6" style={{ paddingHorizontal: 20 }}>
      <View>
        <ScrollView
          style={{ borderRadius: 20 }}
          className="bg-white border border-gray-200 rounded-lg p-5 mb-4 w-full"
          showsVerticalScrollIndicator={false}
        >
          <View className='border border-gray-300 rounded-xl p-4'>
            <View className="flex-row justify-between items-start">
              <View className="mb-4">
                <Text className="text-xl font-medium mb-2">Pineleaf Phase 2</Text>
              </View>

              <StatusCard currentStatus={offer?.offer_status} />
            </View>

            <View className='flex-row justify-between mb-4'>
              <View>
                <Text className='text-lg'>Plot</Text>
                <Text className='text-medium'>{offer?.number_of_plots || 0}</Text>
              </View>
              <View>
                <Text className='text-lg'>Purchased value</Text>
                <Text className='text-medium'>{formatterUtility(Number(offer?.price_per_plots || 0))}</Text>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View>
                <Text className='text-lg'>Purchase Date</Text>
                <Text className='text-medium'>{formatISODateToYYYYMMDD(offer?.purchase_date || "")}</Text>
              </View>
              <View>
                <Text className='text-lg'>Plot numbers</Text>
                <Text className='text-medium'>{offer?.plot_numbers || ""}</Text>
              </View>
            </View>
          </View>

          <View className='rounded-xl bg-secondary p-4 h-40 mt-5 items-center justify-center'>
            <Text className='text-lg mb-4 '>Company Buyback Offer</Text>
            <Text className='text-4xl font-semibold text-primary mb-4'>{formatterUtility(Number(offer?.offer_amount || 0))}</Text>
            <Text className='text-base text-gray-600 font-medium'>+{formatterUtility(Number(offer?.offer_amount || 0) - Number(offer?.total_value || 0))} above your purchase price</Text>
          </View>

          <View className='flex-row items-center gap-2 my-4'>
            <Ionicons name='alert-circle-outline' size={24} color='#000000' className='my-4' />
            <Text className='w-80 '>This is a fixed company offer. No negotiation is approved on this amount.</Text>
          </View>

          <ActionButton
            action={handleAcceptOffer}
            name="Accept Offer"
            loading={acceptOfferMutation.isPending}
            disabled={acceptOfferMutation.isPending || declineOfferMutation.isPending}
          />
          <ActionButton
            action={handleDeclineOffer}
            name="Decline Offer"
            hasBG={false}
            loading={declineOfferMutation.isPending}
            disabled={acceptOfferMutation.isPending || declineOfferMutation.isPending}
          />

        </ScrollView>
        <CustomModal
          visible={openModal}
          type={modalType}
          onClose={() => setOpenModal(false)}
          onProceed={handleProceed}

          title={
            modalType === "accept"
              ? "Offer Accepted"
              : "Offer Declined"
          }

          description={
            modalType === "accept"
              ? "Your next step is to submit physical documents."
              : "You have declined the offfer for pinelea phase 2."
          }

          buttonText={
            modalType === "accept"
              ? "Go Home"
              : "Return to Property"
          }

          buttonColor={
            modalType === "accept"
              ? "#14532D"
              : "#14532D"
          }

          image={
            modalType === "accept"
              ? assets.success
              : assets.reject
          }

          // iconColor={
          //   modalType === "accept"
          //     ? "#14532D"
          //     : "#DC2626"
          // }

          showGuide={modalType === "accept"}

          footerText={
            modalType === "accept"
              ? "Takes 3-4 business day"
              : "Request again"
          }
        />

        <SelectBranch
          value={selectedBranch}
          onChange={setSelectedBranch}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </View>
    </View>
  )
}

export default Offer;