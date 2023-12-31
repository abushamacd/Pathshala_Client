import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useAddReadlistMutation,
  useAddWishlistMutation,
} from "../redux/features/user/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";

export default function BookList() {
  const { books } = useAppSelector((state) => state.book);
  const [addWishlist, { isSuccess, data, isError, error, reset }] =
    useAddWishlistMutation();

  const [
    addReadlist,
    {
      isSuccess: readIsSuccess,
      data: readData,
      isError: readisError,
      error: readError,
      reset: readReset,
    },
  ] = useAddReadlistMutation();
  const navigate = useNavigate();

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
    // for add to read list
    if (readIsSuccess) {
      toast(`${readData?.message}`);
      readReset();
    } else if (readisError) {
      toast.error((readError as IError)?.data.message);
      readReset();
    }
  }, [
    data,
    error,
    isError,
    isSuccess,
    reset,
    readIsSuccess,
    readData,
    readisError,
    readError,
    readReset,
  ]);
  return (
    <section className="">
      {books && books.length > 0 ? (
        <div className="container md:py-[30px] pb-[30px]  mx-auto">
          <div className="flex flex-wrap -m-4">
            {books?.map((book) => (
              <div key={book._id} className="p-4 w-full md:w-1/2">
                <div className="card md:min-h-[300px] md:items-center relative lg:card-side bg-white box_shadow p-2">
                  <button
                    onClick={() => addReadlist({ data: { bookId: book._id } })}
                    className="second_button duration-300 rounded-full py-[4px] px-[6px] font-medium absolute right-2 top-2 text-sm"
                  >
                    + Reading
                  </button>
                  <figure className="md:w-[40%]">
                    <img
                      className="object-contain m-auto h-[200px] w-[200px]  "
                      src={book?.bookImgUrl}
                      alt="Album"
                    />
                  </figure>
                  <div className="md:w-[60%] card-body md:flex justify-center">
                    <h2 className="card-title capitalize ">{book?.title}</h2>
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
                            addWishlist({ data: { bookId: book._id } })
                          }
                          className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                        >
                          Wishlist
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
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-4xl font-bold italic  text-center my-2">
          No book Found
        </h1>
      )}
    </section>
  );
}
