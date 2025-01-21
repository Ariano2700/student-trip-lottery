function PromotionPage() {
  return (
    <main className="drawer bg-[#181A1E] text-white z-10 flex flex-col items-center justify-center p-5 dialog min-h-screen">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold text-center mb-3">
          Rifa pro estudios - Fabian Yacila Gomez
        </h1>
      </div>
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col items-center gap-5">
          <div className="">
            <p className="text-xl text-center">Estudiante finalista de</p>
            <p className="text-xl text-center">
              Frank Arnott - Next Generation Explorers Award (NGEA™)
            </p>
          </div>
          <img src="/Fabian.jpg" alt="Fabian imagen" className="rounded-xl" />
        </div>
        <div className="max-w-2xl mx-auto p-4">
          {/* Main ticket container */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            {/* Top section */}
            <div className="bg-red-500 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="border border-dashed border-gray-400 p-2 bg-white">
                  <img
                    src="/canada_bandera.png"
                    alt="Bandera de canada"
                    className="size-16"
                  />{" "}
                </div>
                <div className="border border-dashed border-gray-400 p-2 bg-white text-black">
                  <p className="text-lg flex items-center gap-2">
                    Valor de
                    <span className="font-bold text-xl">S/.10</span>
                  </p>
                </div>
              </div>

              <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
                BOLETO DE RIFA PRO VIAJE DE ESTUDIOS A CANADÁ
              </h1>

              <p className="text-center text-xl md:text-2xl font-semibold text-white">
                N°00000
              </p>

              <div className="text-center text-sm md:text-base text-white space-y-2">
                <p className="font-semibold text-xl">
                  GRAN RIFA - FEBRERO 15/2025
                </p>
                <p>UNI FINALISTA</p>
                <p>Frank Arnott - Next Generation Explorers Award (NGEA™)</p>
                <p className="font-bold text-lg">PREMIOS</p>
                <div className="grid grid-cols-2 text-lg">
                  <p>
                    Premio 1: <span className="font-bold">S/.250</span>
                  </p>
                  <p>
                    Premio 2: <span className="font-bold">S/.150</span>
                  </p>
                  <p>
                    Premio 3: <span className="font-bold">S/.100</span>
                  </p>
                  <p>
                    Premio 4: <span className="font-bold">S/.100</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dotted separator */}
            <div className="border-t-2 border-dashed border-gray-400 my-2"></div>

            {/* Bottom section */}
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border border-dashed border-gray-400 p-2 gap-5">
                    <img
                      src="/canada_bandera.png"
                      alt="Bandera de canada"
                      className="size-16"
                    />{" "}
                    <p className="text-black">
                      Fecha de compra:{" "}
                      <span className="font-bold">DD/MM/AAAA</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-black">NOMBRE:</p>
                      <div className="flex items-center border-b-2 border-gray-300 py-1">
                        <span className="text-black text-xl">
                          _______________________________
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-center text-black">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold">BOLETO DE RIFA</h2>
                    <p className="text-xl md:text-2xl text-red-600 font-semibold">
                      N°00000
                    </p>
                  </div>
                  <div className="text-center space-y-2 flex items-center">
                    <img src="/yape_icon.png" alt="" className="size-20" />
                    <p className="text-xl md:text-2xl text-black font-semibold">
                      953-699-722
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default PromotionPage;
