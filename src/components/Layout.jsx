import { useEffect, useState } from "react";
import { API_URL, PAGE_TYPE } from "../config";
import useLocationHook from "../hooks/useLocationHook";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout() {
  const { latitude, longitude } = useLocationHook();
  const [search, setSearch] = useState("");
  const [allResto, setAllResto] = useState([]);
  const [filteredResto, setFilteredResto] = useState([]);

  useEffect(() => {
    getData();
  }, [latitude, longitude]);

  async function getData() {
    const response = await fetch(
      `${API_URL}?lat=${latitude}&lng=${longitude}&page_type=${PAGE_TYPE}`
    );

    const apiData = await response.json();

    setAllResto(apiData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredResto(apiData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  const handleSearch = () => {
    const filteredData = allResto.filter((res) =>
      res?.data?.name?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredResto(filteredData);
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="inner">
        <div className="row">
          <Outlet context={[filteredResto, latitude, longitude]} />
        </div>
      </section>
      <Footer />
    </>
  );
}
