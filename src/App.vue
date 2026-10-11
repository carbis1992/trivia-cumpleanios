<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { questions, type TriviaQuestion } from './data/questions'
import { generalQuestions } from './data/generalQuestions'

const QUESTION_TIME = 10
const RESULT_STORAGE_KEY = 'trivia-cumpleanios-results'
const FEEDBACK_DURATION = 1300

type Screen = 'welcome' | 'quiz' | 'result'
type TriviaPack = 'friends' | 'general'
type SavedResult = {
  score: number
  total: number
  completedAt: string
  pack: TriviaPack
}

const PACK_LABELS: Record<TriviaPack, string> = {
  friends: 'Trivia de la banda',
  general: 'Trivia de cultura general',
}

const PACKS: Record<TriviaPack, TriviaQuestion[]> = {
  friends: questions,
  general: generalQuestions,
}

const screen = ref<Screen>('welcome')
const activePack = ref<TriviaPack>('friends')
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const score = ref(0)
const secondsLeft = ref(QUESTION_TIME)
const storageError = ref('')
const savedResult = ref<SavedResult | null>(loadSavedResult())
let timer: ReturnType<typeof setInterval> | undefined
let feedbackTimeout: ReturnType<typeof setTimeout> | undefined

const currentQuestions = computed(() => PACKS[activePack.value])
const currentQuestion = computed(() => currentQuestions.value[currentQuestionIndex.value])
const isCorrect = computed(
  () => selectedAnswer.value === currentQuestion.value?.correctAnswer,
)

function loadSavedResult(): SavedResult | null {
  try {
    const result = localStorage.getItem(RESULT_STORAGE_KEY)
    if (!result) return null

    const parsed: unknown = JSON.parse(result)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'score' in parsed &&
      'total' in parsed &&
      'completedAt' in parsed &&
      'pack' in parsed &&
      typeof parsed.score === 'number' &&
      typeof parsed.total === 'number' &&
      typeof parsed.completedAt === 'string' &&
      (parsed.pack === 'friends' || parsed.pack === 'general')
    ) {
      return {
        score: parsed.score,
        total: parsed.total,
        completedAt: parsed.completedAt,
        pack: parsed.pack,
      }
    }

    storageError.value = 'El resultado guardado tiene un formato inválido y no se pudo recuperar.'
    console.error('El resultado guardado de la trivia tiene un formato inválido.', parsed)
    return null
  } catch (error) {
    storageError.value = 'No se pudo leer el resultado guardado en este navegador.'
    console.error('No se pudo leer el resultado guardado de la trivia.', error)
    return null
  }
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function startTimer() {
  stopTimer()
  secondsLeft.value = QUESTION_TIME
  timer = setInterval(() => {
    if (secondsLeft.value > 1) {
      secondsLeft.value -= 1
    } else {
      secondsLeft.value = 0
      stopTimer()
      advanceQuestion()
    }
  }, 1000)
}

function startQuiz(pack: TriviaPack = activePack.value) {
  const packQuestions = PACKS[pack]
  if (!packQuestions.length) return

  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  activePack.value = pack
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  score.value = 0
  screen.value = 'quiz'
  startTimer()
}

function chooseAnswer(optionIndex: number) {
  if (selectedAnswer.value !== null) return

  selectedAnswer.value = optionIndex
  stopTimer()

  if (optionIndex === currentQuestion.value.correctAnswer) {
    score.value += 1
  }

  feedbackTimeout = setTimeout(advanceQuestion, FEEDBACK_DURATION)
}

function advanceQuestion() {
  if (screen.value !== 'quiz') return
  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout)
    feedbackTimeout = undefined
  }

  if (currentQuestionIndex.value + 1 >= currentQuestions.value.length) {
    finishQuiz()
    return
  }

  currentQuestionIndex.value += 1
  selectedAnswer.value = null
  startTimer()
}

