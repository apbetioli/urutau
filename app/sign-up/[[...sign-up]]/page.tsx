import GradientBackground from "@/components/GradientBackground";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
      <GradientBackground />
    </div>
  );
}
