import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  Box,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";

const RegisterChoice: React.FC = () => {
  const choices = [
    {
      title: "I am a Client",
      subtitle: "Sign up as a customer to access our services",
      icon: <PersonIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      route: "/register/client",
    },
    {
      title: "I am a Seller",
      subtitle: "Create a seller account to manage your shop",
      icon: <StorefrontIcon sx={{ fontSize: 60, color: "#388e3c" }} />,
      route: "/register/seller",
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 2  , py:2}}>
      {/* Titre */}
      <Typography align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Choose Your Account Type
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        Please select the type of account you want to create
      </Typography>

      {/* Grid responsive */}
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column", 

        }}
      >
        {choices.map((choice, index) => (
          <Grid
            item
            xs={12} // ✅ sur mobile → 1 carte par ligne
            md={6} // ✅ sur desktop → 2 cartes côte à côte
            key={index}
          >
            <Card
              sx={{
                textAlign: "center",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // ✅ shadow douce
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)", // ✅ petit effet hover
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardActionArea>
                <Box sx={{ mt: 3 }}>{choice.icon}</Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {choice.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {choice.subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ pb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 1,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
                >
                  Select
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RegisterChoice;
