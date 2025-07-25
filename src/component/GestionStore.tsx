//@ts-nocheck
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  Chip,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Store,
  PhotoCamera,
  Add,
  Delete,
  Euro,
  Edit as EditIcon,
} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MobileFooter from "./Footer";

// Styles object
const styles = {
  container: {
    py: 4,
    px: { xs: 2, sm: 4 },
    bgcolor: "#f5f5f5",
    borderRadius: 2,
    marginBottom: "110px", // Increased marginBottom
    paddingBottom: "110px", // Added paddingBottom
    minHeight: "calc(100vh - 80px)", // Adjusted minHeight
    overflowY: "auto",
    fontFamily: "Janna, sans-serif",
  },
  title: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    color: "#4caf50",
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "#f5f5f5",
    fontFamily: "Janna, sans-serif",
  },
  card: {
    mb: 4,
    borderRadius: 3,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    backgroundColor: "#ffffff",
    fontFamily: "Janna, sans-serif",
  },
  productCard: {
    borderRadius: 3,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#ffffff",
    fontFamily: "Janna, sans-serif",
  },
  productImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  },
  productContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    fontFamily: "Janna, sans-serif",
  },
  button: {
    mt: 2,
    borderRadius: 2,
    fontFamily: "Janna, sans-serif",
    display: 'flex',
    margin: '0 auto'
  },
  textField: {
    "& .MuiInputLabel-root": {
      fontFamily: "Janna, sans-serif",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Janna, sans-serif",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#4caf50",
      },
      "&:hover fieldset": {
        borderColor: "#4caf50",
      },
    },
  },
  chip: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    fontFamily: "Janna, sans-serif",
    fontWeight: "bold",
  },
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: 3,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
};

// Translations
const translations = {
  en: {
    storeManagement: "Store Management",
    shopInfo: "Shop Information",
    basicInfo: "Configure basic information",
    shopName: "Shop Name *",
    address: "Address *",
    phone: "Phone",
    email: "Email",
    uploadImage: "Upload Image",
    changeImage: "Change Image",
    description: "Description",
    save: "Edit / Save",
    products: "Products",
    addProduct: "Add Product",
    productName: "Product Name *",
    price: "Price (DA) *",
    category: "Category",
    add: "Add Product",
    noProducts: "No products added",
    editProduct: "Edit Product",
    edit: "Edit",
    cancel: "Cancel",
    saveChanges: "Save",
    successShopUpdate: "Shop updated successfully ✅",
    errorShopUpdate: "Error updating shop ❌",
    successProductAdd: "Product added successfully ✅",
    errorProductAdd: "Error adding product ❌",
    successProductDelete: "Product deleted successfully ✅",
    errorProductDelete: "Error deleting product ❌",
    successProductUpdate: "Product updated successfully ✅",
    errorProductUpdate: "Error updating product ❌",
  },
  ar: {
    storeManagement: "إدارة المتجر",
    shopInfo: "معلومات المتجر",
    shopName: "اسم المتجر *",
    address: "العنوان *",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    uploadImage: "تحميل صورة",
    changeImage: "تغيير الصورة",
    description: "الوصف",
    save: "تعديل / حفظ",
    products: "المنتجات",
    addProduct: "إضافة منتج",
    productName: "اسم المنتج *",
    price: "السعر (دج) *",
    category: "الفئة",
    add: "إضافة المنتج",
    noProducts: "لم يتم إضافة أي منتجات",
    editProduct: "تعديل المنتج",
    edit: "تعديل",
    cancel: "إلغاء",
    saveChanges: "حفظ",
    successShopUpdate: "تم تحديث المتجر بنجاح ✅",
    errorShopUpdate: "خطأ في تحديث المتجر ❌",
    successProductAdd: "تمت إضافة المنتج بنجاح ✅",
    errorProductAdd: "خطأ في إضافة المنتج ❌",
    successProductDelete: "تم حذف المنتج بنجاح ✅",
    errorProductDelete: "خطأ في حذف المنتج ❌",
    successProductUpdate: "تم تحديث المنتج بنجاح ✅",
    errorProductUpdate: "خطأ في تحديث المنتج ❌",
  },
};

interface ShopInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  image: string | null;
}

