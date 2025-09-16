import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Import your step components
import Step1 from "./onboarding/Step1";
import Step2 from "./onboarding/Step2";
import Step3 from "./onboarding/Step3";
import Step4 from "./onboarding/Step4";
import Step5 from "./onboarding/Step5";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/(tabs)/Home"); // 👈 change to "/(tabs)" if you want home tabs
  };

  return (
    <View style={styles.container}>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Step4 onNext={handleNext} />}
      {step === 5 && <Step5 onFinish={handleFinish} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
