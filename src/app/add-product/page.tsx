import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add-product Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")!.toString();
  const description = formData.get("description")!.toString();
  const image_url = formData.get("url")!.toString();
  const price = Number(formData.get("price")) || 0;

  if (!name || !description || !image_url || !price)
    throw Error("Missing required fields");

  await prisma.product.create({
    data: {
      name,
      description,
      image_url,
      price,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          placeholder="Product name"
          name="name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          className="textarea textarea-bordered mb-3 w-full"
          placeholder="Description"
          name="description"
          required
        ></textarea>
        <input
          type="url"
          required
          placeholder="Image URL"
          name="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="number"
          required
          placeholder="Price"
          name="price"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className=" w-full">Submit</FormSubmitButton>
      </form>
    </div>
  );
}
