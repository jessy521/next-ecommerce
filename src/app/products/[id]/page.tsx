import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <Image
        src={product.image_url}
        alt={product.name}
        className="rounded-lg"
        width={500}
        height={500}
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-4">{product.description}</p>
      </div>
    </div>
  );
}
