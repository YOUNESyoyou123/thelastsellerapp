//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Chip,
  Rating,
  Paper,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Store,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  NotificationsActive as NotificationsActiveIcon,
  ChevronRight as ChevronRightIcon,
  CameraAlt as CameraAltIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import MobileFooter from "./Footer";
import SellerMap from "./SellerMap";

const OPENCAGE_API_KEY = "5b93249038624a97bd48f83e49bea550";

interface Product {
  _id: string;
  ProductName: string;
  Description?: string;
  Price: string | number;
  ProductImage: string;
  ShopImage?: string;
  IdresponsibleShop: string;
  Etoile?: number;
  numberEtoile?: number;
  ShopName: string;
  category?: string;
  totalStars: number;
  numberOfRatings: number;
  averageRating: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface Seller {
  _id: string;
  ShopName: string;
  Place: string;
  PhoneNumber?: string;
  Latitude?: number;
  Longitude?: number;
}

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category?: string;
  shopName?: string;
  ratingValue?: number;
  ratingCount?: number;
}

// Styles
const styles = {
  fontFamily: "Janna, sans-serif",
  container: {
    mx: "auto",
    px: 4,
    py: 6,
    marginBottom: "110px",
    paddingBottom: "110px",
  },
  header: {
    position: "sticky",
    top: 0,
    bgcolor: "background.paper",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid",
    borderColor: "divider",
    zIndex: 10,
    py: 2,
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  title: {
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 700,
    fontSize: "2.25rem", 
    background: "linear-gradient(45deg,rgb(65, 194, 71) 30%,rgb(109, 242, 113) 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    position: "relative",
    display: "inline-block",
    letterSpacing: "-0.5px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
    padding: "4px 0",
    margin: 0,
    userSelect: "none"
  },
  locationInfo: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontFamily: "Janna, sans-serif",
    fontSize: "0.875rem",
    color: "text.secondary",
    transition: "all 0.3s ease-in-out",
    marginTop: "13px", // Added margin from top
    paddingTop: "4px", // Added padding from top
    "&:hover": {
      color: "primary.main",
    },
  },
  locationIcon: {
    animation: "bounce 1s infinite",
    animationTimingFunction: "cubic-bezier(0.280, 0.840, 0.420, 1)",
  },
  searchBox: {
    width: "100%",
    maxWidth: 400,
    mx: "auto",
    my: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
    },
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    animation: "float 3s ease-in-out infinite",
    "@keyframes float": {
      "0%": {
        transform: "translateY(0px)"
      },
      "50%": {
        transform: "translateY(-5px)"
      },
      "100%": {
        transform: "translateY(0px)"
      }
    },
    "&:hover": {
      animation: "none",
      transform: "translateY(0)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      transition: "all 0.3s ease"
    }
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
      xl: "repeat(4, 1fr)",
    },
    gap: 3,
  },
  productCard: {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: "16px 16px 0 0",
  },
  productContent: {
    padding: 3,
    textAlign: "center",
  },
  dialogTitle: {
    bgcolor: "#4caf50",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 2,
  },
  dialogContent: {
    fontFamily: "Janna, sans-serif",
  },
  productInfo: {
    p: 3,
    borderRadius: 2,
    width: "100%",
    minHeight: "650px",
    fontFamily: "Janna, sans-serif",
    bgcolor: "#f8f9fa",
  },
  dialogActions: {
    p: 3,
    borderTop: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryChip: {
    backgroundColor: "#4caf50",
    color: "white",
    fontFamily: "Janna, sans-serif",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  
};

// Components
const StyledTypography = ({ variant, children, sx = {}, ...props }) => (
  <Typography variant={variant} sx={{ fontFamily: "Janna, sans-serif", ...sx }} {...props}>
    {children}
  </Typography>
);

const ProductCard = ({ title, price, image, category, shopName, ratingValue, ratingCount }) => (
  <Card sx={styles.productCard}>
    <CardActionArea>
      <Box sx={{ position: "relative" }}>
        <img src={image || "/placeholder.svg"} alt={title} style={styles.productImage} />
      </Box>
      <CardContent sx={styles.productContent}>
        <StyledTypography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </StyledTypography>
        <StyledTypography variant="body2" color="text.secondary">
          {shopName}
        </StyledTypography>
        <StyledTypography variant="body1" sx={{ fontWeight: "bold", mt: 1, color: "#4caf50" }}>
          {price}
        </StyledTypography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
          <Rating value={ratingValue} precision={0.5} readOnly sx={{ color: "#4caf50" }} />
          <StyledTypography variant="caption" sx={{ ml: 1 }}>
            ({ratingCount})
          </StyledTypography>
        </Box>
        {category && (
          <Chip label={category} sx={{ ...styles.categoryChip, mt: 1 }} />
        )}
      </CardContent>
    </CardActionArea>
  </Card>
);

// Main Component
export default function Mainpage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("📡 جاري الكشف...");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sellerInfo, setSellerInfo] = useState<Seller | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRating, setUserRating] = useState<number | null>(null);

  const submitRating = async (rating) => {
    try {
      if (!selectedProduct) return;
      const response = await fetch(
        `https://backendsellerapp.onrender.com/products/${selectedProduct._id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSelectedProduct({
          ...selectedProduct,
          totalStars: data.totalStars,
          numberOfRatings: data.numberOfRatings,
          averageRating: data.averageRating,
        });
        setProducts(
          products.map((p) =>
            p._id === selectedProduct._id
              ? {
                  ...p,
                  totalStars: data.totalStars,
                  numberOfRatings: data.numberOfRatings,
                  averageRating: data.averageRating,
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error("خطأ أثناء إرسال التقييم:", error);
    }
  };

  const filteredProducts =
    searchTerm === ""
      ? products
      : products.filter((product) =>
          product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleOpenDialog = async (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
    try {
      const res = await fetch(
        `https://backendsellerapp.onrender.com/sellers/${product.IdresponsibleShop}`
      );
      const data = await res.json();
      setSellerInfo(data);
    } catch (err) {
      console.error("❌ خطأ البائع", err);
    }
  };

  const fetchProductsByLocation = async (place) => {
    try {
      setLoading(true);
      setErrorMsg("");
      // Normalisation de la localisation
      const normalizedPlace = place
        .toLowerCase()
        .replace(/[éè]/g, "e")
        .replace(/[àä]/g, "a")
        .replace(/\s+/g, "");
      const sellersResponse = await fetch(
        `https://backendsellerapp.onrender.com/sellers/sell/nearby?place=${encodeURIComponent(
          normalizedPlace
        )}`
      );
      if (!sellersResponse.ok) {
        const errorData = await sellersResponse.json();
        throw new Error(errorData.message || "فشل في جلب البائعين");
      }
      const sellers = await sellersResponse.json();
      if (!Array.isArray(sellers)) throw new Error("تنسيق بيانات البائعين غير صالح");
      if (sellers.length === 0) {
        setProducts([]);
        setErrorMsg("لم يتم العثور على بائعين في منطقتك");
        return;
      }
      const sellerIds = sellers.map((seller) => seller._id);
      const productsResponse = await fetch(
        "https://backendsellerapp.onrender.com/products/bysellers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sellerIds }),
        }
      );
      if (!productsResponse.ok) {
        const errorData = await productsResponse.json();
        throw new Error(errorData.message || "فشل في جلب المنتجات");
      }
      const products = await productsResponse.json();
      if (!Array.isArray(products)) throw new Error("تنسيق بيانات المنتجات غير صالح");
      setProducts(products);
    } catch (error) {
      console.error("خطأ:", error);
      setErrorMsg(error.message || "فشل في تحميل البيانات");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("❌ الموقع الجغرافي غير مدعوم.");
      setLoading(false);
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );
          const data = await response.json();
          if (data.results?.length > 0) {
            const comp = data.results[0].components;
            const city = comp.city || comp.town || comp.village || "مدينة غير معروفة";
            const country = comp.country || "دولة غير معروفة";
            const placeName = `${city}, ${country}`;
            console.log("✅ المدينة المكتشفة:", placeName);
            setLocationName(placeName);
          } else {
            setLocationName("موقع غير معروف");
          }
        } catch (err) {
          console.error("خطأ في جلب اسم الموقع:", err);
          setErrorMsg("خطأ في جلب بيانات الموقع");
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

  useEffect(() => {
    if (locationName !== "📡 جاري الكشف..." && !locationName.startsWith("موقع غير معروف")) {
      fetchProductsByLocation(locationName);
    }
  }, [locationName]);

  useEffect(() => {
    // Reload la page une seule fois à l'arrivée sur /Market
    if (!window.location.hash.includes('reloaded')) {
      window.location.hash = 'reloaded';
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Box sx={styles.header}>
        <Container sx={styles.headerContent}>
          <StyledTypography variant="h1" sx={styles.title}>
            سوقي
          </StyledTypography>
          <Box sx={styles.locationInfo}>
            <Box sx={styles.locationIcon}>📍</Box>
            <StyledTypography variant="body2" sx={{ color: errorMsg ? "error.main" : "text.secondary" }}>
              {errorMsg ? errorMsg : locationName}
            </StyledTypography>
          </Box>
        </Container>
        <Box sx={styles.searchBox}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="ابحث عن المنتجات..."
            size="small"
            inputProps={{
              style: { fontFamily: 'Janna, sans-serif' }
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "background.paper",
              "& .MuiOutlinedInput-root": {
                borderRadius: 40,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Container sx={styles.container}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <StyledTypography variant="body1">جاري تحميل المنتجات بالقرب منك...</StyledTypography>
          </Box>
        ) : filteredProducts.length > 0 ? (
          <Box sx={styles.productGrid}>
            {filteredProducts.map((product) => (
              <Box onClick={() => handleOpenDialog(product)} key={product._id}>
                <ProductCard
                  title={product.ProductName}
                  price={`${Number(product.Price).toFixed(2)} دج`}
                  image={product.ProductImage || "/placeholder.svg"}
                  category={product.category || "غير معروف"}
                  shopName={product.ShopName || "متجر غير معروف"}
                  ratingValue={product.averageRating}
                  ratingCount={product.numberOfRatings}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <StyledTypography variant="body1">
              {searchTerm ? "لم يتم العثور على منتجات مطابقة" : errorMsg || "لم يتم العثور على منتجات في منطقتك"}
            </StyledTypography>
          </Box>
        )}
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xl"
        fullWidth
        fullScreen
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            width: '100vw',
            height: '100vh',
          },
        }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Box>
            <StyledTypography variant="h5" fontWeight="bold">
              {selectedProduct?.ProductName || "تفاصيل المنتج"}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              {sellerInfo?.ShopName || "جاري التحميل..."}
            </StyledTypography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={selectedProduct?.averageRating || 0} readOnly size="small" sx={{ color: "#4caf50" }} />
            <StyledTypography variant="caption" sx={{ ml: 1 }}>
              ({selectedProduct?.numberOfRatings || 0})
            </StyledTypography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, width: '100vw', height: '100vh', mr: '4px' }}>
          {selectedProduct && (
            <Grid container spacing={2} sx={{ width: '100%', height: '100%', textAlign: 'right', m: 0 }}>
              <Grid item xs={12} sx={{ height: 'auto', width: '100%' }}>
                <Box sx={{ ...styles.productImage, width: '100%', textAlign: 'right', height: 'auto' }}>
                  <img
                    src={selectedProduct.ProductImage}
                    alt={selectedProduct.ProductName}
                    style={{ maxWidth: "80%", maxHeight: "80%", width: '80%' , margin:"auto" }}
                  />
                </Box>
                <Box sx={{ mt: 3, width: '100%', textAlign: 'right', mr: '15px' }}>
                  <StyledTypography variant="h6" sx={{ mr: '15px' }} gutterBottom>
                    الوصف
                  </StyledTypography>
                  <StyledTypography variant="body1" sx={{ mb: 4  , mr: '15px' }}>
                    {selectedProduct.Description || "لا يوجد وصف متاح"}
                  </StyledTypography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} sx={{ width: '100%', height: '100%' }}>
                <Paper sx={{ ...styles.productInfo, width: '100%', height: '100%', textAlign: 'right' }}>
                  <StyledTypography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    معلومات المنتج
                  </StyledTypography>
                  <Box sx={{ mt: 2  , textAlign: 'right'  ,  width: '100%'} }>
                    <StyledTypography variant="subtitle2">التقييم المتوسط</StyledTypography>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mt: 2, textAlign: 'right', width: '100%' }}>
                      <Rating value={selectedProduct?.averageRating || 0} precision={0.5} readOnly sx={{ color: "#4caf50" }} />
                      <StyledTypography variant="body2" sx={{ ml: 1 }}>
                        ({selectedProduct?.numberOfRatings || 0} تقييمات)
                      </StyledTypography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <StyledTypography variant="subtitle2">قم بتقييم المنتج</StyledTypography>
                    <Rating
                      value={userRating}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setUserRating(newValue);
                          submitRating(newValue);
                        }
                      }}
                      sx={{ color: "#4caf50" }}
                    />
                  </Box>
                  {selectedProduct.category && (
                    <Box sx={{ mb: 2 }}>
                      <StyledTypography variant="subtitle2">الفئة</StyledTypography>
                      <Chip label={selectedProduct.category} sx={styles.categoryChip} />
                    </Box>
                  )}
                  <Divider sx={{ my: 2 }} />
                  {sellerInfo && (
                    <>
                      <StyledTypography variant="h6" gutterBottom sx={{ fontWeight: "bold", mt: 2, color: "#4caf50" }}>
                        معلومات البائع
                      </StyledTypography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Store color="primary" sx={{ mr: 1, color: "#4caf50" }} />
                        <StyledTypography>{sellerInfo.ShopName}</StyledTypography>
                      </Box>
                      {sellerInfo.PhoneNumber && (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <PhoneIcon color="primary" sx={{ mr: 1, color: "#4caf50" }} />
                          <StyledTypography>{sellerInfo.PhoneNumber}</StyledTypography>
                        </Box>
                      )}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <LocationOnIcon color="primary" sx={{ mr: 1, color: "#4caf50" }} />
                        <StyledTypography>{sellerInfo.Place}</StyledTypography>
                      </Box>
                      {sellerInfo.Latitude && sellerInfo.Longitude && (
                        <Box sx={{ mt: 3, height: 250 }}>
                          <StyledTypography variant="subtitle2" gutterBottom>
                            موقع البائع
                          </StyledTypography>
                          <SellerMap lat={sellerInfo.Latitude} lng={sellerInfo.Longitude} height="100%" />
                        </Box>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined" sx={{ minWidth: "250px", color: "#4caf50", borderColor: "#4caf50" }}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
