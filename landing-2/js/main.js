window.addEventListener('DOMContentLoaded', function () {
  const $screenHome = document.querySelector('.home')
  const $screenFinish = document.querySelector('.finish')
  const $screenCall = document.querySelector('.call')

  const $phone = document.querySelector('.phone-field__input')
  const $homeBtn = document.querySelector('.home__btn')

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
    await goToScreenFrom($screenHome, $screenFinish)
  })

  $finishBtn.addEventListener('click', async () => {
    if ($phone.value.length >= PHONE_LENGTH) {
      $callNumber.textContent = $phone.value
      await goToScreenFrom($screenFinish, $screenCall)
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

  function initTimer() {
    const hours = 7200 // 2 часа в секундах

    const time = new Date().getTime() / 1000 + hours

    new FlipDown(time, {
      headings: ['Дней', 'Часов', 'Минут', 'Секунд'],
    }).start()
  }

  function initPhoneMask() {
    const phoneMask = IMask($phone, {
      mask: '+{38\\0} 00 000 00 00', // 17 символов
    })
  }

  initPhoneMask()
  initTimer()
})
