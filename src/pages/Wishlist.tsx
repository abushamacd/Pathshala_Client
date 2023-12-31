import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import {
  useGetUserQuery,
  useRemoveWishlistMutation,
} from "../redux/features/user/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";
import Loading from "../components/Loading";

export default function Wishlist() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserQuery(undefined);
  const books = data?.data?.wishlist;
  const [
    removeWishlist,
    { isSuccess, data: removeData, isError, error, reset },
  ] = useRemoveWishlistMutation();
  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${removeData?.message}`);
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
  }, [data, error, isError, isSuccess, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Wishlist ||" />
      <BreadCrumb title="Wishlist" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="container md:py-[30px] pb-[30px]  mx-auto">
            <div className="flex flex-wrap -m-4">
              {books?.map(
                (book: {
                  _id: string | undefined;
                  bookImgUrl: string | undefined;
                  title: string | undefined;
                  genre: string | undefined;
                  author: string | undefined;
                  publishedDate: string | undefined;
                }) => (
                  <div key={book._id} className="p-4 w-full md:w-1/2">
                    <div className="card md:min-h-[300px] md:items-center lg:card-side bg-white box_shadow p-2">
                      <figure className="md:w-[40%]">
                        <img
                          className="object-contain m-auto h-[200px] w-[200px]  "
                          src={book?.bookImgUrl}
                          alt="Album"
                        />
                      </figure>
                      <div className="md:w-[60%] card-body md:flex justify-center">
                        <h2 className="card-title capitalize ">
                          {book?.title}
                        </h2>
                        <ul className="info_list">
                          <li className="info">
                            {" "}
                            <span className="font-bold text-[#131921]">
                              Genre:{" "}
                            </span>
                            {book?.genre}
                          </li>
                          <li className="info">
                            <span className="font-bold text-[#131921]">
                              Author:{" "}
                            </span>
                            {book?.author}
                          </li>
                          <li className="info">
                            <span className="font-bold text-[#131921]">
                              Published At:{" "}
                            </span>
                            {book?.publishedDate}
                          </li>
                        </ul>
                        <div className="card-actions">
                          <div className="flex justify-center gap-[15px] mt-[20px]">
                            <button
                              onClick={() =>
                                removeWishlist({ data: { bookId: book._id } })
                              }
                              className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => navigate(`/books/${book?._id}`)}
                              className="first_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                            >
                              Show Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
