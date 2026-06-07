import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "style-store-user";

const fakeUser = {
  id: 1,
  name: "محمد بابایی",
  email: "mohammad@example.com",
  phone: "09123456789",
};

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  function login(email, password) {
    if (!email || !password) {
      return {
        success: false,
        message: "ایمیل و رمز عبور را وارد کن.",
      };
    }

    setUser({
      ...fakeUser,
      email,
    });

    return {
      success: true,
      message: "با موفقیت وارد شدی.",
    };
  }

  function register(name, email, password) {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "همه فیلدها را پر کن.",
      };
    }

    setUser({
      id: Date.now(),
      name,
      email,
      phone: "",
    });

    return {
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد.",
    };
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updatedUser) {
    setUser((currentUser) => ({
      ...currentUser,
      ...updatedUser,
    }));
  }

  const isAuthenticated = Boolean(user);

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود.");
  }

  return context;
}
