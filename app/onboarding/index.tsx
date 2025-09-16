import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const next = () => setStep((prev) => prev + 1);

  const finish = async () => {
    // ✅ mark onboarding complete
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/(tabs)/Home"); // ✅ fixed
  };

  switch (step) {
    case 1: return <Step1 onNext={next} />;
    case 2: return <Step2 onNext={next} />;
    case 3: return <Step3 onNext={next} />;
    case 4: return <Step4 onNext={next} />;
    case 5: return <Step5 onFinish={finish} />;
    default: return null;
  }
}
