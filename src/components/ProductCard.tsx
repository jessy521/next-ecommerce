"use client";
import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";

type productProp = {
  product: Product;
};
export default function ProductCard({ product }: productProp) {
  const isNew =
    Date.now() - new Date(product.created_at).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={"/products/" + product.id}>
      <div className="card w-full bg-base-100 transition hover:shadow-xl">
        <figure>
          <img
            src={product.image_url}
            alt={product.name}
            width={800}
            height={400}
            className="h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          {isNew && <div className="badge badge-secondary">New</div>}
          <p className="... truncate">{product.description}</p>
          <div className="card-actions justify-start">
            <PriceTag price={product.price} />
          </div>
        </div>
      </div>
    </Link>
  );
}
