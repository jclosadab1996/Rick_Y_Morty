import { http, HttpResponse } from 'msw'

// Sample character data for tests
export const mockCharacters = {
  info: {
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character?page=2",
    prev: null
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1"
      },
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z"
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1"
      },
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      url: "https://rickandmortyapi.com/api/character/2",
      created: "2017-11-04T18:50:21.651Z"
    }
  ]
}

export const mockEpisode = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2"
  ],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z"
}

export const mockLocation = {
  id: 3,
  name: "Citadel of Ricks",
  type: "Space station",
  dimension: "unknown",
  residents: [
    "https://rickandmortyapi.com/api/character/8",
    "https://rickandmortyapi.com/api/character/14"
  ],
  url: "https://rickandmortyapi.com/api/location/3",
  created: "2017-11-10T13:08:13.191Z"
}

export const handlers = [
  // Handle GET request for characters
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json(mockCharacters)
  }),

  // Handle GET request for a specific character
  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    const { id } = params
    const character = mockCharacters.results.find(char => char.id === Number(id))
    
    if (character) {
      return HttpResponse.json(character)
    }
    
    return new HttpResponse(null, { status: 404 })
  }),

  // Handle GET request for episodes
  http.get('https://rickandmortyapi.com/api/episode/:id', () => {
    return HttpResponse.json(mockEpisode)
  }),

  // Handle GET request for locations
  http.get('https://rickandmortyapi.com/api/location/:id', () => {
    return HttpResponse.json(mockLocation)
  }),

  // Handle GET request for characters by location
  http.get('https://rickandmortyapi.com/api/character/', ({ request }) => {
    const url = new URL(request.url)
    const location = url.searchParams.get('location')
    
    if (location) {
      return HttpResponse.json(mockCharacters)
    }
    
    return new HttpResponse(null, { status: 404 })
  })
]