interface Product {
  _id: string;
  ProductName: string;
  Price: number;
  Description: string;
  ProductImage: string | null;
  category: string;
  IdresponsibleShop: string;
}

export default function GestionStore() {
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const t = translations[lang];
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    image: null,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    Price: 0,
    Description: "",
    ProductImage: null as File | null,
    category: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const getSellerFromStorage = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    return JSON.parse(stored);
  };

  useEffect(() => {
    const fetchSellerInfo = async () => {
      const seller = getSellerFromStorage();
      if (!seller) {
        showSnackbar(t.errorShopUpdate, "error");
        return;
      }
      try {
        const response = await fetch(
          `https://backendsellerapp.onrender.com/sellers/${seller._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setShopInfo({
            name: data.ShopName || "",
            address: data.Place || "",
            phone: data.PhoneNumber || "",
            email: data.Email || "",
            description: data.description || "",
            image: data.shopImage || null,
          });
          showSnackbar(t.successShopUpdate, "success");
        }
      } catch (error) {
        console.error("Erreur fetch seller:", error);
        showSnackbar("Erreur de connexion au serveur", "error");
      }
    };
    fetchSellerInfo();
    fetchProducts();
  }, [t.successShopUpdate, t.errorShopUpdate]);

  const fetchProducts = async () => {
    const seller = getSellerFromStorage();
    if (!seller) return;
    try {
      const response = await fetch(
        `https://backendsellerapp.onrender.com/products/seller/${seller._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        showSnackbar(`${t.errorProductAdd}: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Erreur fetch products:", error);
      showSnackbar("Erreur de connexion au serveur", "error");
    }
  };

  const handleShopChange = (field: keyof ShopInfo, value: string) => {
    setShopInfo((prev) => ({ ...prev, [field]: value }));
  };

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "younes");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dx9sn5ugl/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return res.ok ? data.secure_url : null;
    } catch (error) {
      console.error("Cloudinary error:", error);
      return null;
    }
  };

  const sauvgardershoinfo = async () => {
    const seller = getSellerFromStorage();
    if (!seller) {
      showSnackbar("⚠️ Aucun vendeur connecté", "error");
      return;
    }
    try {
      const response = await fetch(
        `https://backendsellerapp.onrender.com/sellers/${seller._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ShopName: shopInfo.name,
            Place: shopInfo.address,
            PhoneNumber: shopInfo.phone,
            Email: shopInfo.email,
            description: shopInfo.description,
            shopImage: shopInfo.image,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        showSnackbar(t.successShopUpdate, "success");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event('user-login'));
      } else {
        showSnackbar(`${t.errorShopUpdate}: ${data.message}`, "error");
      }
    } catch (error) {
      console.error(error);
      showSnackbar("Erreur de connexion au serveur", "error");
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.ProductName || newProduct.Price <= 0) {
      showSnackbar("Nom et prix valide obligatoires !", "error");
      return;
    }
    const seller = getSellerFromStorage();
    if (!seller?._id) {
      showSnackbar("⚠️ Aucun vendeur connecté", "error");
      return;
    }
    try {
      let productImageUrl = null;
      if (newProduct.ProductImage) {
        productImageUrl = await uploadToCloudinary(newProduct.ProductImage);
      }
      const response = await fetch(
        "https://backendsellerapp.onrender.com/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ProductName: newProduct.ProductName,
            Price: Number(newProduct.Price),
            Description: newProduct.Description,
            ProductImage: productImageUrl,
            IdresponsibleShop: seller._id,
            category: newProduct.category,
            ShopName: seller.ShopName,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        showSnackbar(t.successProductAdd, "success");
        setNewProduct({
          ProductName: "",
          Price: 0,
          Description: "",
          ProductImage: null,
          category: "",
        });
        fetchProducts();
      } else {
        showSnackbar(`${t.errorProductAdd}: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Erreur ajout produit:", error);
      showSnackbar("Erreur de connexion au serveur", "error");
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      const response = await fetch(
        `https://backendsellerapp.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        showSnackbar(t.successProductDelete, "info");
        fetchProducts();
      } else {
        const data = await response.json();
        showSnackbar(`${t.errorProductDelete}: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Erreur suppression produit:", error);
      showSnackbar("Erreur de connexion au serveur", "error");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct({
      ...product,
      category: product.category || "",
    });
    setIsEditDialogOpen(true);
    setNewImageFile(null);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      let imageUrl = editingProduct.ProductImage;
      if (newImageFile) {
        const uploadedUrl = await uploadToCloudinary(newImageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      const response = await fetch(
        `https://backendsellerapp.onrender.com/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ProductName: editingProduct.ProductName,
            Price: editingProduct.Price,
            Description: editingProduct.Description,
            ProductImage: imageUrl,
            category: editingProduct.category,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        showSnackbar(t.successProductUpdate, "success");
        setProducts(
          products.map((p) => (p._id === editingProduct._id ? data.product : p))
        );
        setIsEditDialogOpen(false);
      } else {
        showSnackbar(`${t.errorProductUpdate}: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Erreur modification produit:", error);
      showSnackbar("Erreur de connexion au serveur", "error");
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={styles.container}>
        {/* Language toggle button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            sx={{
              fontFamily: "Janna, sans-serif",
              borderColor: "#4caf50",
              color: "#4caf50",
              "&:hover": {
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.04)",
              },
            }}
          >
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </Box>
        {/* Header */}
        <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
          <Store fontSize="large" sx={{ color: "#4caf50" }} />
          {t.storeManagement}
        </Typography>
        {/* Shop Info Card */}
        <Card sx={styles.card}>
          <CardHeader
            title={t.shopInfo}
            subheader={t.basicInfo}
            sx={{
              backgroundColor: "#4caf50",
              color: "#ffffff",
              fontFamily: "Janna, sans-serif",
            }}
          />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label={t.shopName}
                value={shopInfo.name}
                onChange={(e) => handleShopChange("name", e.target.value)}
                sx={styles.textField}
                variant="outlined"
              />
              <TextField
                label={t.address}
                value={shopInfo.address}
                onChange={(e) => handleShopChange("address", e.target.value)}
                sx={styles.textField}
                variant="outlined"
              />
              <TextField
                label={t.phone}
                value={shopInfo.phone}
                onChange={(e) => handleShopChange("phone", e.target.value)}
                sx={styles.textField}
                variant="outlined"
              />
              <TextField
                label={t.email}
                type="email"
                value={shopInfo.email}
                onChange={(e) => handleShopChange("email", e.target.value)}
                sx={styles.textField}
                variant="outlined"
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{
                  fontFamily: "Janna, sans-serif",
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  "&:hover": {
                    borderColor: "#4caf50",
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                  },
                }}
              >
                {shopInfo.image ? t.changeImage : t.uploadImage}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await uploadToCloudinary(file);
                      if (url) setShopInfo((p) => ({ ...p, image: url }));
                    }
                  }}
                />
              </Button>
              {shopInfo.image && (
                <img
                  src={shopInfo.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    marginTop: 8,
                    borderRadius: 8,
                    maxHeight: 200,
                    objectFit: "cover",
                  }}
                />
              )}
              <TextField
                label={t.description}
                multiline
                rows={3}
                value={shopInfo.description}
                onChange={(e) => handleShopChange("description", e.target.value)}
                sx={styles.textField}
                variant="outlined"
              />
            </Box>
            <Button
              onClick={sauvgardershoinfo}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#4caf50",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
                fontFamily: "Janna, sans-serif",
                borderRadius: 2,
                display: 'flex',
                margin: '0 auto'
              }}
            >
              {t.save}
            </Button>
          </CardContent>
        </Card>
        {/* Products Divider */}
        <Divider sx={{ my: 4 }}>
          <Chip label={t.products} sx={styles.chip} />
        </Divider>
        {/* Add Product Card */}
        <Card sx={styles.card}>
          <CardHeader
            title={t.addProduct}
            sx={{
              backgroundColor: "#4caf50",
              color: "#ffffff",
              fontFamily: "Janna, sans-serif",
            }}
          />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label={t.productName}
                value={newProduct.ProductName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, ProductName: e.target.value })
                }
                sx={styles.textField}
                variant="outlined"
              />
              <TextField
                label={t.price}
                type="number"
                value={newProduct.Price || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Price: parseFloat(e.target.value) || 0,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">DA</InputAdornment>
                  ),
                }}
                sx={styles.textField}
                variant="outlined"
              />
              <TextField
                label={t.category}
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                sx={styles.textField}
                variant="outlined"
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{
                  fontFamily: "Janna, sans-serif",
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  "&:hover": {
                    borderColor: "#4caf50",
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                  },
                }}
              >
                {newProduct.ProductImage ? t.changeImage : t.uploadImage}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewProduct({ ...newProduct, ProductImage: file });
                  }}
                />
              </Button>
              <TextField
                label={t.description}
                multiline
                rows={3}
                value={newProduct.Description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Description: e.target.value })
                }
                sx={styles.textField}
                variant="outlined"
              />
            </Box>
            <Button
              onClick={handleAddProduct}
              variant="contained"
              startIcon={<Add />}
              sx={{
                mt: 2,
                backgroundColor: "#4caf50",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
                fontFamily: "Janna, sans-serif",
                borderRadius: 2,
                display: 'flex',
                margin: '0 auto'
              }}
            >
              {t.add}
            </Button>
          </CardContent>
        </Card>
        {/* Products Grid */}
        {products.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 3,
              mt: 2,
            }}
          >
            {products.map((product) => (
              <Card key={product._id} sx={styles.productCard}>
                {product.ProductImage && (
                  <img
                    src={product.ProductImage}
                    alt={product.ProductName}
                    style={styles.productImage}
                  />
                )}
                <CardContent sx={styles.productContent}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    sx={{ fontFamily: "Janna, sans-serif" }}
                  >
                    {product.ProductName}
                  </Typography>
                  <Chip
                    label={`${Number(product.Price).toFixed(2)} دج`}
                    sx={{
                      my: 1,
                      backgroundColor: "#4caf50",
                      color: "#ffffff",
                      fontFamily: "Janna, sans-serif",
                    }}
                  />
                  {product.category && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "Janna, sans-serif" }}
                    >
                      {t.category}: {product.category}
                    </Typography>
                  )}
                  {product.Description && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, fontFamily: "Janna, sans-serif" }}
                    >
                      {product.Description}
                    </Typography>
                  )}
                </CardContent>
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    mt: "auto",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(product)}
                    aria-label={t.edit}
                    sx={{ color: "#4caf50" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveProduct(product._id)}
                    aria-label="Delete"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography
            align="center"
            color="text.secondary"
            mt={4}
            sx={{ fontFamily: "Janna, sans-serif" }}
          >
            {t.noProducts}
          </Typography>
        )}
        <div className="h-20" ></div>
        {/* Edit Product Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          sx={styles.dialog}
        >
          <DialogTitle sx={{ fontFamily: "Janna, sans-serif" }}>
            {t.editProduct}
          </DialogTitle>
          <DialogContent>
            {editingProduct && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                <TextField
                  label={t.productName}
                  value={editingProduct.ProductName}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      ProductName: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  sx={styles.textField}
                  variant="outlined"
                />
                <TextField
                  label={t.price}
                  type="number"
                  value={editingProduct.Price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      Price: Number(e.target.value),
                    })
                  }
                  InputProps={{ startAdornment: <Euro sx={{ mr: 1 }} /> }}
                  fullWidth
                  margin="normal"
                  sx={styles.textField}
                  variant="outlined"
                />
                <TextField
                  label={t.category}
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  sx={styles.textField}
                  variant="outlined"
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    mt: 1,
                    fontFamily: "Janna, sans-serif",
                    borderColor: "#4caf50",
                    color: "#4caf50",
                    "&:hover": {
                      borderColor: "#4caf50",
                      backgroundColor: "rgba(76, 175, 80, 0.04)",
                    },
                  }}
                >
                  {newImageFile ? t.changeImage : t.uploadImage}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewImageFile(file);
                    }}
                  />
                </Button>
                <TextField
                  label={t.description}
                  multiline
                  rows={4}
                  value={editingProduct.Description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      Description: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  sx={styles.textField}
                  variant="outlined"
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsEditDialogOpen(false)}
              sx={{
                fontFamily: "Janna, sans-serif",
                color: "#4caf50",
              }}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleUpdateProduct}
              variant="contained"
              sx={{
                backgroundColor: "#4caf50",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
                fontFamily: "Janna, sans-serif",
                borderRadius: 2,
              }}
            >
              {t.saveChanges}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.severity}
            sx={{ width: "100%", fontFamily: "Janna, sans-serif" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
      <MobileFooter />
    </>
  );
}
