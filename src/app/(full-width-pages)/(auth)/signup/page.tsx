import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass - Signup",
  description: "This is the signup page for the compass website. - Compass",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
