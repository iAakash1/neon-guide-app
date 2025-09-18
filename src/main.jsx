import 'antd/dist/reset.css';
import { createRoot } from "react-dom/client";
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import App from "./App.jsx";
import "./index.css";

// Ant Design theme configuration with Google colors
const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1a73e8', // Google Blue
    colorSuccess: '#34a853', // Google Green  
    colorWarning: '#fbbc05', // Google Yellow
    colorError: '#ea4335',   // Google Red
    colorBgBase: '#1a1a1a',  // Dark background
    colorBgContainer: '#262626',
    borderRadius: 12,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 12,
      primaryShadow: '0 2px 8px rgba(26, 115, 232, 0.3)',
    },
    Card: {
      borderRadius: 16,
    },
    Form: {
      itemMarginBottom: 24,
    },
  },
};

createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={antdTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);