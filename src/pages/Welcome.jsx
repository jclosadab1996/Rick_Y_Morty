import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
        style={{
          backgroundImage: "url('/assets/portal-background.jpg')",
          filter: "brightness(0.6)",
        }}
      />

      {/* Content */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="Rick and Morty Logo"
          className="w-full max-w-md mx-auto mb-8"
        />

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Bienvenido al multiverso
        </h1>

        <p className="text-xl text-gray-200 mb-10">
          Explora todos los personajes del universo de Rick y Morty, descubre
          sus historias y navega a través de las diferentes dimensiones.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="bg-rick-green hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-xl flex items-center justify-center mx-auto transition-all"
        >
          Comenzar aventura
          <FaArrowRight className="ml-2" />
        </button>
      </div>

      <div className="absolute bottom-4 text-white text-sm opacity-70">
        TM & © 2024 The Cartoon Network, Inc. All Rights Reserved.
      </div>
    </div>
  );
};

export default Welcome;
