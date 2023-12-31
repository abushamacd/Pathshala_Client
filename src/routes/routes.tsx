import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import Wishlist from "../pages/Wishlist";
import ReadList from "../pages/ReadList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading-book-list",
        element: (
          <PrivateRoute>
            <ReadList />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/edit-book/:id",
        element: <AddBook />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
