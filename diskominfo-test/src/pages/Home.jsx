import React, { useState } from "react";
import Table from "../components/ui/Table";
import useFetchData from "../hooks/useFetchData";
import Cards from "../components/ui/Cards";
import CardsKel from "../components/ui/CardsKel";

function Home() {
  const { data, loading, error } = useFetchData(
    "http://localhost:3001/proxy?type=kecamatan",
    ""
  );

  const {
    data: dataKel,
    loading: loadKel,
    error: errorKel,
  } = useFetchData("http://localhost:3001/proxy?type=kelurahan", "");

  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  // const itemsPerPage = 30; // Tentukan jumlah item per halaman

  // // Menghitung total halaman
  // const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  // // Filter data berdasarkan kata kunci pencarian
  // const filteredData = data?.data?.filter(
  //   (tenant) =>
  //     tenant.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     tenant.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     tenant.jenis_usaha?.label
  //       ?.toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  // );

  // // Menentukan data yang ditampilkan di halaman saat ini
  // const currentData = filteredData?.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // // Fungsi untuk menangani perubahan halaman
  // const handlePageChange = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const limitDataKel = dataKel?.slice(0, 20);
  console.log("kel", limitDataKel);

  return (
    <div className="hero bg-base-200 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <div className="hero-content mt-[72px] md:mt-[64px]">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {loading ? (
            <div
              role="status"
              className="items-center text-center w-fit mx-auto my-0 pt-[100px]"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : error ? (
            <p>Error fetching data: {error?.message || String(error)}</p>
          ) : data?.length === 0 ? (
            <p>No data available.</p>
          ) : (
            <>
              <div className="mb-2">
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Data Camat Per{" "}
                  <span class="text-blue-600 dark:text-blue-500">
                    Kecamatan
                  </span>{" "}
                  Kota Samarinda
                </h1>
              </div>
              <div className="flex flex-wrap gap-x-[2%] md:gap-x-[1%] gap-y-4">
                {data &&
                  data.map((item, index) => <Cards key={index} item={item} />)}
              </div>
            </>
          )}
          {loadKel ? (
            <div
              role="status"
              className="items-center text-center w-fit mx-auto my-0 pt-[100px]"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : errorKel ? (
            <p>Error fetching data: {errorKel?.message || String(error)}</p>
          ) : dataKel?.length === 0 ? (
            <p>No data available.</p>
          ) : (
            <>
              <div className="mb-2 mt-10">
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Data Lurah Per{" "}
                  <span class="text-blue-600 dark:text-blue-500">
                    Kelurahan
                  </span>{" "}
                  Kota Samarinda
                </h1>
              </div>
              <div className="flex flex-wrap gap-x-[2%] md:gap-x-[1%] gap-y-4">
                {dataKel &&
                  dataKel.map((item, index) => (
                    <CardsKel key={index} item={item} />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
