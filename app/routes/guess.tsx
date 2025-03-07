import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useEffect } from "react";
import { productImages, checkPrice } from "~/utils/guess";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const guess = formData.get("guess");
  const productIndex = formData.get("productIndex");
  const letter = checkPrice(guess as string, parseInt(productIndex as string));
  return { letter, productIndex };
}

export default function Guess() {
  const guessFetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  return <div className="flex flex-col items-center justify-center h-screen gap-3">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-10 left-10" onClick={() => navigate("/ikea")}>Terug</button>
    <div className="flex flex-col items-center justify-center gap-10">

      {guessFetcher.data?.letter ? <p className="text-2xl font-bold bg-green-500 text-white px-4 py-2 rounded-md">{guessFetcher.data?.letter}</p> :
      guessFetcher.data?.letter === null ? <p className="text-2xl font-bold bg-red-500 text-white px-4 py-2 rounded-md">Fout</p> :
      <>
      <h1 className="text-4xl font-bold">Raad de prijs</h1>
      <guessFetcher.Form method="post" className="flex flex-col items-center justify-center gap-10">
          <select name="productIndex" className="border-2 border-gray-300 rounded-md p-2">
            {productImages.map((image, index) => (
              <option value={index}>Product {index + 1}</option>
            ))}
          </select>
          <input type="text" placeholder="&euro; Prijs" name="guess" className="border-2 border-gray-300 rounded-md p-2" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md absolute bottom-10 left-1/2 -translate-x-1/2">Raad</button>
        </guessFetcher.Form>
        </>
      }
    </div>
  </div>
}