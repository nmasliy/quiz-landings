window.addEventListener('DOMContentLoaded', function () {
  const $screenHome = document.querySelector('.home')
  const $screenCheck = document.querySelector('.check')
  const $screenPrefinish = document.querySelector('.prefinish')
  const $screenFinish = document.querySelector('.finish')
  const $screenCall = document.querySelector('.call')
  const $screenQuiz = document.querySelector('.quiz')

  const $phone = document.querySelector('.phone-field__input')
  const $homeBtn = document.querySelector('.home__btn')

  const $quizBtn = document.querySelector('.quiz__btn')

  const $prefinishBtn = document.querySelector('.prefinish__btn')

  const $finishBtn = document.querySelector('.finish__btn')

  const $callNumber = document.querySelector('.call__number')

  const PHONE_LENGTH = 17 // Длина телефона с маской
  const SCREEN_DELAY = 1000 // Задержка перед показом  экрана

  $phone.addEventListener('click', () => {
    $phone.classList.add('is-active')
  })

  $phone.addEventListener('input', e => {
    $phone.classList.add('is-active')
    if (e.target.value.length < PHONE_LENGTH) {
      $finishBtn.classList.add('is-disabled')
    } else {
      $finishBtn.classList.remove('is-disabled')
    }
  })

  $homeBtn.addEventListener('click', async e => {
    e.preventDefault()
    await goToScreenFrom($screenHome, $screenQuiz)
  })

  $prefinishBtn.addEventListener('click', async e => {
    e.preventDefault()
    await goToScreenFrom($screenPrefinish, $screenFinish)
  })

  $finishBtn.addEventListener('click', async () => {
    if ($phone.value.length >= PHONE_LENGTH) {
      $callNumber.textContent = $phone.value;
      await goToScreenFrom($screenFinish, $screenCall)
    }
  })

  function initQuiz() {
    const $currentQuestion = document.querySelector('#currentQuestion')

    let activeIndex = 0

    const TOTAL_QUESTIONS = 5
    const $titleNum = document.querySelector('.quiz__title span')
    const $quizItems = document.querySelectorAll('.quiz__item')
    const $quizSteps = document.querySelectorAll('.quiz__step')

    $quizBtn.addEventListener('click', async () => {
      if (activeIndex + 2 <= TOTAL_QUESTIONS) {
        $quizItems[activeIndex].classList.remove('is-active')
        $quizSteps[activeIndex].classList.remove('is-active')
        $quizSteps[activeIndex].classList.add('is-checked')
        activeIndex++
        $quizItems[activeIndex].classList.add('is-active')
        $quizSteps[activeIndex].classList.add('is-active')

        $titleNum.textContent = activeIndex + 1
        $currentQuestion.textContent = activeIndex + 1
      } else {
        await goToScreenFrom($screenQuiz, $screenCheck)
        await new Promise(resolve => setTimeout(resolve, SCREEN_DELAY))
        await startCheckAnimation()
        await new Promise(resolve => setTimeout(resolve, SCREEN_DELAY))
        await goToScreenFrom($screenCheck, $screenPrefinish)
      }
    })
  }

  initQuiz()

  async function goToScreenFrom($from, $to) {
    const promise = new Promise((resolve, reject) => {
      $from.classList.add('is-hide')
      $from.classList.remove('is-show')

      $from.addEventListener('transitionend', () => {
        $from.classList.remove('is-active')
        $to.classList.add('is-active')
        setTimeout(() => {
          $to.classList.remove('is-hide')
          $to.classList.add('is-show')

          resolve()
        }, 10)
      })
    })

    return promise
  }

  async function startCheckAnimation() {
    const MAX_PROGRESS = 100
    const DELAY = 25
    let progress = 0

    const $progressValue = document.querySelector('.check__value')
    const $progressFill = document.querySelector('.check__bar-fill')

    const $checkCaption = document.querySelector('.check__caption span')

    const promise = new Promise((resolve, reject) => {
      const checkInterval = setInterval(async () => {
        $progressValue.textContent = progress + '%'
        $progressFill.style.width = progress + '%'
        // Полоска заполнена
        if (progress++ == MAX_PROGRESS) {
          clearInterval(checkInterval)
          resolve()
        }

        if (progress <= 20) {
          $checkCaption.textContent = 1
        } else if (progress <= 40) {
          $checkCaption.textContent = 2
        } else if (progress <= 60) {
          $checkCaption.textContent = 3
        } else if (progress <= 80) {
          $checkCaption.textContent = 4
        } else if (progress <= 90) {
          $checkCaption.textContent = 5
        }
      }, DELAY)
    })

    return promise
  }

  function initPhoneMask() {
    const phoneMask = IMask($phone, {
      mask: '+{38\\0} 00 000 00 00', // 17 символов
    })
  }

  initPhoneMask()
})
