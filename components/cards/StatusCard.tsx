import { formatUnderScores } from "@/helpers/formatterUtility";
import { getStatusTheme } from "@/helpers/statusTheme";
import { StatusType } from "@/lib/interfaces";
import { Text, View } from "react-native";

const StatusCard = ({
  currentStatus,
  displayText,
}: {
  currentStatus: StatusType;
  displayText?: string;
}) => {
  const theme = getStatusTheme(currentStatus);
  
  const finalDisplayText =
    currentStatus === "verified"
      ? "documents_verified"
      : displayText
        ? displayText
        : currentStatus;

  return (
    <View 
      className="px-3 py-2 rounded-lg"
      style={{
        backgroundColor: theme.bgHex,
        alignSelf: "flex-start",
      }}
    >
      <Text 
        className="text-xs font-medium"
        style={{
          color: theme.hex,
        }}
      >
        {formatUnderScores(finalDisplayText, true)}
      </Text>
    </View>
  );
};

export default StatusCard;
