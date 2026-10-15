import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "@/components";
import { About, Contact, Events, FindUs, GivePage, Home } from "@/pages";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/give" element={<GivePage />} />
          <Route path="/find-us" element={<FindUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
