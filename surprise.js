if (page === 'lesson') {
  $('#open-syllabus').onclick = () => {
    $('#open-syllabus').style.display = 'none';
    $('#syllabus-reveal').classList.add('show');
    setTimeout(unlock, 450);
  };
}
if (page === 'quiz') {
  const no = $('#no-date');
  const area = $('#date-actions');
  const comment = $('#no-comment');
  let escapes = 0;
  const lines = [
    'Too slow 😌',
    'Wrong button, Bokya.',
    'Nice try. It moved again.',
    'The “No” button is afraid of commitment.',
    'Still trying? Impressive.',
    'Okay, the button has left the country. ✈'
  ];

  function escapeNo(event) {
    if (event) event.preventDefault();
    escapes += 1;
    comment.textContent = lines[Math.min(escapes - 1, lines.length - 1)];
    if (escapes >= 6) {
      no.classList.add('vanishing');
      return;
    }
    const maxX = Math.max(0, area.clientWidth - no.offsetWidth - 8);
    const maxY = Math.max(0, area.clientHeight - no.offsetHeight - 8);
    no.style.left = Math.round(Math.random() * maxX) + 'px';
    no.style.top = Math.round(Math.random() * maxY) + 'px';
  }

  no.addEventListener('pointerenter', escapeNo);
  no.addEventListener('pointerdown', escapeNo);
  no.addEventListener('focus', escapeNo);
  no.addEventListener('click', escapeNo);

  $('#yes-date').onclick = () => {
    $('#proposal').style.display = 'none';
    $('#accepted').classList.add('show');
    celebrate(90);
    setTimeout(unlock, 500);
  };
}

if (page === 'ticket') {
  const choices = {
    pizza: {
      label: 'PIZZA IN ITALY',
      message: 'Excellent choice. One romantic pizza and an unreasonable amount of cheese have been approved. 🍕'
    },
    pasta: {
      label: 'A PASTA DATE',
      message: 'Pasta it is. I promise not to judge the sauce-to-pasta ratio… too much. 🍝'
    },
    surprise: {
      label: 'CHEF\'S SURPRISE',
      message: 'Dangerous level of trust accepted. I will find something worthy of our first date. ✨'
    },
    icecream: {
      label: 'DINNER, THEN EXTRA ICE CREAM',
      message: 'Plot twist accepted. Dinner is now only the opening act for Baskin-Robbins. 🍨'
    }
  };

  $('#tear').onclick = () => {
    $('#tear').textContent = 'Date plan unsealed · Boku must decide ✈';
    $('#food-question').classList.add('show');
    celebrate(30);
  };

  $$('.food-options button').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = choices[button.dataset.food];
      $$('.food-options button').forEach((option) => option.classList.remove('selected'));
      button.classList.add('selected');
      $('#selected-food').textContent = choice.label;
      $('#food-answer').textContent = choice.message;
      celebrate(35);
      unlock();
    });
  });
}
