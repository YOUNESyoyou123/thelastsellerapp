//@ts-nocheck
import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Container,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Chip,
  TextField,
  Alert,
  InputAdornment,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { User } from "lucide-react";

// Color palette
const colors = {
  primary: "#4caf50",
  primaryDark: "#388e3c",
  secondary: "#f50057",
  background: "#f8f9fa",
  hover: "rgba(0,0,0,0.03)",
  textSecondary: "rgba(0, 0, 0, 0.6)",
  error: "#f44336",
  info: "#2196f3",
  warning: "#ff9800",
};

// Animation keyframes
const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px) }
      to { opacity: 1; transform: translateY(0) }
    }
  `,
  fadeInBox: `
    @keyframes fadeInBox {
      from { opacity: 0; transform: scale(0.9) }
      to { opacity: 1; transform: scale(1) }
    }
  `,
};

// Base styles
const baseStyles = {
  fontFamily: "Janna",
  animation: "fadeIn 0.5s ease-in-out",
};

// Component-specific styles
const componentStyles = {
  container: {
    ...baseStyles,
    py: 4,
  },
  titleBox: {
    backgroundColor: colors.primary,
    color: "white",
    p: 3,
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    mb: 4,
    animation: "fadeInBox 0.5s ease-in-out",
  },
  title: {
    ...baseStyles,
    fontWeight: "bold",
    fontSize: "2rem",
    color: "white",
  },
  shopCard: {
    p: 3,
    mt: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...baseStyles,
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    },
  },
  userCard: {
    p: 4,
    textAlign: "center",
    position: "relative",
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    ...baseStyles,
    background: `linear-gradient(to bottom, #ffffff, ${colors.background})`,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  listCard: {
    borderRadius: 3,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    ...baseStyles,
    "& .MuiListItem-root": {
      transition: "background-color 0.2s ease",
      "&:hover": { backgroundColor: colors.hover },
    },
  },
  dialog: {
    title: {
      bgcolor: colors.primary,
      color: "white",
      ...baseStyles,
      py: 2,
      "& .MuiTypography-root": { fontSize: "1.25rem" },
    },
    content: {
      pt: 3,
      pb: 3,
      px: 3,
      ...baseStyles,
    },
    actions: {
      p: 2,
    },
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    mb: 2,
    p: 2,
    borderRadius: 1,
    backgroundColor: "rgba(0,0,0,0.02)",
    transition: "background-color 0.2s ease",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
  },
  infoIcon: {
    mr: 2,
    color: colors.primary,
  },
  button: {
    ...baseStyles,
    borderRadius: 2,
  },
};

// Common Components
const StyledTypography = ({ variant, children, sx = {}, ...props }) => (
  <Typography variant={variant} sx={{ ...baseStyles, ...sx }} {...props}>
    {children}
  </Typography>
);

const StyledButton = ({ children, sx = {}, ...props }) => (
  <Button sx={{ ...componentStyles.button, ...sx }} {...props}>
    {children}
  </Button>
);

const InfoItem = ({ icon, title, value }) => (
  <Box sx={componentStyles.infoItem}>
    {icon}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <StyledTypography variant="subtitle2">{title}</StyledTypography>
      <StyledTypography variant="body1">{value}</StyledTypography>
    </Box>
  </Box>
);

// Main Subcomponents
const SettingsHeader = () => (
  <Box sx={componentStyles.titleBox}>
    <StyledTypography variant="h4" sx={componentStyles.title}>
      معلوماتي
    </StyledTypography>
  </Box>
);

const ShopStatusCard = ({ isShopOpen, toggleShopStatus }) => (
  <Card sx={componentStyles.shopCard}>
    <Box sx={{ flexGrow: 1 }}>
      <StyledTypography variant="h6">حالة المتجر</StyledTypography>
      <StyledTypography color="text.secondary">
        {isShopOpen ? "مفتوح حاليًا" : "مغلق حاليًا"}
      </StyledTypography>
    </Box>
    <StyledButton
      startIcon={isShopOpen ? <StorefrontIcon /> : <StoreIcon />}
      onClick={toggleShopStatus}
      color={isShopOpen ? "success" : "error"}
      variant="outlined"
      sx={{ borderColor: colors.primary, color: colors.primary }}
    >
      {isShopOpen ? "إغلاق المتجر" : "فتح المتجر"}
    </StyledButton>
  </Card>
);

