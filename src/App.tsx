import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhoneFormPage from "./pages/PhoneFormPage";
import CodeFormPage from "./pages/CodeFormPage";
import UserProfilePage from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneFormPage />} />
          <Route path="/code" element={<CodeFormPage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
