import { useAppSelector } from "../redux/hooks";

export default function BooksHeader() {
  const { meta } = useAppSelector((state) => state.book);
  return (
    <div className="store_header flex justify-between items-center bg-white p-2 rounded-xl box_shadow">
      <div className="flex items-center gap-[15px]">
        <h4 className="store_header_text text-sm ">Sort By</h4>
        <select className="select min-h-[2rem] h-[2rem]">
          {/* <option disabled selected>
                Pick your favorite Simpson
              </option> */}
          <option>Best Selling</option>
          <option>New Arrivals</option>
          <option>Bart</option>
          <option>Lisa</option>
          <option>Maggie</option>
        </select>
      </div>
      <div className="">
        <h4 className="store_header_text text-xs ">{meta?.total} Books</h4>
      </div>
    </div>
  );
}
