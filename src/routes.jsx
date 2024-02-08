import {
  PresentationChartBarIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import {  Texto, Messagerie } from "@/pages/dashboard";
import { SignIn} from "@/pages/auth";
import Acceuil from "./pages/dashboard/acceuil";
import Favoris from "./pages/dashboard/favoris";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <PresentationChartBarIcon {...icon} />,
        name: "Acceuil",
        path: "/acceuil",
        element: <Acceuil />,
        op: "",
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Favoris",
        path: "/favoris",
        element: <Favoris />,
        op: "",
      },
      {
        icon: <PhoneIcon {...icon} />,
        name: "Messagerie",
        path: "/messagerie",
        element: <Messagerie />,
        op: "",
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Texto",
        path: "/texto",
        element: <Texto />,
        op: "none",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },

    ],
  },
];

export default routes;
