import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { productImages } from "~/utils/guess";



export async function loader() {
  const data = await fetch("https://api.github.com/users/octocat");
  const json = await data.json();
  return json;
}

export default function Index() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentProductIndex((current) => (current + 1) % productImages.length);
    }, 200);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen dark:bg-white">
      <div className="flex flex-col items-center justify-stretch">
        <h1 className="text-4xl font-bold dark:text-black">Ikea Games</h1>
        <p className="text-sm text-gray-500">
          Zoek de prijs!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center" style={{ backgroundImage: `url(${productImages[currentProductIndex]})`, backgroundSize: "50%", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "50%", height: "50%"}}>
        </div>
        <div className="flex flex-col items-center justify-center">
          {currentProductIndex + 1}
      </div>
      <Link to="/guess" className="bg-blue-500 text-white px-4 py-2 rounded-md">Check een prijs</Link>
    </div>
  );
}
