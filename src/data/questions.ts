export interface TriviaQuestion {
  guest: string
  prompt: string
  options: [string, string, string]
  correctAnswer: number
}

// Son ejemplos para editar: personalizá nombres, preguntas, opciones y respuesta correcta.
export const questions: TriviaQuestion[] = [
  {
    guest: 'Mauro',
    prompt: '¿Qué deporte le gusta más mirar a Mauro?',
    options: ['Futbol', 'Rugby', 'Formula 1'],
    correctAnswer: 1,
  },
  {
    guest: 'Lara',
    prompt: '¿De que signo es Lara?',
    options: ['Sagitario', 'Aries', 'Piscis'],
    correctAnswer: 0,
  },
  {
    guest: 'Diego',
    prompt: '¿Qué deporte juega Diego?',
    options: ['Futbol', 'Padel', 'Voley'],
    correctAnswer: 2,
  },
  {
    guest: 'Barto',
    prompt: '¿De qué cuadro es Barto?',
    options: ['River', 'Boca', 'Central'],
    correctAnswer: 1,
  },
  {
    guest: 'Niki',
    prompt: '¿De dónde es Niki?',
    options: ['Polonia', 'Suecia', 'Alemania'],
    correctAnswer: 0,
  },
  {
    guest: 'Alex',
    prompt: 'Alex se abrio...',
    options: ['Un bar', 'Un gimnasio', 'Una rotisería'],
    correctAnswer: 1,
  },
  {
    guest: 'Jose',
    prompt: '¿Como se llama el hermano de Jose?',
    options: ['Juan', 'Javier', 'Julian'],
    correctAnswer: 0,
  },
  {
    guest: 'Mariano',
    prompt: '¿De que club de rugby es Marian?',
    options: ['GER', 'Duendes', 'Jockey'],
    correctAnswer: 2,
  },
  {
    guest: 'Sebas',
    prompt: '¿De donde es Seba?',
    options: ['Rufino', 'Rafaela', 'Pujato'],
    correctAnswer: 1,
  },
  {
    guest: 'Agus',
    prompt: '¿Que estudio Agus?',
    options: ['Ingeniero en alimentos y bebidas', 'Ingeniero agronomo', 'Ingeniero en sistemas'],
    correctAnswer: 0,
  },
  {
    guest: 'Meli',
    prompt: '¿Hace cuanto vive Meli aca?',
    options: ['10 años', '5 años', '8 años'],
    correctAnswer: 2,
  },
  {
    guest: 'Lucho',
    prompt: '¿Qué deporte hace Lucho?',
    options: ['Crossfit', 'Runner', 'Padel'],
    correctAnswer: 0,
  },
  {
    guest: 'Julia',
    prompt: '¿Cuantos años tiene Julia?',
    options: ['30', '31', '32'],
    correctAnswer: 2,
  },
  {
    guest: 'Fela',
    prompt: '¿De que club de rugby de rosario es Fela?',
    options: ['Duendes', 'GER', 'Caranchos'],
    correctAnswer: 2,
  },
  {
    guest: 'Meli prima',
    prompt: '¿Que estudio mi prima Meli?',
    options: ['Arquitectura', 'Diseño', 'Ingenieria'],
    correctAnswer: 0,
  },
  {
    guest: 'Sari',
    prompt: '¿Cuantos hermanos tiene Sari?',
    options: ['2', '3', '4'],
    correctAnswer: 0,
  },
  {
    guest: 'Maca',
    prompt: 'Nunca conoci a alguien que .... como Maca',
    options: ['duerma tanto', 'viaje tanto', 'hable tanto'],
    correctAnswer: 1,
  },
  {
    guest: 'Pedro',
    prompt: 'Pedro es ...',
    options: ['Abogado', 'Contador', 'Psicologo'],
    correctAnswer: 2,
  },
  {
    guest: 'Cami pigatto',
    prompt: '¿En que empresa trabaja Cami pigatto?',
    options: ['Amazon', 'MediaMarkt', 'El corte ingles'],
    correctAnswer: 1,
  },
  {
    guest: 'Pali',
    prompt: '¿De que cuadro de futbol es hincha el Pali?',
    options: ['NOB', 'CENTRAL', 'BOCA'],
    correctAnswer: 0,
  },
   {
    guest: 'Cami',
    prompt: '¿Que actividad recreativa le gusta hacer a Cami?',
    options: ['Teatro', 'Ceramica', 'Guitarra'],
    correctAnswer: 0,
  },
    {
    guest: 'Leo',
    prompt: '¿Donde trabaja Leo?',
    options: ['San Cugat', 'Rubi', 'Badalona'],
    correctAnswer: 1,
  },
    {
    guest: 'Yo',
    prompt: '¿Cuantos años cumplo?',
    options: ['34', '33', '32'],
    correctAnswer: 0  ,
  },
]
