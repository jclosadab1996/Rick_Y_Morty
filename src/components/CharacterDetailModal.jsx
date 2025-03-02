import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CharacterDetailModal = ({
  character,
  onClose,
  isFavorite,
  toggleFavorite,
  onSelectRelatedCharacter,
}) => {
  const [tabActiva, setTabActiva] = useState("Información");
  const [episodes, setEpisodes] = useState([]);
  const [relatedCharacters, setRelatedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstEpisodeName, setFirstEpisodeName] = useState("");
  const [originDimension, setOriginDimension] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        // Get first 5 episodes only
        const episodeUrls = character.episode.slice(0, 5);
        const episodePromises = episodeUrls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const episodesData = await Promise.all(episodePromises);
        setEpisodes(episodesData);

        // Set first episode name
        if (episodesData.length > 0) {
          setFirstEpisodeName(episodesData[0].name);
        }

        // Fetch related characters (from same location)
        const locationResponse = await fetch(
          `https://rickandmortyapi.com/api/character/?location=${character.location.name}`
        );
        const locationData = await locationResponse.json();

        // Filter out the current character and get up to 3 related characters
        const filteredCharacters = locationData.results
          .filter((char) => char.id !== character.id)
          .slice(0, 3);
        setRelatedCharacters(filteredCharacters);

        // Set origin dimension
        if (character.origin.url && character.origin.url !== "") {
          try {
            const originResponse = await fetch(character.origin.url);
            const originData = await originResponse.json();
            setOriginDimension(originData.dimension || "Tierra (C-137)");
            // eslint-disable-next-line no-unused-vars
          } catch (error) {
            setOriginDimension("Tierra (C-137)");
          }
        } else {
          setOriginDimension("Tierra (C-137)");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [character]);

  const handleRelatedCharacterClick = (relatedCharacter) => {
    if (onSelectRelatedCharacter) {
      onSelectRelatedCharacter(relatedCharacter);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative">
        {/* Close button - positioned absolutely relative to the entire modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <FaTimes className="text-gray-700 w-5 h-5" />
        </button>

        {/* Header con imagen de fondo */}
        <div className="relative h-32 bg-purple-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('../../public/assets/card-background.jpg')",
            }}
          />

          {/* Avatar y nombre */}
          <div className="absolute -bottom-12 left-4 flex items-end">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Información del personaje */}
        <div className="pt-14 px-4 pb-2">
          <div className="flex items-center">
            <h2 className="text-xl font-bold truncate text-black">
              {character.name}
            </h2>
            {isFavorite && <span className="ml-2 text-yellow-400">★</span>}
            <button className="ml-auto text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
          <p className="text-gray-600 font-semibold">
            {character.species === "Human" ? "Human" : character.species}
          </p>
        </div>

        {/* Tabs */}
        <div className="px-4 border-b">
          <div className="flex">
            <button
              className={`py-2 px-4 font-bold ${
                tabActiva === "Información"
                  ? "border-b-2 border-rick-green text-rick-green"
                  : "text-gray-600"
              }`}
              onClick={() => setTabActiva("Información")}
            >
              Información
            </button>
            <button
              className={`py-2 px-4 font-bold ${
                tabActiva === "Episodios"
                  ? "border-b-2 border-rick-green text-rick-green"
                  : "text-gray-600"
              }`}
              onClick={() => setTabActiva("Episodios")}
            >
              Episodios
            </button>
          </div>
        </div>

        {/* Contenido de las tabs */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rick-green"></div>
            </div>
          ) : (
            <>
              {tabActiva === "Información" && (
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm text-gray-500 font-bold mb-2">
                      Género
                    </h3>
                    <p className="font-bold text-gray-800">
                      {character.gender === "Male"
                        ? "Masculino"
                        : character.gender === "Female"
                        ? "Femenino"
                        : character.gender}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm text-gray-500 font-bold mb-2">
                      Origen
                    </h3>
                    <p className="font-bold text-gray-800">{originDimension}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm text-gray-500 font-bold mb-2">
                      Estado
                    </h3>
                    <div className="flex items-center">
                      {character.status === "Alive" ? (
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span className="font-bold text-green-600">Vivo</span>
                        </div>
                      ) : character.status === "Dead" ? (
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          <span className="font-bold text-red-600">Muerto</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                          <span className="font-bold text-gray-600">
                            Desconocido
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm text-gray-500 font-bold mb-1">
                        First seen in
                      </h3>
                      <p className="font-bold text-gray-800">
                        {firstEpisodeName}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm text-gray-500 font-bold mb-1">
                        Last known location
                      </h3>
                      <p className="font-bold text-gray-800">
                        {character.location.name}
                      </p>
                    </div>
                  </div>

                  {/* Related characters */}
                  {relatedCharacters.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-700 mb-3">
                        Personajes relacionados
                      </h3>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                        {relatedCharacters.map((relChar) => (
                          <div
                            key={relChar.id}
                            className="border rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer"
                            onClick={() => handleRelatedCharacterClick(relChar)}
                          >
                            <div className="relative">
                              <img
                                src={relChar.image}
                                alt={relChar.name}
                                className="w-full h-24 object-cover"
                              />
                              <button
                                className="absolute top-1 right-1 text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(relChar.id);
                                }}
                              >
                                {isFavorite ? (
                                  <span className="text-yellow-400">★</span>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            <div className="p-2">
                              <h4 className="font-bold text-gray-800 text-sm truncate">
                                {relChar.name}
                              </h4>
                              <p className="text-xs text-gray-600 font-medium">
                                {relChar.species === "Human"
                                  ? "Humano"
                                  : relChar.species}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tabActiva === "Episodios" && (
                <div className="bg-gray-50 rounded-lg p-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="py-2 border-b last:border-b-0"
                    >
                      <div className="flex justify-between flex-wrap">
                        <span className="text-gray-500 font-medium">
                          {episode.episode}
                        </span>
                        <span className="font-bold text-gray-800">
                          {episode.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailModal;
