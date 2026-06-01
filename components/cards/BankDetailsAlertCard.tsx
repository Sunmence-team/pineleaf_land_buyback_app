import { UserProps } from "@/lib/interfaces";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText } from "../AppText";
import { Link } from "expo-router";

type BankDetailsAlertCardProps = {
  user?: UserProps;
};

const BankDetailsAlertCard = ({ user }: BankDetailsAlertCardProps) => {
  if (!user) {
    return null;
  }

  const bankKeys = [
    "bank_account_name",
    "bank_account_number",
    "bank_name",
    "bank_code",
  ] as const;

  const validKeysCount = bankKeys.filter(
    (key) => user[key] !== undefined && user[key] !== null && String(user[key]).trim() !== ""
  ).length;

  const percentage = Math.round((validKeysCount / bankKeys.length) * 100);

  if (percentage === 100) {
    return null;
  }

  return (
    <Link href="/(screens)/profile/bankDetailsScreen" asChild>
        <TouchableOpacity style={styles.smallCard}>
            <View>
                <View style={styles.smallFlex}>
                    <AppText style={styles.smallTitle}>Bank details missing</AppText>

                    <AntDesign name="plus" size={18} color="#000" />
                </View>

                <AppText style={styles.smallText}>
                    Add your account details to receive buyback payment.
                </AppText>
            </View>

            <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                    <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                </View>

                <AppText style={styles.percent}>{percentage}%</AppText>
            </View>
        </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  smallCard: {
    backgroundColor: "#E8EFEA",
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
  },
  smallFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  smallTitle: {
    fontSize: 16,
    fontFamily: "quickSemiBold",
  },
  smallText: {
    fontSize: 15,
    color: "#45464D",
    lineHeight: 22,
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#175326",
    borderRadius: 20,
  },
  percent: {
    fontSize: 16,
    color: "black",
  },
});

export default BankDetailsAlertCard;
