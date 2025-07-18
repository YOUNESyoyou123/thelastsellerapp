import React, { useState } from "react";
import loginAnimation from "../assets/User.json";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";
import Lottie from "lottie-react";

const translations = {
  en: {
    title: "Sougi Platform",
    subtitle: "Create your account",
    fullname: "Full Name",
    password: "Password",
    confirmPassword: "Confirm Password",
    signup: "Sign Up",
    already: "Already have an account? Sign in",
    success: "Account created successfully!",
  },
  ar: {
    title: "سوقي",
    subtitle: "إنشاء حساب جديد",
    fullname: "الاسم الكامل",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signup: "إنشاء الحساب",
    already: "لديك حساب؟ تسجيل الدخول",
    success: "تم إنشاء الحساب بنجاح!",
  },
};

type IconProps = {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  [key: string]: any;
};

function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: IconProps) {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}

const Registerclient = () => {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const validateForm = () => {
    let tempErrors: Record<string, string> = {};

    if (!formData.fullName) tempErrors.fullName = "Required";
    if (!formData.phone) tempErrors.phone = "Required";
    if (!formData.email) tempErrors.email = "Required";
    if (!formData.password) tempErrors.password = "Required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(t.success);
      console.log("✅ REGISTER DATA:", formData);
    }, 1000);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-50  ${
        lang === "ar" ? "direction-rtl" : ""
      }`}
    >
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl px-8 py-10">
          {/* Lang Switch */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLang}
              className="text-sm text-blue-600 hover:underline"
            >
              {lang === "en" ? "🇸🇦 عربي" : "🇬🇧 English"}
            </button>
          </div>

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-600 rounded-full shadow-md mx-auto mb-3">
              <Lottie animationData={loginAnimation} loop className="w-40" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
            <p className="text-sm text-gray-500">{t.subtitle}</p>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
              ✅ {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.fullname}
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.confirmPassword}
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md flex items-center justify-center gap-2 transition duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={18} /> {t.signup}
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm mt-4 text-gray-500 cursor-pointer hover:underline">
            {t.already}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registerclient;
