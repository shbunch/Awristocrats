import React, { useState } from "react";
import "./Brands.scss";
import { useQuery } from "@apollo/client";
import { QUERY_WATCHES } from "../../utils/queries";
import Brand1 from "../../assets/images/Logos/rolexlogo-removebg-preview.png";
import Brand2 from "../../assets/images/Logos/audemars_piguet_watch_logo_-_Google_Search-removebg-preview.png";
import Brand3 from "../../assets/images/Logos/Official-Patek-Philippe-Logo-removebg-preview.png";
import Brand4 from "../../assets/images/Logos/Longines-logo-500x281-removebg-preview.png";
import Brand5 from "../../assets/images/Logos/jaeger-leCoultrewatch_logo_-_Google_Search-removebg-preview.png";
import Brand6 from "../../assets/images/Logos/cartier-removebg-preview (1).png";

const Brands = () => {
  // Create an array of brand objects with image URLs and brand names
  const brandData = [
    {
      name: "Rolex",
      image: Brand1,
    },
    {
      name: "Audemars Piguet",
      image: Brand2,
    },
    {
      name: "Patek Philippe",
      image: Brand3,
    },
    {
      name: "Longines",
      image: Brand4,
    },
    {
      name: "Jaeger-LeCoultre",
      image: Brand5 ,
    },
    {
      name: "Cartier",
      image: Brand6,
    },
  ];
  const [selectedBrand, setSelectedBrand] = useState(null);
  // Use Apollo Client's useQuery hook to fetch data
  const { loading, error, data } = useQuery(QUERY_WATCHES, {
    variables: { brandName: selectedBrand, gender: "" }, // Pass your query variables here
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const watches = data.watches;
  // Extract a list of unique brand names from the queried data

  return (
    <div className="brands-container">
      <h1>Our Brands</h1>
      <div className={`brand-images ${selectedBrand ? "shrink" : ""}`}>
        {brandData.map((brand, index) => (
          <div className="brand" key={index}>
            <a
              href="#"
              onClick={() => setSelectedBrand(brand.name)}
              className={selectedBrand === brand.name ? "active" : ""}
            >
              <img src={brand.image} alt={`Brand ${index + 1}`} />
              <div className="brand-text">
                {" "}
                {/* Container for the fading text */}
                <p>{brand.name}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      {selectedBrand && (
        <>
          <h2>Watches</h2>
          <div className={`watches ${selectedBrand ? "center" : ""}`}>
            {watches
              .filter((watch) => watch.brandName === selectedBrand)
              .map((watch, index) => (
                <div className="watch" key={index}>
                  <img src={watch.imageURL} alt={watch.watchName} />
                  <h2>{watch.brandName}</h2>
                  <p>{watch.watchName}</p>
                  <p>Reference Number: {watch.referenceNumber}</p>
                  <p>Price: €{watch.price}</p>
                  <button>Add To Cart</button>
                  {/* Add other watch details here */}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Brands;
