"use client";

import Head from "next/head";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/navigation";

export default function HomeComponent() {
  const router = useRouter();

  const handleMulaiTelusuri = () => {
    router.push("/form");
  };

  const handleIkutiIG = () => {
    window.open("https://www.instagram.com/podjoksoes/", "_blank");
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-b from-pink-200 to-pink-100 py-16"
        style={{
          backgroundImage: "url(/home/Image_Home_Background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="bg-green-700 text-white p-12 rounded-3xl">
              <div className="mb-6">
                <Image
                  src="/home/Image_Home_Nyender.png"
                  alt="Character thinking"
                  width={180}
                  height={150}
                  className="rounded-full"
                />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Jejak Rasa
                <br />
                dalam Ceritamu
              </h1>
              <p className="mb-8 leading-relaxed text-xl">
                Bukan ujian, anggap saja ini sebagai pojok teduh untuk duduk
                sebentar. Kita akan menengok ke dalam, meraba kembali
                kenangan-kenangan itu, dan menemukan 'rasa' unik yang
                membentukmu.
                <br />
                <br />
                Tidak ada jawaban benar atau salah, yang ada hanya ceritamu.
              </p>
              <button
                onClick={handleMulaiTelusuri}
                className="bg-pink-300 text-green-900 px-8 py-3 rounded-full font-bold hover:bg-pink-400"
              >
                Mulai Telusuri Rasamu
              </button>
            </div>

            {/* Right Image */}
            {/* <div className="relative">
              <Image
                src="/home/Image_Home_Background.png"
                alt="Pink nostalgic house"
                width={600}
                height={500}
                className="w-full"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[#FFC4E5] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Nostalgia Card */}
            <div className="relative">
              <div className="bg-gradient-to-b from-yellow-100 to-orange-200 p-8 rounded-3xl shadow-lg">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/home/Image_Home_1.png"
                    alt="Nostalgia Pojok Soes"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right - Story Text */}
            <div className="bg-pink-200 p-10 rounded-3xl">
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Tempat Nyaman untuk Menemati
                <br />
                Sesi yang Mengharukan.
              </h2>
              <p className="text-green-900 mb-6 leading-relaxed text-xl">
                “Podjok Soes” terinspirasi dari pojok, ruang kecil yang sering
                luput dari perhatian, tetapi justru menjadi tempat kita
                menemukan kenyamanan. Dalam sebuah ruangan, pojok adalah titik
                yang tenang, familiar, dan membuat kita merasa ‘pulang’.
              </p>
              <p className="text-green-900 mb-6 leading-relaxed text-xl">
                Filosofi inilah yang menjadi dasar Podjok Soes: menghadirkan
                momen singgah yang hangat lewat satu gigitan soes. Kami ingin
                setiap produk kami menjadi “pojok” kecil dalam keseharian
                pelanggan, tempat untuk bisa berhenti sejenak dari rutinitas,
                menikmati rasa yang lembut, dan merasakan kembali kehangatan
                masa kecil.
              </p>
              <p className="text-green-900 mb-6 leading-relaxed text-xl">
                Di Podjok Soes, kami percaya bahwa kebahagiaan tidak selalu
                besar.Karena manisnya, <b>Semanis Masa Kecil</b>.
              </p>
              <div className="flex items-center gap-4">
                {/* <div className="bg-white rounded-full p-1">
                  <Image
                    src="/founder-photo.png"
                    alt="Founder"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div> */}
                <button
                  onClick={handleIkutiIG}
                  className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800"
                >
                  Ikuti perjalanan pojok Soes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Image
              src="/soes-logo.png"
              alt="Pojok Soes Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-green-800">
              Kami membawa cita rasa nusantara di setiap gigitan.
            </h2>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Kelapa Pilihan */}
            <div className="rounded-3xl overflow-hidden relative">
              <Image
                src="/home/Image_Home_Kelapa.png"
                alt="Kelapa Pilihan"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-3xl font-bold text-white">
                  Kelapa
                  <br />
                  Pilihan
                </h3>
              </div>
            </div>

            {/* Pandan Alami */}
            <div className="rounded-3xl overflow-hidden relative">
              <Image
                src="/home/Image_Home_Pandan.png"
                alt="Pandan Alami"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-3xl font-bold text-white">
                  Pandan
                  <br />
                  Alami
                </h3>
              </div>
            </div>

            {/* Gula Merah Asli */}
            <div className="rounded-3xl overflow-hidden relative">
              <Image
                src="/home/Image_Home_Aren.png"
                alt="Gula Merah Asli"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-3xl font-bold text-white">
                  Gula
                  <br />
                  Merah
                  <br />
                  Asli
                </h3>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-green-700 text-white p-8 rounded-3xl text-center">
            <p className="leading-relaxed max-w-4xl mx-auto text-xl">
              Podjok Soes dibuat dari bahan-bahan tradisional Indonesia: pandan
              segar yang memberi aroma lembut khas jajanan rumahan, gula merah
              murni dengan manis hangat dan aroma karamel alami, serta kelapa
              pilihan yang menghadirkan rasa tropis ringan dan creamy. Perpaduan
              ketiganya menciptakan karakter rasa yang akrab, menenangkan, dan
              mengingatkan pada camilan masa kecil di kampung halaman.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Illustration */}
      <section className="relative w-full min-h-[500px] h-auto" id="footer">
        <div className="max-w-7xl mx-auto px-6">
          {/* Background Image Full */}
          <Image
            src="/home/Image_Home_Footer.png"
            alt="Characters illustration"
            fill
            className="object-cover"
          />

          {/* Social Media Icons - Positioned on Green Wall (Horizontal) */}
          <div className="absolute top-20 right-12 flex flex-row gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/podjoksoes/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white/95 hover:bg-white rounded-full px-4 py-2.5 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <div className="text-left">
                <p className="text-[15px] text-gray-500">Instagram</p>
                <p className="text-xs text-gray-800 font-semibold">
                  @podjoksoes
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6281314751116"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white/95 hover:bg-white rounded-full px-4 py-2.5 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="text-left">
                <p className="text-[15px] text-gray-500">WhatsApp</p>
                <p
                  className="text-xs text-gray-800 font-semibold"
                  style={{ fontFamily: "'pulang'" }}
                >
                  +62 813-1475-1116
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
