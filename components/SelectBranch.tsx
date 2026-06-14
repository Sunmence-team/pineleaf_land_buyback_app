import { Pressable, ScrollView, View } from "react-native";
import { AppText } from "./AppText";
import Modal from "./modal/Modal";

type Props = {
    value: string | null;
    onChange: (branch: string) => void;
    isOpen: boolean;
    onClose: () => void;
};

export default function SelectBranch({ value, onChange, isOpen, onClose }: Props) {
    const branches = [
        'HQ - Onitsha',
        'Mgbuka',
        'Awka',
        'Asaba',
        'Owerri',
        'Port Harcourt',
        'Lagos Ajah',
        'Lagos Apapa',
        'Enugwu-Ukwu',
        'Abuja',
        'Abia',
        'Nnewi',
        'Enugu',
        'Amuwo odofin Lagos',
        'Ebonyi',
        "Nkpor",
    ]

    return (
        <Modal visible={isOpen} onClose={onClose}>
            <View className="flex-1 bg-black/40 justify-end">
                <View className="w-full rounded-t-3xl bg-white px-5 py-6 max-h-[80%]">
                    <AppText className="text-lg font-semibold text-gray-900 mb-4">
                        Select Branch
                    </AppText>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex flex-col gap-2">
                            {branches.map((branch, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        onChange(branch);
                                        onClose();
                                    }}
                                    className={`p-4 rounded-lg border ${value === branch
                                            ? "bg-primary/10 border-primary"
                                            : "bg-gray-50 border-gray-200"
                                        }`}
                                >
                                    <AppText
                                        className={`text-base font-medium ${value === branch
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
    );
}