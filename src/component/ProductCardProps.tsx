// ProductCardProps.tsx
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

interface ProductCardProps {
  _id: string;
  title: string;
  price: string;
  image: string;
  rating?: number;
  reviews?: number;
  category?: string;
  shopName?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  title,
  price,
  image,
  rating = 4.5, // Valeur par défaut
  reviews = 0, // Valeur par défaut
  category,
  shopName,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image + bouton favoris */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={image || "/placeholder.svg"}
          alt={title}
          sx={{
            objectFit: "cover",
            height: 180,
            width: "100%",
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Infos produit */}
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        {/* Shop name */}
        {shopName && (
          <Typography variant="caption" color="text.secondary">
            {shopName}
          </Typography>
        )}

        {/* Titre */}
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3em", // Pour maintenir la hauteur même avec 1 ligne
          }}
        >
          {title}
        </Typography>

        {/* Catégorie */}
        {category && (
          <Typography variant="caption" color="primary" sx={{ mt: 0.5 }}>
            {category}
          </Typography>
        )}

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, my: 1 }}>
          <StarIcon sx={{ fontSize: 16, color: "gold" }} />
          <Typography variant="caption" color="text.secondary">
            {rating.toFixed(1)} ({reviews})
          </Typography>
        </Box>

        {/* Price + Add to cart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto", // Pousse vers le bas
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {price}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 2,
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