function finishQuiz() {
  stopTimer()
  screen.value = 'result'
  savedResult.value = {
    score: score.value,
    total: currentQuestions.value.length,
    completedAt: new Date().toISOString(),
    pack: activePack.value,
  }

  try {
    localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(savedResult.value))
    storageError.value = ''
  } catch (error) {
    storageError.value = 'La partida terminó, pero no se pudo guardar el resultado en este navegador.'
    console.error('No se pudo guardar el resultado de la trivia.', error)
  }
}

onBeforeUnmount(() => {
  stopTimer()
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
})
</script>

<template>
  <main class="page-shell">
    <!-- <div class="confetti confetti-one" aria-hidden="true"></div>
    <div class="confetti confetti-two" aria-hidden="true"></div> -->

    <!-- <header class="topbar">
      <a class="brand" href="#" @click.prevent="screen = 'welcome'">
        <span class="brand-icon" aria-hidden="true">✳</span>
        <span>la trivia</span>
      </a>
      <span class="topbar-note">un juego para celebrar</span>
    </header> -->
<div class="topbar">
  <img src="./assets/top.png" alt="Logo de la trivia" class="logo" />
</div>

    <div class="gato-container">
      <img src="./assets/gato.png" alt="Gato celebrando" class="gato" />
    </div>
    <section v-if="screen === 'welcome'" class="card welcome-card" aria-labelledby="welcome-title">
      <h1 id="welcome-title">¿Cuánto conocés<br />a esta banda?</h1>
      <p class="welcome-copy">
        23 personas, 23 preguntas, 10 segundos para cada una.<br />
        ¡A ver quién estuvo prestando atención!
      </p>
      <!-- <div class="welcome-details">
        <span><span aria-hidden="true">⏱</span> 10 segundos por pregunta</span>
        <span><span aria-hidden="true">♥</span> 23 preguntas</span>
      </div> -->
      <button class="button button-primary start-button" type="button" @click="startQuiz('friends')">
        Mandale play
        <!-- <span aria-hidden="true">→</span> -->
        </button>
      <!-- <p class="sample-note">Las preguntas actuales son ejemplos editables.</p> -->
      <!-- <p v-if="savedResult" class="last-result">
        Tu último resultado: <strong>{{ savedResult.score }} de {{ savedResult.total }}</strong>
        <span class="last-result-pack">({{ PACK_LABELS[savedResult.pack] }})</span>
      </p>
      <p v-if="storageError" class="storage-warning" role="status">{{ storageError }}</p> -->
    </section>
    
    <section v-else-if="screen === 'quiz'" class="card quiz-card" aria-labelledby="question-title">

      <div class="quiz-meta">
        <span class="question-counter">
          PREGUNTA <strong>{{ String(currentQuestionIndex + 1).padStart(2, '0') }}</strong>
          <span class="counter-divider">/</span> {{ String(currentQuestions.length).padStart(2, '0') }}
        </span>
        <span class="timer" :class="{ 'timer-low': secondsLeft <= 5 }" aria-live="off">
          <span aria-hidden="true">◷</span> 00:{{ String(secondsLeft).padStart(2, '0') }}
        </span>
      </div>
      <!-- <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="currentQuestionIndex + 1"
        :aria-valuemin="1"
        :aria-valuemax="questions.length"
        :aria-label="`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`"
      >
        <span class="progress-fill" :style="{ width: `${progress}%` }"></span>
      </div> -->
      <div class="question-content">
        <!-- <span class="guest-label">PREGUNTA PARA {{ currentQuestion.guest }}</span> -->
        <h1 id="question-title">{{ currentQuestion.prompt }}</h1>
        <!-- <p class="answer-hint">Elegí una opción. ¡No vale cambiar!</p> -->
        <div class="answers" role="group" :aria-label="`Opciones para ${currentQuestion.prompt}`">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="option"
            class="answer-option"
            :class="{
              'answer-selected': selectedAnswer === index,
              'answer-correct': selectedAnswer !== null && index === currentQuestion.correctAnswer,
              'answer-incorrect': selectedAnswer === index && !isCorrect,
            }"
            type="button"
            :disabled="selectedAnswer !== null"
            @click="chooseAnswer(index)"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span>{{ option }}</span>
            <span
              v-if="selectedAnswer !== null && index === currentQuestion.correctAnswer"
              class="answer-mark"
              aria-hidden="true"
            >✓</span>
            <span
              v-else-if="selectedAnswer === index && !isCorrect"
              class="answer-mark"
              aria-hidden="true"
            >×</span>
          </button>
        </div>
        <p v-if="selectedAnswer !== null" class="feedback" :class="{ 'feedback-wrong': !isCorrect }" aria-live="polite">
          {{ isCorrect ? '¡Correcto! 🎉' : '¡Uy, no era esa!' }}
        </p>
      </div>
      <!-- <div class="quiz-footer">
        <span>Racha de festejo <span aria-hidden="true">✳</span></span>
        <span>{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
      </div> -->
    </section>

    <section v-else class="card result-card" aria-labelledby="result-title">
      <!-- <div class="result-badge" aria-hidden="true">{{ score === questions.length ? '🏆' : '🎉' }}</div> -->
      <div class="eyebrow"> ¡FIN DE LA TRIVIA!</div>
      <p class="result-pack">{{ PACK_LABELS[activePack] }}</p>
      <p class="result-score">
        <strong>{{ score }}</strong>
        <span>{{ score === 1 ? 'respuesta correcta' : 'respuestas correctas' }}</span>
      </p>
      <p class="result-total">de {{ currentQuestions.length }} preguntas</p>
      <div class="result-progress" aria-hidden="true">
        <span :style="{ width: `${(score / currentQuestions.length) * 100}%` }"></span>
      </div>
      <p v-if="storageError" class="storage-warning" role="status">{{ storageError }}</p>
      <button class="button button-primary replay-button" type="button" @click="startQuiz(activePack)">
        Jugar otra vez <span aria-hidden="true">↻</span>
      </button>
      <button
        v-if="activePack === 'friends'"
        class="button button-secondary replay-button"
        type="button"
        @click="startQuiz('general')"
      >
        Trivia de cultura general
      </button>
      <button
        v-else
        class="button button-secondary replay-button"
        type="button"
        @click="startQuiz('friends')"
      >
        Volver a la banda
      </button>
      <button class="text-button" type="button" @click="screen = 'welcome'">Volver al inicio</button>
    </section>
    <div class="disco-container">
      <img src="./assets/disco.png" alt="disco celebrando" class="disco" />
    </div>
    <div class="globos-container">
      <img src="./assets/globos.png" alt="globos celebrando" class="globos" />
    </div>
    <div class="me-container">
      <img src="./assets/me.png" alt="me celebrando" class="me" />
    </div>
    <!-- <footer class="page-footer">
      <span>hecho con <span class="heart">♥</span> para celebrar</span>
    </footer> -->
  </main>
</template>
<style scoped>
.logo {
      width: 100%;
    margin: auto;
    margin-left: 14px;
}

.pack-picker {
  display: grid;
  gap: 0.75rem;
  width: min(100%, 22rem);
  margin: 1.5rem auto 0;
}

.button-secondary {
  background: #f9f6ff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--pink);
  margin-top: 0.5rem;
}

.last-result-pack {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  opacity: 0.85;
}

.result-pack {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.8;
}

.gato-container {
  position: absolute;
    top: 17rem;
    left: 19rem;
}

.gato {
  width: 85px;
}

.me-container {
     position: absolute;
     width: 100%;
    bottom: -10rem;
    left: -40px;
}

.me {
  width: 50%;
}

.disco-container {
  position: absolute;
    bottom: 2rem;
    width: 100%;
    margin-left: 33rem;
  
}
.disco {
      width: 45%;
}

.globos-container {
     position: absolute;
    bottom: -54px;
    margin-left: 25rem;
    width: 100%; 
}

.globos {
  width: 30%
}
</style>