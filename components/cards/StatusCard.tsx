import { formatUnderScores } from "@/helpers/formatterUtility";
import { getStatusTheme } from "@/helpers/statusTheme";
import { StatusType } from "@/lib/interfaces";
import { Text, View } from "react-native";

const StatusCard = ({
  currentStatus,
  displayText,
  enlargeText=false
}: {
  currentStatus: StatusType;
  displayText?: string;
  enlargeText?: boolean;
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
        className="font-medium"
        style={{
          color: theme.hex,
          fontSize: enlargeText ? 16 : 12,
          lineHeight: enlargeText ? 24 : 16
        }}
      >
        {formatUnderScores(finalDisplayText, true)}
      </Text>
    </View>
  );
};

export default StatusCard;
