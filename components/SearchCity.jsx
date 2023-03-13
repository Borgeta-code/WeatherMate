import Image from "next/image";
import srcIcon from "../public/img/searchIcon.svg";

export default function SearchCity() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 m-6">
        <h1 className="font-semibold text-sm uppercase">
          Confira o clima de uma cidade:
        </h1>

        <div className="relative">
          <Image
            src={srcIcon}
            className="absolute right-[5px] top-[50%] translate-y-[-50%] w-10 cursor-pointer"
          />
          <input
            type="text"
            className=" w-[90vw] sm:w-[500px] p-2 rounded-[60px] border-2 border-white bg-primary text-white "
            placeholder="São Paulo"
          />
        </div>
      </div>

      <div className="w-[90vw] sm:w-[500px] border-b-2 border-b-secondary mb-4" />

      <div></div>
    </>
  );
}