const UserProfileCard = ({ userData }) => (
  <Card sx={componentStyles.userCard}>
    <User className="width-96 height-96 mx-auto mb-2" />
    <IconButton color="success" sx={{ position: "absolute", top: 16, right: 16 }}>
      <CameraAltIcon />
    </IconButton>
    <StyledTypography variant="h6" fontWeight="600">
      {userData.FullName}
    </StyledTypography>
    <Chip
      label={userData.Role === "seller" ? "بائع" : "عميل"}
      color={userData.Role === "seller" ? "primary" : "secondary"}
      sx={{ mt: 1, ...baseStyles }}
    />
  </Card>
);

const SettingsList = ({ setOpenPersonalInfoDialog }) => (
  <Card sx={componentStyles.listCard}>
    <List disablePadding>
      <ListItem button divider onClick={() => setOpenPersonalInfoDialog(true)}>
        <ListItemIcon>
          <PersonIcon color="success" />
        </ListItemIcon>
        <ListItemText
          primary={<StyledTypography variant="body1">المعلومات الشخصية</StyledTypography>}
          secondary={<StyledTypography variant="caption">عرض / تعديل بياناتك</StyledTypography>}
        />
        <ChevronRightIcon color="action" />
      </ListItem>
    </List>
  </Card>
);

const PersonalInfoDialog = ({ open, onClose, userData }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={componentStyles.dialog.title}>
      <Box display="flex" alignItems="center">
        <PersonIcon sx={{ mr: 1 }} />
        <StyledTypography variant="h6">المعلومات الشخصية</StyledTypography>
      </Box>
    </DialogTitle>
    <DialogContent sx={componentStyles.dialog.content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ ...componentStyles.infoItem, justifyContent: "center", mb: 3 }}>
            <PersonIcon sx={componentStyles.infoIcon} />
            <StyledTypography variant="h5">{userData.FullName}</StyledTypography>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Grid>
        {userData.Role === "seller" && (
          <>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<StoreIcon sx={componentStyles.infoIcon} />}
                title="اسم المتجر"
                value={userData.ShopName || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<EmailIcon sx={componentStyles.infoIcon} />}
                title="البريد الإلكتروني"
                value={userData.Email || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<PhoneIcon sx={componentStyles.infoIcon} />}
                title="الهاتف"
                value={userData.PhoneNumber || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<LocationOnIcon sx={componentStyles.infoIcon} />}
                title="الموقع"
                value={userData.Place || "غير محدد"}
              />
            </Grid>
            {userData.description && (
              <Grid item xs={12}>
                <InfoItem
                  icon={<DescriptionIcon sx={componentStyles.infoIcon} />}
                  title="الوصف"
                  value={userData.description}
                />
              </Grid>
            )}
          </>
        )}
        <Grid item xs={12}>
          <Box sx={componentStyles.infoItem}>
            <PersonIcon sx={componentStyles.infoIcon} />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <StyledTypography variant="subtitle2">الدور</StyledTypography>
              <Chip
                label={userData.Role === "seller" ? "بائع" : "عميل"}
                color={userData.Role === "seller" ? "primary" : "secondary"}
                sx={{ ...baseStyles, mt: 0.5 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={componentStyles.dialog.actions}>
      <StyledButton onClick={onClose} sx={{ color: colors.primary }}>
        إغلاق
      </StyledButton>
    </DialogActions>
  </Dialog>
);

// Main Settings component
export default function Settings() {
  // State management
  const [isShopOpen, setIsShopOpen] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.open ?? false;
    } catch {
      return false;
    }
  });
  const [userData, setUserData] = useState(null);
  const [openPersonalInfoDialog, setOpenPersonalInfoDialog] = useState(false);

  // Effects
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handlers
  const toggleShopStatus = async () => {
    const newStatus = !isShopOpen;
    try {
      const res = await fetch(
        `https://backendsellerapp.onrender.com/sellers/${userData._id}/shop-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ open: newStatus }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setIsShopOpen(newStatus);
        const updated = { ...userData, open: newStatus };
        setUserData(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Render
  if (!userData) {
    return (
      <Container maxWidth="sm" sx={componentStyles.container}>
        <StyledTypography variant="h6">
          جاري تحميل بيانات المستخدم...
        </StyledTypography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={componentStyles.container}>
      <style>{animations.fadeIn}</style>
      <style>{animations.fadeInBox}</style>
      <SettingsHeader />
      {userData.Role === "seller" && (
        <ShopStatusCard
          isShopOpen={isShopOpen}
          toggleShopStatus={toggleShopStatus}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
        <UserProfileCard userData={userData} />
        <SettingsList
          setOpenPersonalInfoDialog={setOpenPersonalInfoDialog}
        />
      </Box>
      <PersonalInfoDialog
        open={openPersonalInfoDialog}
        onClose={() => setOpenPersonalInfoDialog(false)}
        userData={userData}
      />
    </Container>
  );
}
