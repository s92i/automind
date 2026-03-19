import { type Dispatch, type SetStateAction } from "react";
import type { ZodType } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./SignIn";
import Register from "./Register";

export interface RightSideAuthModalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  registerForm: {
    first: string;
    last: string;
    email: string;
    password: string;
    confirm: string;
  };
  setRegisterForm: Dispatch<
    SetStateAction<{
      first: string;
      last: string;
      email: string;
      password: string;
      confirm: string;
    }>
  >;
  loginForm: { email: string; password: string };
  setLoginForm: Dispatch<SetStateAction<{ email: string; password: string }>>;
  validationErrors: Record<string, string>;
  setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>;
  signupSchema: ZodType<{
    first: string;
    last: string;
    email: string;
    password: string;
    confirm: string;
  }>;
  loginSchema: ZodType<{ email: string; password: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
    captchaToken?: string,
  ) => Promise<boolean | undefined>;
  login: (email: string, password: string) => Promise<boolean>;
  error: string | null;
  loading: boolean;
  onClose: () => void;
}

const RightSideAuthModal = ({
  activeTab,
  setActiveTab,
  registerForm,
  setRegisterForm,
  loginForm,
  setLoginForm,
  validationErrors,
  setValidationErrors,
  signupSchema,
  loginSchema,
  signup,
  login,
  error,
  loading,
  onClose,
}: RightSideAuthModalProps) => {
  return (
    <div className="flex flex-col justify-center p-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Welcome to Automind</h3>
          <p className="text-muted-foreground">
            {activeTab === "signin"
              ? "Sign in to your account to continue"
              : "Create your account to get started"}
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/20">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <SignIn
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            setActiveTab={setActiveTab}
            loginSchema={loginSchema}
            login={login}
            loading={loading}
            onLoginSuccess={onClose}
          />
          <Register
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            signupSchema={signupSchema}
            setActiveTab={setActiveTab}
            signup={signup}
            error={error}
            loading={loading}
            onRegisterSuccess={onClose}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default RightSideAuthModal;
