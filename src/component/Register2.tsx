//@ts-nocheck

import React, { useEffect, useState } from "react";
import loginAnimation from "../assets/My-Store-animated.json";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = "https://backendsellerapp.onrender.com/registerseller";

const translations = {
  en: {
    title: "Sougi Platform",
    subtitle: "Create your account",
    fullname: "Full Name",
    shopname: "Shop Name (optional)",
    phone: "Phone Number",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    signup: "Sign Up",
    already: "Already have an account? Sign in",
    success: "Account created successfully!",
    error: "Registration failed. Please try again.",
  },
  ar: {
    title: "سوقي",
    subtitle: "إنشاء حساب جديد",
    fullname: "الاسم الكامل",
    shopname: "اسم المتجر (اختياري)",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signup: "إنشاء الحساب",
    already: "لديك حساب؟ تسجيل الدخول",
    success: "تم إنشاء الحساب بنجاح!",
    error: "فشل التسجيل، حاول مرة أخرى.",
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

const OPENCAGE_API_KEY = "5b93249038624a97bd48f83e49bea550";

const Register = () => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("📡 Detecting...");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const t = translations[lang];

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationName("❌ Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );
          const data = await res.json();
          if (data.results?.length > 0) {
            const comp = data.results[0].components;
            const city = comp.city || comp.town || comp.village || "Unknown city";
            const country = comp.country || "Unknown country";
            setLocationName(`${city}, ${country}`);
          } else {
            setLocationName("❓ Unknown location");
          }
        } catch {
          setLocationName("❌ Location fetch failed");
        }
      },
      (err) => {
        setLocationName(`❌ ${err.message}`);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!coords) {
      setErrorMsg("❌ Location not detected");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    const payload = {
      FullName: formData.fullName,
      ShopName: formData.shopName,
      PhoneNumber: formData.phone,
      Email: formData.email,
      Password: formData.password,
      Place: locationName,
      Latitude: coords.latitude,
      Longitude: coords.longitude,
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || t.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccessMsg(t.success);
        console.log("✅ REGISTER SUCCESS:", data);
        navigate("/Market");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setErrorMsg(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-50 ${
        lang === "ar" ? "direction-rtl" : ""
      }`}
      style={{ fontFamily: "Janna" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl px-8 py-10">
          {/* Lang Switch */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLang}
              className="text-sm text-blue-600 hover:underline"
              style={{ fontFamily: "Janna" }}
            >
              {lang === "en" ? "🇸🇦 عربي" : "🇬🇧 English"}
            </button>
          </div>
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-600 rounded-full shadow-md mx-auto mb-3">
              <Lottie animationData={loginAnimation} loop className="w-40" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Janna" }}>
              {t.title}
            </h1>
            <p className="text-sm text-gray-500" style={{ fontFamily: "Janna" }}>
              {t.subtitle}
            </p>
            <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "Janna" }}>
              📍 {locationName}
            </p>
          </div>
          {/* Messages */}
          {successMsg && (
            <div
              className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4"
              style={{ fontFamily: "Janna" }}
            >
              ✅ {successMsg}
            </div>
          )}
          {errorMsg && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4"
              style={{ fontFamily: "Janna" }}
            >
              ❌ {errorMsg}
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.fullname}
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                style={{ fontFamily: "Janna" }}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm" style={{ fontFamily: "Janna" }}>
                  {errors.fullName}
                </p>
              )}
            </div>
            {/* Shop Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.shopname}
              </label>
              <input
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder={lang === "en" ? "Optional" : "اختياري"}
                style={{ fontFamily: "Janna" }}
              />
            </div>
            {/* Phone */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.phone}
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                style={{ fontFamily: "Janna" }}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm" style={{ fontFamily: "Janna" }}>
                  {errors.phone}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.email}
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                style={{ fontFamily: "Janna" }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm" style={{ fontFamily: "Janna" }}>
                  {errors.email}
                </p>
              )}
            </div>
            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.password}
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                style={{ fontFamily: "Janna" }}
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "Janna" }}
              >
                {t.confirmPassword}
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-lg"
                style={{ fontFamily: "Janna" }}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm" style={{ fontFamily: "Janna" }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md flex items-center justify-center gap-2 transition duration-200"
              style={{ fontFamily: "Janna" }}
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
          <p
            className="text-center text-sm mt-4 text-gray-500 cursor-pointer hover:underline"
            style={{ fontFamily: "Janna" }}
          >
            <Link to="/Loginseller">{t.already}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
