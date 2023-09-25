import { BannerItem } from "@/types/Product";
import { urlFor } from "@/lib/client";
import Link from "next/link";

type Props = {
  bannerData: BannerItem;
};

const FooterBanner = ({ bannerData }: Props) => {
  return (
    <div className="bg-red-500 rounded-md text-white px-7 py-10 relative h-[400px] mt-28">
      <div className="flex justify-between h-[100%]">
        {/* left */}
        <div>
          <p className="text-sm">{bannerData.discount}</p>
          <h3 className="font-extrabold text-5xl">{bannerData.largeText1}</h3>
          <h3 className="font-extrabold text-5xl">{bannerData.largeText2}</h3>
          <p className="text-sm">{bannerData.saleTime}</p>
        </div>
        {/* right */}
        <div className="self-end">
          <p className="text-sm">{bannerData.smallText}</p>
          <h3 className="font-extrabold text-5xl">{bannerData.midText}</h3>
          <p className="text-sm">{bannerData.desc}</p>
          <Link href={`/products/${bannerData.product}`}>
            <button className="text-red-500 font-bold rounded-md mt-3 bg-white px-2 py-1 hover:scale-105 transition">
              {bannerData.buttonText}
            </button>
          </Link>
        </div>
        <img
          src={urlFor(bannerData.image).url()}
          className="absolute -top-[25%] left-[30%]"
        />
      </div>
    </div>
  );
};
export default FooterBanner;
