import { useState } from "react";
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
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

// ✅ Default Avatar
import { User } from "lucide-react";

export default function Settings() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Paramètres
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
        {/* ✅ Profile Section */}
        <Card
          sx={{
            p: 3,
            textAlign: "center",
            position: "relative",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          {/* Avatar */}
          <User className=" width-96  height-96 mx-auto mb-2 " />

          {/* Camera Button */}
          <IconButton
            color="primary"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <CameraAltIcon />
          </IconButton>

          {/* User Info */}
          <Typography variant="h6" fontWeight="600">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Card>

        {/* ✅ Settings List */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <List disablePadding>
            {/* Personal Info */}
            <ListItem button divider>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Informations personnelles"
                secondary="Nom, prénom, date de naissance"
              />
              <ChevronRightIcon color="action" />
            </ListItem>

            {/* Security */}
            <ListItem button divider>
              <ListItemIcon>
                <SecurityIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Sécurité"
                secondary="Mot de passe, authentification"
              />
              <ChevronRightIcon color="action" />
            </ListItem>

            {/* Notifications */}
            <ListItem button>
              <ListItemIcon>
                <NotificationsActiveIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Notifications"
                secondary="Préférences de notification"
              />
              <ChevronRightIcon color="action" />
            </ListItem>
          </List>
        </Card>
      </Box>
    </Container>
  );
}
