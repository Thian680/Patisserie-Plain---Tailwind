import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center px-[20px] py-[50px]">
      <h1 className="text-[2.5em] font-bold text-[#d9534f] mb-[20px]">
        404 - Page Not Found
      </h1>
      <p className="text-[1.2em] text-[#666]">
        The page you are looking for does not exist.
      </p>
      <img
        className="block mx-auto max-w-[500px] w-full rounded-[10px] mb-[50px]"
        src="/img/handsomedog.jpg"
        alt="iro"
      />
      <Link
        to="/"
        className="flex justify-center items-center text-[2em] text-white no-underline p-[20px] bg-[#d9534f] border border-[#ee0f0f] max-w-[200px] w-full mx-auto rounded-[10px] hover:text-[#d9534f] hover:bg-white"
      >
        Okay Chef Doggo!
      </Link>
    </div>
  );
}

export default NotFoundPage;
