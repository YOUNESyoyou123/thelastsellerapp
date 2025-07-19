import React, { useEffect, useState } from "react";
import { SearchHeader } from "./SearchHeader";
import { ProductCard } from "./ProductCardProps";
import { CategoryFilter } from "./CategorieFilter";

import MobileFooter from "./Footer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SellerMap from "./SellerMap";

const OPENCAGE_API_KEY = "5b93249038624a97bd48f83e49bea550";

interface Product {
  _id: string;
  ProductName: string;
  Price: number;
  ProductImage: string;
  category?: string;
  IdresponsibleShop: {
    ShopName: string;
  };
}

interface Seller {
  _id: string;
  ShopName: string;
  Place: string;
}

export default function Mainpage() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationName, setLocationName] = useState<string>("📡 Detecting...");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sellerInfo, setSellerInfo] = useState<Seller | null>(null);

  const handleOpenDialog = async (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);

    try {
      const res = await fetch(
        `http://localhost:5000/sellers/${product.IdresponsibleShop}`
      );
      const data: Seller = await res.json();
      setSellerInfo(data);
    } catch (err) {
      console.error("❌ Erreur seller", err);
    }
  };

  /** ✅ Fetch produits en fonction de la ville détectée */
  const fetchProductsByLocation = async (place: string) => {
    try {
      setLoading(true);
      setErrorMsg("");

      // 🔹 1. Chercher les vendeurs qui ont Place ~ place
      const sellersResponse = await fetch(
        `http://localhost:5000/sellers/sell/nearby?place=${encodeURIComponent(
          place
        )}`
      );

      if (!sellersResponse.ok) {
        const errorData = await sellersResponse.json();
        throw new Error(errorData.message || "Failed to fetch sellers");
      }

      const sellers: Seller[] = await sellersResponse.json();
      if (!Array.isArray(sellers))
        throw new Error("Invalid sellers data format");

      if (sellers.length === 0) {
        setProducts([]);
        setErrorMsg("No sellers found in your area");
        return;
      }

      // 🔹 2. Charger les produits de ces vendeurs
      const sellerIds = sellers.map((seller) => seller._id);
      const productsResponse = await fetch(
        "http://localhost:5000/products/bysellers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sellerIds }),
        }
      );

      if (!productsResponse.ok) {
        const errorData = await productsResponse.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const products: Product[] = await productsResponse.json();
      if (!Array.isArray(products))
        throw new Error("Invalid products data format");

      setProducts(products);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg(error.message || "Failed to load data");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /** ✅ 1er effet : Détecte la position et récupère le nom de la ville */
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("❌ Geolocation not supported.");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        try {
          // Appel OpenCage pour récupérer la ville
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );
          const data = await response.json();

          if (data.results?.length > 0) {
            const comp = data.results[0].components;
            const city =
              comp.city || comp.town || comp.village || "Unknown city";
            const country = comp.country || "Unknown country";
            const placeName = `${city}, ${country}`;

            console.log("✅ Ville détectée :", placeName);
            setLocationName(placeName);
          } else {
            setLocationName("Unknown location");
          }
        } catch (err) {
          console.error("Error fetching location name:", err);
          setErrorMsg("Error fetching location data");
          setLoading(false);
        }
      },
      (error) => {
        setErrorMsg(`❌ ${error.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  /** ✅ 2e effet : Lance la recherche des produits seulement quand on a une vraie ville */
  useEffect(() => {
    if (
      locationName !== "📡 Detecting..." &&
      !locationName.startsWith("Unknown")
    ) {
      fetchProductsByLocation(locationName);
    }
  }, [locationName]);

  return (
    <>
      {/* ✅ En-tête avec localisation */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>📍</span>
            {errorMsg ? errorMsg : locationName}
          </div>
        </div>
        <SearchHeader />
        <CategoryFilter />
      </div>

      {/* ✅ Section produits */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading products near you...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div onClick={() => handleOpenDialog(product)}>
                <ProductCard
                  key={product._id}
                  title={product.ProductName}
                  price={`$${Number(product.Price).toFixed(2)}`} // ✅ conversion en nombre
                  image={product.ProductImage || "/placeholder.svg"}
                  category={product.category || "Unknown"}
                  shopName={
                    product.IdresponsibleShop?.ShopName || "Unknown shop"
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <p>{errorMsg || "No products found in your area"}</p>
          </div>
        )}
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProduct?.ProductName} -{" "}
          {sellerInfo?.ShopName || "Loading..."}
        </DialogTitle>
        <DialogContent>
          {/* ✅ Infos produit */}
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.ProductImage}
                alt=""
                className="w-full rounded-md mb-3"
              />
              <p>
                <strong>Prix:</strong> {selectedProduct.Price} DA
              </p>
            </>
          )}

          {/* ✅ Infos vendeur */}
          {sellerInfo && (
            <>
              <p>
                <strong>Vendeur:</strong> {sellerInfo.ShopName}
              </p>
              <p>
                <strong>Téléphone:</strong> {sellerInfo.PhoneNumber}
              </p>
              <p>
                <strong>Adresse:</strong> {sellerInfo.Place}
              </p>

              {/* ✅ Carte Leaflet avec position du vendeur */}
              <SellerMap lat={sellerInfo.Latitude} lng={sellerInfo.Longitude} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
