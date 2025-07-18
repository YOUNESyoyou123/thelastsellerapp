import React, { useEffect, useState } from "react";
import { SearchHeader } from "./SearchHeader";
import { ProductCard } from "./ProductCardProps";
import { CategoryFilter } from "./CategorieFilter";
import MobileFooter from "./Footer";

const mockProducts = [
  {
    title: "Wireless Bluetooth Headphones",
    price: "$89.99",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 128,
  },
  {
    title: "Smart Watch Series 8",
    price: "$299.99",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 256,
  },
  {
    title: "Portable Phone Charger",
    price: "$24.99",
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 89,
  },
  {
    title: "Wireless Mouse",
    price: "$39.99",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 174,
  },
  {
    title: "USB-C Cable 3ft",
    price: "$12.99",
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 92,
  },
  {
    title: "Bluetooth Speaker",
    price: "$79.99",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 203,
  },
];

const OPENCAGE_API_KEY = "5b93249038624a97bd48f83e49bea550";

export default function Mainpage() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationName, setLocationName] = useState<string>("📡 Detecting...");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("❌ Geolocation not supported.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        // ✅ Fetch city + country
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );
          const data = await response.json();

          if (data.results?.length > 0) {
            const comp = data.results[0].components;
            const city =
              comp.city || comp.town || comp.village || "Unknown city";
            const country = comp.country || "Unknown country";

            setLocationName(`${city}, ${country}`);
          } else {
            setLocationName("❓ Unknown location");
          }
        } catch (err) {
          console.error("Error fetching location name:", err);
          setLocationName("❌ Error fetching location");
        }
      },
      (error) => {
        setErrorMsg(`❌ ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <>
      {/* ✅ NAVBAR with current location */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4 flex   items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Marketplace</h1>

          {/* 🌍 Location display */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>📍</span>
            {errorMsg ? errorMsg : locationName}
          </div>
        </div>
        <SearchHeader />
        <CategoryFilter />
      </div>

      {/* ✅ Products Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      <MobileFooter />
    </>
  );
}
