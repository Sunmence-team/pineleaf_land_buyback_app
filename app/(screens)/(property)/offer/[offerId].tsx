import { assets } from '@/assets/assets';
import CustomModal from '@/components/modal/CustomModal';
import { getPropertyDetailsService, declinePropertyOfferService } from '@/services/propertiesServices';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { formatterUtility, formatISODateToYYYYMMDD } from '@/helpers/formatterUtility';

type StatusType = "eligible" | "not_eligible" | "offer_sent" | "completed" | "pending";

const Offer = ({ status }: { status: StatusType }) => {

  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<"accept" | "decline">("accept");

  const statusStyles = {
    eligible: "bg-fadedGreen text-primary",
    not_eligible: "bg-red-100 text-red-600",
    offer_sent: "bg-blue-100 offerText",
    completed: "bg-gray-200 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    eligible: "Eligible",
    not_eligible: "Not Eligible",
    offer_sent: "Offer Sent",
    completed: "Completed",
    pending: 'Pending'
  };

  const { offerId } = useLocalSearchParams();

  const fetchPropertyDetails = () => getPropertyDetailsService(Number(offerId));

  const { data, isLoading, error } = useQuery({
    queryKey: ["propertyDetails", offerId],
    queryFn: fetchPropertyDetails,
    enabled: !!offerId
  })

  const declineOfferMutation = useMutation({
    mutationFn: () => declinePropertyOfferService(Number(offerId)),
    onSuccess: () => {
      setOpenModal(false);
      router.push('/(tabs)/properties');

      Toast.show({
        type: "success",
        text1: "Offer Declined Successfully",
      });
    },
    onError: (err) => {
      console.error('Decline offer failed:', err);
    }
  });

  if (isLoading) {
    return <Text>Loading offer details...</Text>;
  }

  if (error) {
    return <Text>Error loading offer: {error.message}</Text>;
  }

  // Use API data if available, otherwise fall back to empty object
  const offer = data || {};

  const handleAcceptOffer = () => {
    setModalType("accept");
    setOpenModal(true);
  }

  const handleDeclineOffer = () => {
    setModalType("decline");
    setOpenModal(true);
  };

  const handleProceed = () => {
    if (modalType === "decline") {
      declineOfferMutation.mutate();
      return;
    }

    setOpenModal(false)

    setTimeout(() => {
      router.push('/document/DocumentSubmission')
    }, 500)
  }

  return (
    <ScrollView className='"flex-1 bg-white  border border-gray-200 rounded-lg p-4 mb-4 w-full '>
      <View className='mt-5 border border-gray-300 rounded-lg p-4'>
        <View className="flex-row justify-between ">
          <View className="mb-4">
            <Text className="text-xl font-medium mb-2">Pineleaf Phase 2</Text>
          </View>

          <View
            className={`px-3 py-1 rounded-lg ${statusStyles[offer?.offer_status as StatusType]}`}
          >
            <Text className="text-xs font-medium">
              {statusLabel[offer?.offer_status as StatusType]}
            </Text>
          </View>
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

      <View className='rounded-lg bg-secondary p-4 h-40 mt-5 items-center justify-center'>
        <Text className='text-lg mb-4 '>Company Buyback Offer</Text>
        <Text className='text-4xl font-medium text-primary mb-4'>{formatterUtility(Number(offer?.total_value || 0))}</Text>
        <Text className='text-sm text-gray-600 font-mediumd'>+{formatterUtility(Number(offer?.offer_amount || 0))} above your purchase price</Text>
      </View>

      <View className='flex-row items-center gap-2 mt-4'>
        <Ionicons name='alert-circle-outline' size={24} color='#000000' className='my-4' />
        <Text className='w-80 '>This is a fixed company offer. No negotiation is approved on this amount.</Text>
      </View>

      <Pressable className=' bg-primary rounded-lg py-6 mt-7 items-center'
        onPress={() => handleAcceptOffer()}
      >
        <Text className='font-semibold text-white'>Accept Offer</Text>
      </Pressable>
      <Pressable className=' py-6 mt-7 items-center'
        onPress={() => handleDeclineOffer()}
      >
        <Text className='font-semibold'>Decline Offer</Text>
      </Pressable>

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
            ? "Proceed to Document"
            : "Return to Property"
        }

        buttonColor={
          modalType === "accept"
            ? "#14532D"
            : "#14532D"
        }

        image={
          modalType === "accept"
            ? assets.successGif
            : assets.rejectGif
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
    </ScrollView>
  )
}

export default Offer;