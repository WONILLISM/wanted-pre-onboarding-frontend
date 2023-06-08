import axios from "axios";

export const preOnboardingAPI = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
});
