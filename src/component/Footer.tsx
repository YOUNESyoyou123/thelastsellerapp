//@ts-nocheck

import React, { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

/* ---------- Arabic translations ---------- */
const labels = {
  main: "الرئيسية",
  add: "إضافة",
  profile: "الملف الشخصي",
};

/* ---------- Simple styled components ---------- */
const FloatingPaper = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 16, // Added margin from bottom
  left: "50%",
  transform: "translateX(-50%)", // Center horizontally
  width: "94%", // Not full width to create floating effect
  maxWidth: 500,
  zIndex: theme.zIndex.appBar + 1,
  display: { xs: "block", md: "none" },
  borderRadius: 35, // Increased border radius
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)", // Enhanced shadow
  backgroundColor: "#fff",
  height: 72,
  transition: "all 0.3s ease", // Smooth transition
  "&:hover": {
    transform: "translateX(-50%) translateY(-2px)", // Subtle lift effect on hover
    boxShadow: "0 6px 28px rgba(0,0,0,0.15)",
  }
}));

const StyledBottomNavigation = styled(BottomNavigation)({
  height: "100%",
  backgroundColor: "transparent",
  borderRadius: 35, // Match parent border radius
  "& .MuiBottomNavigationAction-root": {
    minWidth: 0,
    padding: "8px 12px",
    color: "#666",
    transition: "all .25s ease",
    "&:hover": {
      transform: "scale(1.08)",
      color: "#4caf50",
    },
    "&.Mui-selected": {
      color: "#4caf50",
      fontWeight: 600,
      transform: "scale(1)",
    },
  },
  "& .MuiBottomNavigationAction-label": {
    fontSize: 11,
    fontFamily: "Janna, sans-serif",
  },
});

/* ---------- Component ---------- */
const MobileFooter = () => {
  const [value, setValue] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setRole(JSON.parse(stored).Role);
    } catch {
      /* ignore */
    }
  }, []);

  const tabs = [
    { label: labels.main, icon: <HomeIcon />, path: "/market" },
    ...(role === "seller"
      ? [{ label: labels.add, icon: <AddCircleIcon sx={{ fontSize: 32 }} />, path: "/GestionStore" }]
      : []),
    { label: labels.profile, icon: <AccountCircleIcon />, path: "/Settings" },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  if (!role) return null;

  return (
    <FloatingPaper>
      <StyledBottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        {tabs.map((tab, idx) => (
          <BottomNavigationAction
            key={idx}
            label={tab.label}
            icon={tab.icon}
          />
        ))}
      </StyledBottomNavigation>
    </FloatingPaper>
  );
};

export default MobileFooter;