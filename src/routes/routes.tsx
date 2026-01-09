import { createBrowserRouter } from "react-router";

import App from "@/layouts/App";
import Homepage from "@/pages/Homepage";
import CreateServicePage from "@/pages/CreateServicePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import PageNotFound from "@/pages/PageNotFound";
import PrivatePage from "@/layouts/PrivatePage";
import ServicesPage from "@/pages/ServicesPage";
import DetailsPage from "@/pages/DetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "services",
        element: (
          <PrivatePage>
            <ServicesPage />
          </PrivatePage>
        ),
      },
      {
        path: "create",
        element: (
          <PrivatePage>
            <CreateServicePage />
          </PrivatePage>
        ),
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: SignupPage,
      },
      {
        path: "profile",
        element: (
          <PrivatePage>
            <ProfilePage />
          </PrivatePage>
        ),
      },
      {
        path: "details/:id",
        element: (
          <PrivatePage>
            <DetailsPage />
          </PrivatePage>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: App,
    children: [
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
]);
