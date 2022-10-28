window.addEventListener('DOMContentLoaded', function () {
  const $screenHome = document.querySelector('.home')
  const $screenCheck = document.querySelector('.check')
  const $screenCall = document.querySelector('.call')
  const $screenFinish = document.querySelector('.finish')

  const $phone = document.querySelector('.phone-field__input')
  const $homeBtn = document.querySelector('.home__btn')

  const $finishBtn = document.querySelector('.finish__btn')

  const $callNumber = document.querySelector('.call__number')
  const $checkNumber = document.querySelector('.check__number')

  const PHONE_LENGTH = 17 // Длина телефона с маской
  const SCREEN_DELAY = 1000 // Задержка перед показом  экрана

  $phone.addEventListener('click', () => {
    $phone.classList.add('is-active')
  })

  $phone.addEventListener('input', e => {
    $phone.classList.add('is-active')
    if (e.target.value.length < PHONE_LENGTH) {
      $homeBtn.classList.add('is-disabled')
    } else {
      $homeBtn.classList.remove('is-disabled')
    }
  })

  $finishBtn.addEventListener('click', () => {
    goToScreenFrom($screenFinish, $screenCall)
  })

  $homeBtn.addEventListener('click', async e => {
    e.preventDefault()

    if ($phone.value.length >= PHONE_LENGTH) {
      $callNumber.textContent = $phone.value
      $checkNumber.textContent = $phone.value
      await goToScreenFrom($screenHome, $screenCheck)
      await new Promise(resolve => setTimeout(resolve, SCREEN_DELAY))
      await startCheckAnimation()
      await new Promise(resolve => setTimeout(resolve, SCREEN_DELAY))
      await goToScreenFrom($screenCheck, $screenFinish)
    }
  })

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

    const promise = new Promise((resolve, reject) => {
      const checkInterval = setInterval(async () => {
        $progressValue.textContent = progress + '%'
        $progressFill.style.width = progress + '%'
        // Полоска заполнена
        if (progress++ == MAX_PROGRESS) {
          clearInterval(checkInterval)
          resolve()
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
