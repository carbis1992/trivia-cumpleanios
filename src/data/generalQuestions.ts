export interface TriviaQuestion {
  guest: string
  prompt: string
  options: [string, string, string]
  correctAnswer: number
}

export const generalQuestions: TriviaQuestion[] = [
  {
    guest: 'Cultura general',
    prompt: '¿Cuál es la capital de Argentina?',
    options: ['Córdoba', 'Buenos Aires', 'Rosario'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Qué planeta es conocido como el “Planeta Rojo”?',
    options: ['Venus', 'Marte', 'Júpiter'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Quién pintó “La noche estrellada”?',
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Cuál es el río más largo del mundo?',
    options: ['Amazonas', 'Nilo', 'Misisipi'],
    correctAnswer: 0,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Cuál es el océano más grande del planeta?',
    options: ['Atlántico', 'Índico', 'Pacífico'],
    correctAnswer: 2,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Qué órgano del cuerpo humano bombea la sangre?',
    options: ['Pulmón', 'Hígado', 'Corazón'],
    correctAnswer: 2,
  },
  {
    guest: 'Cultura general',
    prompt: '¿En qué año llegó el ser humano a la luna?',
    options: ['1965', '1969', '1972'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Cuál es el idioma con más hablantes nativos?',
    options: ['Inglés', 'Mandarín', 'Español'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Cuál es el país más poblado del mundo?',
    options: ['Estados Unidos', 'India', 'China'],
    correctAnswer: 1,
  },
  {
    guest: 'Cultura general',
    prompt: '¿Cuánto es 9 × 7?',
    options: ['54', '63', '72'],
    correctAnswer: 1,
  },
]
