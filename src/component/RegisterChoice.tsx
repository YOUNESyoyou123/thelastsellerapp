//@ts-nocheck

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  Box,
  GlobalStyles,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";

const RegisterChoice: React.FC = () => {
  const choices = [
    {
      title: "أنا عميل",
      subtitle: "سجّل كعميل للوصول إلى خدماتنا",
      icon: <PersonIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      route: "/loginclient",
    },
    {
      title: "أنا تاجر",
      subtitle: "أنشئ حساب تاجر لإدارة متجرك",
      icon: <StorefrontIcon sx={{ fontSize: 60, color: "#388e3c" }} />,
      route: "/loginseller",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "Janna", // Apply font to the whole box
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            boxShadow: 2,
            py: 4,
            bgcolor: "white",
            borderRadius: 3,
          }}
        >
          {/* عنوان */}
          <Typography align="center" gutterBottom sx={{ fontWeight: "bold", fontFamily: "Janna" }}>
            اختر نوع حسابك
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 5, fontFamily: "Janna" }}
          >
            الرجاء اختيار نوع الحساب الذي ترغب في إنشائه
          </Typography>
          {/* شبكة متجاوبة */}
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {choices.map((choice, index) => (
              <Grid component="div" item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    },
                    fontFamily: "Janna", // Apply font to card content
                  }}
                >
                  <CardActionArea>
                    <Box sx={{ mt: 3 }}>{choice.icon}</Box>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontFamily: "Janna" }}>
                        {choice.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Janna" }}>
                        {choice.subtitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box sx={{ pb: 3 }}>
                    <Button
                      component={Link}
                      to={choice.route}
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 1,
                        px: 4,
                        py: 1,
                        textTransform: "none",
                        borderRadius: "8px",
                        fontFamily: "Janna", // Apply font to button
                      }}
                    >
                      اختر
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RegisterChoice;
