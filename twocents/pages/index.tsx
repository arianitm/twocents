"use client";
import Hero from "@/components/HeroSection";
import Home from "./Home";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Index() {
  return (
    <>
      <title>twocents - Your Net Worth</title>
      <Header></Header>
      <Hero />
      <Home />
      <Footer />
    </>
  );
}
