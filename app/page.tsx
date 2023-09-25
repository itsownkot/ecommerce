import { FooterBanner, HeroBanner, Product } from "@/components";
import { client } from "@/lib/client";
import { DataSet } from "@/types/Product";

async function getData(): Promise<DataSet> {
  const products = await client.fetch('*[_type == "products"]');
  const bannerData = await client.fetch('*[_type == "banner"]');
  return { products, bannerData };
}

export default async function Home() {
  const { products, bannerData } = await getData();

  return (
    <>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <section className="flex flex-col justify-center items-center p-4">
        <h1 className="w-fit text-5xl font-extrabold text-gradient leading-normal">
          Best selling products
        </h1>
        <p>speakers of many variations</p>
      </section>
      <section className="flex justify-center flex-wrap mt-5 gap-4">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
      <FooterBanner bannerData={bannerData && bannerData[0]} />
    </>
  );
}
