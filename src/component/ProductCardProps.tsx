import React from "react";
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
  title: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  rating,
  reviews,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Image + bouton favoris */}
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="150" image={image} alt={title} />
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
      <CardContent sx={{ p: 2 }}>
        {/* Titre */}
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, my: 1 }}>
          <StarIcon sx={{ fontSize: 16, color: "gold" }} />
          <Typography variant="caption" color="text.secondary">
            {rating} ({reviews})
          </Typography>
        </Box>

        {/* Price + Add to cart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {price}
          </Typography>
          <Button variant="contained" size="small">
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
