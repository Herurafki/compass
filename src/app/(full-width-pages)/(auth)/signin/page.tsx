import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass - Signin",
  description: "This is the signin page for the compass website. - Compass",
};

export default function SignIn() {
  return <SignInForm />;
}
