import Link from "next/link";
import { BannerItem } from "@/types/Product";
import { urlFor } from "@/lib/client";

type Banner = {
  bannerData: BannerItem | number;
};

const HeroBanner = ({ bannerData }: Banner) => {
  return typeof bannerData !== "number" ? (
    <div className="relative h-[500px] bg-gradient-to-br from-[#f8f8f8] to-[#dcdcdc] rounded-md p-8">
      <p className="uppercase text-sm">{bannerData.smallText}</p>
      <h3 className="uppercase font-bold text-5xl">{bannerData.midText}</h3>
      <h1 className="text-7xl font-extrabold">{bannerData.largeText1}</h1>
      <h3 className="text-xs">{bannerData.largeText2}</h3>
      <img
        src={urlFor(bannerData.image).url()}
        alt="headphones"
        className="absolute top-0 right-[20%] w-[450px] h-[450px]"
      />
      <Link href={`/products/${bannerData.product}`}>
        <button
          type="button"
          className="text-white font-bold rounded-md bg-red-500 px-2 py-1 mt-4 hover:scale-105 transition"
        >
          {bannerData.buttonText}
        </button>
      </Link>
      <div className="absolute right-[10%] bottom-[5%] w-[300px] flex flex-col text-xs">
        <h5 className="font-bold">Descritption</h5>
        <p>{bannerData.desc}</p>
      </div>
    </div>
  ) : (
    <div>no data</div>
  );
};
export default HeroBanner;
