export const questionFallback = {
  1: { roleId: 1, roleName: 'Math Mayhem', title: 'THE LOCKER', description: 'A digital locker has a 4-digit code. Each clue tells you exactly how many digits are correct and whether they are in the correct position.', rules: ['Study all the clues carefully.', 'Each clue gives information about the 4-digit locker code.', 'Use all the clues together to determine the ONLY possible code.', 'Select the correct option.', 'Your answer is the OPTION NUMBER (1, 2, 3, or 4).', 'Remember your answer and communicate it to your team.'], generalRule: 'Every player solves their own challenge. Your answer is only your piece of the team\'s final solution. Do not wait for another player — solve your challenge and communicate your answer to your team.', question: '1234\n→ 2 digits are correct, but both are in the wrong positions.\n\n4671\n→ 2 digits are correct. Exactly 1 is in the correct position.\n\n9024\n→ 3 digits are correct. Exactly 1 is in the correct position.\n\n7442\n→ 3 digits are correct, but none are in the correct positions.\n\n1789\n→ 2 digits are correct, and both are in the correct positions.\n\nWhat is the locker code?', options: [{ id: 1, text: '4729' }, { id: 2, text: '4279' }, { id: 3, text: '4792' }, { id: 4, text: '7429' }] },
  2: { roleId: 2, roleName: 'Pattern Breaker', title: 'THE PATTERN BREAKER', description: 'A 3 × 3 grid follows a hidden pattern. Study the shapes, colours and dot positions carefully.', rules: ['Study the entire 3 × 3 grid carefully.', 'Look for the hidden patterns in the shapes, colours, and dot positions.', 'Determine what belongs in the missing cell.', 'Select the correct option.', 'Your answer is the OPTION NUMBER (1, 2, 3, or 4).', 'Remember your answer and communicate it to your team.'], generalRule: 'Every player solves their own challenge. Your answer is only your piece of the team\'s final solution. Do not wait for another player — solve your challenge and communicate your answer to your team.', question: 'Observe the puzzle carefully. Which option correctly completes the missing cell?', image: '/assets/pattern-breaker.png', options: [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }, { id: 4, text: '4' }] },
  3: { roleId: 3, roleName: 'Bollywood Detective', title: 'BOLLYWOOD DETECTIVE', description: 'Decode the emojis to identify the Hindi movie. The first letter of the movie title is your answer.', rules: ['Decode the emoji clues to identify the Hindi movie.', 'There are four possible answer letters.', 'The FIRST LETTER of the movie title is your answer.', 'Select the letter corresponding to your answer.', 'Remember your selected letter and communicate it to your team.', 'Do not share your answer with players solving other roles until you have solved your own challenge.'], generalRule: 'Every player solves their own challenge. Your answer is only your piece of the team\'s final solution. Do not wait for another player — solve your challenge and communicate your answer to your team.', question: 'Decode the emojis in the image. What is your answer?', image: '/assets/bollywood-detective.png', answerType: 'letter', options: [{ id: 'E', text: 'E' }, { id: 'K', text: 'K' }, { id: 'A', text: 'A' }, { id: 'F', text: 'F' }], correctAnswer: 'A' },
    4: { roleId: 4, roleName: 'Sandalwood Sleuth', title: 'SANDALWOOD SLEUTH', description: 'Decode the emoji clues to identify the movie. The first letter of the movie title is your answer.', rules: ['Decode the emojis to identify the movie.', 'Take the FIRST LETTER of the movie title.', 'Select the matching letter from the four options.', 'Your answer is the LETTER you select.', 'Remember your answer and communicate it to your team.', 'This challenge has TWO possible movie versions. The PRIMARY version is a Kannada movie. If there is NO Kannada-speaking/Kannada-familiar person in your team, the organizer will provide an ALTERNATE Bollywood movie for this role. The alternate movie follows exactly the same rules: Decode the emojis → identify the movie → take the FIRST LETTER → select the matching letter. Do not choose between the two movies; the organizer decides which version the team receives.'], generalRule: 'Every player solves their own challenge. Your answer is only your piece of the team\'s final solution. Do not wait for another player — solve your challenge and communicate your answer to your team.', question: 'Decode the emojis in the image. What is the first letter of the decoded movie?', primaryPuzzle: { type: 'kannada', image: '/assets/sandalwood-sleuth.png', correctAnswer: 'S' }, backupPuzzle: { type: 'bollywood', image: '/assets/bajrangi-bhaijaan.png', correctAnswer: 'B' }, answerType: 'letter', options: [{ id: 'E', text: 'E' }, { id: 'F', text: 'F' }, { id: 'S', text: 'S' }, { id: 'G', text: 'G' }] },
  5: { roleId: 5, roleName: 'The Courtroom', title: 'THE COURTROOM', description: 'Study the case file carefully and determine who is responsible.', rules: ['Read the entire case carefully.', 'Study all suspects and their statements.', 'Use the clues to test their alibis.', 'Look for contradictions between what a suspect says and the evidence.', 'Determine who is responsible.', 'Select the correct option.', 'Your answer is the OPTION NUMBER.'], question: 'WHO IS RESPONSIBLE?', image: '/assets/locked-prop-room.png', options: [{ id: 1, text: 'Riya' }, { id: 2, text: 'Arjun' }, { id: 3, text: 'Vivek' }, { id: 4, text: 'Meera' }] },
  6: {
  roleId: 6,
  roleName: 'The Impostor',
  title: 'THE IMPOSTOR',

  description:
    'Four people were near the backstage area when the Aurora trophy disappeared. One of them is lying. Can you identify the Impostor?',

  rules: [
    'Read the case carefully.',
    'Study all four statements.',
    'Use the security records to verify their claims.',
    'Exactly ONE person is the Impostor.',
    'Find the person whose statement is contradicted by the evidence.',
    'Select the person you believe is the Impostor.',
    'Your answer is the OPTION NUMBER.'
  ],

  question:
    'The Aurora trophy disappeared from the backstage room between 5:00 PM and 5:20 PM. Four Aurora members were nearby: Aarav, Riya, Karan, and Megha. One of them is the Impostor.',

  image: '/assets/imposter.png',

  statements: [
    'Aarav: "I was in the prop room the entire time."',
    'Riya: "I entered the prop room at 5:12 PM."',
    'Karan: "I was with Riya at 5:10 PM."',
    'Megha: "I saw Karan enter the backstage room at 5:08 PM."'
  ],

  evidence: [
    'Aarav entered the prop room at 5:00 PM.',
    'Riya entered the prop room at 5:12 PM.',
    'The backstage room was entered exactly once between 5:00 PM and 5:20 PM.',
    'The person who entered backstage was wearing a red Aurora jacket.',
    'Only Karan and Megha were wearing red Aurora jackets that evening.',
    'Megha was recorded entering the canteen at 5:05 PM and leaving at 5:18 PM.',
    "Riya's phone location shows she was in the prop room from 5:12 PM onward."
  ],

  answerType: 'number',

  options: [
    { id: 1, text: 'Aarav' },
    { id: 2, text: 'Riya' },
    { id: 3, text: 'Karan' },
    { id: 4, text: 'Megha' }
  ],

  correctOption: 3
},
  7: { roleId: 7, roleName: 'Find Your Senior', title: 'FIND YOUR SENIOR', description: 'Identify the senior from the photo, then find their official Aurora Instagram username.', rules: ['Study the senior photo carefully.', 'Identify the senior and find their official Aurora Instagram username.', 'Take the FIRST LETTER of that username.', 'Select the matching letter from the four options.', 'Your answer is the OPTION NUMBER.', 'Remember your option number and communicate it to your team.'], question: 'What is the first letter of this senior\'s Instagram username?', image: '/assets/find-your-senior.jpg', answerType: 'letter', options: [{ id: 'S', text: 'S' }, { id: 'C', text: 'C' }, { id: 'R', text: 'R' }, { id: 'A', text: 'A' }], correctAnswer: 'S' },
  8: { roleId: 8, roleName: 'The Final Journey', title: 'THE FINAL JOURNEY', description: 'Follow the journey carefully and determine the final direction from the starting point.', question: 'A man starts walking from Point A.\n\n- He walks 8 m towards North.\n- Then he turns right and walks 6 m.\n- He then turns right and walks 4 m.\n- He turns left and walks 3 m.\n- Finally, he turns left and walks 2 m.\n\nIn which direction is he from Point A?',
    options: [{ id: 1, text: 'North-East' }, { id: 2, text: 'South-East' }, { id: 3, text: 'North-West' }, { id: 4, text: 'South-West' }] },
};
