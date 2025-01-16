import { usePortfolioStore } from "@/store/usePortfolioStore";
import { TextRevealCardPreview } from "./TextRevealCardPreview";

export default function Footer() {
  const { portfolio } = usePortfolioStore();
  const { personalInfo } = portfolio;

  return (
    <TextRevealCardPreview
      email={personalInfo.email}
      phoneNumber={personalInfo.contactNumber}
    />
  );
}
