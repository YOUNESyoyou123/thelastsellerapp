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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import StoreIcon from "@mui/icons-material/Store";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { User } from "lucide-react";

// Centralized styles object with improved organization
const styles = {
  container: {
    py: 4,
    fontFamily: "Janna",
    animation: "fadeIn 0.5s ease-in-out",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Janna",
    fontSize: "2rem",
    mb: 3,
    color: "#4caf50",
  },
  shopCard: {
    p: 3,
    mt: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Janna",
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
    fontFamily: "Janna",
    background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  listCard: {
    borderRadius: 3,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    fontFamily: "Janna",
    "& .MuiListItem-root": {
      transition: "background-color 0.2s ease",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.03)" },
    },
  },
  dialog: {
    title: {
      bgcolor: "#4caf50",
      color: "white",
      fontFamily: "Janna",
      py: 2,
      "& .MuiTypography-root": { fontSize: "1.25rem" },
    },
    content: {
      pt: 3,
      pb: 3,
      px: 3,
      fontFamily: "Janna",
    },
    actions: {
      p: 2,
    },
  },
  textField: {
    fontFamily: "Janna",
    marginBottom: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "#4caf50",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Janna",
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
  infoIcon: { mr: 2, color: "#4caf50" },
  button: {
    fontFamily: "Janna",
    borderRadius: 2,
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

// Common Components

// StyledTypography component for consistent typography styling
const StyledTypography = ({ variant, children, sx = {}, ...props }) => (
  <Typography variant={variant} sx={{ fontFamily: "Janna", ...sx }} {...props}>
    {children}
  </Typography>
);

// StyledButton component for consistent button styling
const StyledButton = ({ children, sx = {}, ...props }) => (
  <Button sx={{ fontFamily: "Janna", ...styles.button, ...sx }} {...props}>
    {children}
  </Button>
);

// StyledTextField component
const StyledTextField = ({ label, sx = {}, ...props }) => (
  <TextField
    label={label}
    sx={{ ...styles.textField, ...sx }}
    InputLabelProps={{ style: { fontFamily: "Janna" } }}
    InputProps={{ style: { fontFamily: "Janna" } }}
    {...props}
  />
);

// InfoItem component for consistent info display
const InfoItem = ({ icon, title, value }) => (
  <Box sx={styles.infoItem}>
    {icon}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <StyledTypography variant="subtitle2">{title}</StyledTypography>
      <StyledTypography variant="body1">{value}</StyledTypography>
    </Box>
  </Box>
);

// Main Subcomponents

// SettingsHeader component
const SettingsHeader = () => (
  <StyledTypography variant="h4" sx={styles.title} gutterBottom>
    الإعدادات
  </StyledTypography>
);

// ShopStatusCard component
const ShopStatusCard = ({ isShopOpen, toggleShopStatus }) => (
  <Card sx={styles.shopCard}>
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
      sx={{ borderColor: "#4caf50", color: "#4caf50" }}
    >
      {isShopOpen ? "إغلاق المتجر" : "فتح المتجر"}
    </StyledButton>
  </Card>
);

// UserProfileCard component
const UserProfileCard = ({ userData }) => (
  <Card sx={styles.userCard}>
    <User className="width-96 height-96 mx-auto mb-2" />
    <IconButton color="success" sx={styles.iconButton}>
      <CameraAltIcon />
    </IconButton>
    <StyledTypography variant="h6" fontWeight="600">
      {userData.FullName}
    </StyledTypography>
    <Chip
      label={userData.Role === "seller" ? "بائع" : "عميل"}
      color={userData.Role === "seller" ? "primary" : "secondary"}
      sx={{ mt: 1, fontFamily: "Janna" }}
    />
  </Card>
);

// SettingsList component
const SettingsList = ({ setOpenPersonalInfoDialog, setOpenSecurityDialog }) => (
  <Card sx={styles.listCard}>
    <List disablePadding>
      <ListItem button divider onClick={() => setOpenPersonalInfoDialog(true)} sx={styles.listItem}>
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

// PersonalInfoDialog component
const PersonalInfoDialog = ({ open, onClose, userData }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={styles.dialog.title}>
      <Box display="flex" alignItems="center">
        <PersonIcon sx={{ mr: 1 }} />
        <StyledTypography variant="h6">المعلومات الشخصية</StyledTypography>
      </Box>
    </DialogTitle>
    <DialogContent sx={styles.dialog.content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ ...styles.infoItem, justifyContent: "center", mb: 3 }}>
            <PersonIcon sx={styles.infoIcon} />
            <StyledTypography variant="h5">{userData.FullName}</StyledTypography>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Grid>
        {userData.Role === "seller" && (
          <>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<StoreIcon sx={styles.infoIcon} />}
                title="اسم المتجر"
                value={userData.ShopName || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<EmailIcon sx={styles.infoIcon} />}
                title="البريد الإلكتروني"
                value={userData.Email || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<PhoneIcon sx={styles.infoIcon} />}
                title="الهاتف"
                value={userData.PhoneNumber || "غير محدد"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={<LocationOnIcon sx={styles.infoIcon} />}
                title="الموقع"
                value={userData.Place || "غير محدد"}
              />
            </Grid>
            {userData.description && (
              <Grid item xs={12}>
                <InfoItem
                  icon={<DescriptionIcon sx={styles.infoIcon} />}
                  title="الوصف"
                  value={userData.description}
                />
              </Grid>
            )}
          </>
        )}
        <Grid item xs={12}>
          <Box sx={styles.infoItem}>
            <SecurityIcon sx={styles.infoIcon} />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <StyledTypography variant="subtitle2">الدور</StyledTypography>
              <Chip
                label={userData.Role === "seller" ? "بائع" : "عميل"}
                color={userData.Role === "seller" ? "primary" : "secondary"}
                sx={{ fontFamily: "Janna", mt: 0.5 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={styles.dialog.actions}>
      <StyledButton onClick={onClose} sx={{ color: "#4caf50" }}>
        إغلاق
      </StyledButton>
    </DialogActions>
  </Dialog>
);

// SecurityDialog component
const SecurityDialog = ({
  open,
  onClose,
  passwordData,
  passwordError,
  showPassword,
  setShowPassword,
  handlePasswordChange,
  handlePasswordSubmit,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ fontFamily: "Janna" }}>تغيير كلمة المرور</DialogTitle>
    <DialogContent sx={styles.dialog.content}>
      {passwordError && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: "Janna" }}>
          {passwordError}
        </Alert>
      )}
      <StyledTextField
        label="كلمة المرور الحالية"
        type={showPassword ? "text" : "password"}
        fullWidth
        name="current"
        value={passwordData.current}
        onChange={handlePasswordChange}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField
        label="كلمة المرور الجديدة"
        type={showPassword ? "text" : "password"}
        fullWidth
        name="new"
        value={passwordData.new}
        onChange={handlePasswordChange}
        margin="normal"
      />
      <StyledTextField
        label="تأكيد كلمة المرور الجديدة"
        type={showPassword ? "text" : "password"}
        fullWidth
        name="confirm"
        value={passwordData.confirm}
        onChange={handlePasswordChange}
        margin="normal"
      />
    </DialogContent>
    <DialogActions sx={styles.dialog.actions}>
      <StyledButton onClick={onClose} sx={{ color: "#4caf50" }}>
        إلغاء
      </StyledButton>
      <StyledButton
        onClick={handlePasswordSubmit}
        variant="contained"
        sx={{
          bgcolor: "#4caf50",
          "&:hover": { bgcolor: "#388e3c" },
        }}
        disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}
      >
        حفظ
      </StyledButton>
    </DialogActions>
  </Dialog>
);

// Main Settings component
export default function Settings() {
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
  const [openSecurityDialog, setOpenSecurityDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError("كلمات السر الجديدة غير متطابقة");
      return;
    }
    if (passwordData.new.length < 6) {
      setPasswordError("يجب أن يحتوي كلمة السر على 6 أحرف على الأقل");
      return;
    }
    setPasswordError("");
    setPasswordData({ current: "", new: "", confirm: "" });
    setOpenSecurityDialog(false);
  };

  if (!userData) {
    return (
      <Container maxWidth="sm" sx={styles.container}>
        <StyledTypography variant="h6">
          جاري تحميل بيانات المستخدم...
        </StyledTypography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={styles.container}>
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
          setOpenSecurityDialog={setOpenSecurityDialog}
        />
      </Box>
      <PersonalInfoDialog
        open={openPersonalInfoDialog}
        onClose={() => setOpenPersonalInfoDialog(false)}
        userData={userData}
      />
      <SecurityDialog
        open={openSecurityDialog}
        onClose={() => setOpenSecurityDialog(false)}
        passwordData={passwordData}
        passwordError={passwordError}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handlePasswordChange={handlePasswordChange}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    </Container>
  );
}
