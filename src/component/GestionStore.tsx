import { useState } from "react";
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
} from "@mui/material";
import {
  Store,
  LocationOn,
  Phone,
  Mail,
  Add,
  Delete,
  PhotoCamera,
  Euro,
} from "@mui/icons-material";

interface ShopInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  image: File | null; // ✅ Remplace string par File | null
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: File | null; // ✅ Remplace string par File | null
  category: string;
}

export default function GestionStore() {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    image: null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    image: null,
    category: "",
  });

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "younes"); // ✅ must match Cloudinary

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx9sn5ugl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Uploaded:", data);
      return data.secure_url; // Cloudinary public URL
    } else {
      console.error("❌ Cloudinary error:", data);
      return null;
    }
  };

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleShopChange = (field: keyof ShopInfo, value: string) => {
    setShopInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      showSnackbar("Nom et prix obligatoires !", "error");
      return;
    }
    const product: Product = { ...newProduct, id: Date.now().toString() };
    setProducts((prev) => [...prev, product]);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: null,
      category: "",
    });
    showSnackbar("Produit ajouté avec succès ✅", "success");
  };

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showSnackbar("Produit supprimé ❌", "info");
  };

  const handleSaveShop = () => {
    if (!shopInfo.name || !shopInfo.address) {
      showSnackbar("Nom et adresse requis !", "error");
      return;
    }
    showSnackbar("Informations du magasin sauvegardées ✅", "success");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        bgcolor: "#f9fafb",
        borderRadius: 2,
      }}
    >
      {/* HEADER */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          color: "primary.main",
        }}
      >
        <Store fontSize="large" />
        Gestion du Magasin
      </Typography>

      <Typography align="center" color="text.secondary" mb={4}>
        Gérez les informations de votre magasin et vos produits
      </Typography>

      {/* SHOP INFO */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          ":hover": { boxShadow: 6 },
        }}
      >
        <CardHeader
          title="Informations du Magasin"
          subheader="Configurez les informations de base"
        />
        <CardContent>
          {/* ALL FIELDS IN ONE ROW WITH SCROLL */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowX: "auto",
              pb: 2,
            }}
          >
            <TextField
              label="Nom du magasin *"
              value={shopInfo.name}
              onChange={(e) => handleShopChange("name", e.target.value)}
            />
            <TextField
              label="Adresse *"
              value={shopInfo.address}
              onChange={(e) => handleShopChange("address", e.target.value)}
            />
            <TextField
              label="Téléphone"
              value={shopInfo.phone}
              onChange={(e) => handleShopChange("phone", e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              value={shopInfo.email}
              onChange={(e) => handleShopChange("email", e.target.value)}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              {shopInfo.image
                ? "Changer l'image produit"
                : "Télécharger une image produit"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await uploadToCloudinary(file);
                    setShopInfo((p) => ({ ...p, image: url })); // Store Cloudinary URL
                  }
                }}
              />
            </Button>

            {shopInfo.image && (
              <img
                src={shopInfo.image}
                alt="Preview"
                style={{ width: "100%", marginTop: 8, borderRadius: 8 }}
              />
            )}
            <TextField
              label="Description"
              multiline
              rows={1}
              sx={{ minWidth: 200 }}
              value={shopInfo.description}
              onChange={(e) => handleShopChange("description", e.target.value)}
            />
          </Box>

          <Button
            onClick={handleSaveShop}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sauvegarder le magasin
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }}>
        <Chip label="Produits" />
      </Divider>

      {/* ADD PRODUCT */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          ":hover": { boxShadow: 6 },
        }}
      >
        <CardHeader
          title="Ajouter un produit"
          subheader="Remplissez les informations du produit"
        />
        <CardContent>
          {/* PRODUCT FIELDS IN ONE ROW */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowX: "auto",
              pb: 2,
            }}
          >
            <TextField
              label="Nom du produit *"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, name: e.target.value }))
              }
            />
            <TextField
              label="Prix (€) *"
              type="number"
              value={newProduct.price || ""}
              onChange={(e) =>
                setNewProduct((p) => ({
                  ...p,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
              InputProps={{
                startAdornment: <Euro sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              label="Catégorie"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, category: e.target.value }))
              }
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              {newProduct.image
                ? "Changer l'image produit"
                : "Télécharger une image produit"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setNewProduct((p) => ({ ...p, image: file }));
                }}
              />
            </Button>

            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                style={{ width: "100%", marginTop: 8, borderRadius: 8 }}
              />
            )}

            <TextField
              label="Description"
              multiline
              rows={1}
              sx={{ minWidth: 200 }}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((p) => ({
                  ...p,
                  description: e.target.value,
                }))
              }
            />
          </Box>

          <Button
            onClick={handleAddProduct}
            variant="contained"
            startIcon={<Add />}
            sx={{ mt: 2 }}
          >
            Ajouter le produit
          </Button>
        </CardContent>
      </Card>

      {/* PRODUCT LIST */}
      {products.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: 2,
                transition: "0.2s",
                ":hover": { boxShadow: 4 },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  {product.name}
                </Typography>

                <Chip
                  label={`${product.price.toFixed(2)} €`}
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />

                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>

                {product.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                )}
              </CardContent>

              <Box textAlign="right" p={1}>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography align="center" color="text.secondary" mt={4}>
          Aucun produit ajouté
        </Typography>
      )}

      {/* Snackbar notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
