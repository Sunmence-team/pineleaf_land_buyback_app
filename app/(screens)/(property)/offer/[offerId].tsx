import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'; 
import { properties } from '@/lib/data';
import CustomModal from '@/components/modal/CustomModal';

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

  const offer = properties.find((item) => item.id === Number(offerId));

  if (!offer) {
    return <Text>Offer not found</Text>;
  }

  const handleAcceptOffer = () => {
    setModalType("accept");
    setOpenModal(true);
  }

  const handleDeclineOffer = () => {
    setModalType("decline");
    setOpenModal(true);
  };

  const handleProceed = () => {
    setOpenModal(false)

    setTimeout(() => {
      router.push('/document/DocumentSubmission')

    }, 500)
  }

  const assets = {
  mark: require("../../../../assets/images/mark.gif"),
  reject: require("../../../../assets/images/reject.gif"),
  };

  return (
    <ScrollView className='"flex-1 bg-white  border border-gray-200 rounded-lg p-4 mb-4 w-full '>
      <View className='mt-5 border border-gray-300 rounded-lg p-4'>
        <View className="flex-row justify-between ">
          <View className="mb-4">
            <Text className="text-xl font-medium mb-2">Pineleaf Phase 2</Text>
          </View>

          <View
            className={`px-3 py-1 rounded-lg ${statusStyles[status]}`}
          >
            <Text className="text-xs font-medium">
              {statusLabel[status]}
            </Text>
          </View>
        </View>

        <View className='flex-row justify-between mb-4'>
          <View>
            <Text className='text-lg'>Plot</Text>
            <Text className='text-medium'>{offer.plots}</Text>
          </View>
          <View>
            <Text className='text-lg'>Purchased value</Text>
            <Text className='text-medium'>{offer.price}</Text>
          </View>
        </View>
        <View className='flex-row justify-between'>
          <View>
            <Text className='text-lg'>Purchse Date</Text>
            <Text className='text-medium'>{offer.date}</Text>
          </View>
          <View>
            <Text className='text-lg'>Plot numbers</Text>
            <Text className='text-medium'>PL-204 to 206</Text>
          </View>
        </View>
      </View>

      <View className='rounded-lg bg-secondary p-4 h-40 mt-5 items-center justify-center'>
        <Text className='text-lg mb-4 '>Company Buyback Offer</Text>
        <Text className='text-4xl font-medium text-primary mb-4'>₦8,625,000</Text>
        <Text className='text-sm text-gray-600 font-mediumd'>+₦2,875,000 above your purchase price</Text>
      </View>

      <View className='flex-row items-center gap-2 mt-4'>
        <Ionicons name='alert-circle-outline' size={24} color='#000000' className='my-4' />
        <Text className='w-80 '>This is a fixed company offer. No negotiation is approved on this amount.</Text>
      </View>

      <Pressable className=' bg-primary rounded-lg py-6 mt-7 items-center'
        onPress={() => handleAcceptOffer(offer.id)}
      >
        <Text className='font-semibold text-white'>Accept Offer</Text>
      </Pressable>
      <Pressable className=' py-6 mt-7 items-center'
        onPress={() => handleDeclineOffer(offer.id)}
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
            ? assets.mark
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
    </ScrollView>
  )
}

export default Offer;