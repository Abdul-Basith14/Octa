export const roles = [
  { id: 1, name: 'Math Mayhem', short: 'Break the calculation that refuses to behave.', mark: '01', accent: 'coral' },
  { id: 2, name: 'Pattern Breaker', short: 'Find the rule hiding between the shapes.', mark: '02', accent: 'lime' },
  { id: 3, name: 'Bollywood Detective', short: 'Follow the clues to a story you know.', mark: '03', accent: 'sun' },
  { id: 4, name: 'Sandalwood Sleuth', short: 'Read between the frames and catch the film.', mark: '04', accent: 'blue' },
  { id: 5, name: 'The Courtroom', short: 'Untangle a murder built from contradictions.', mark: '05', accent: 'violet' },
  { id: 6, name: 'The Impostor', short: 'Find the one statement that does not belong.', mark: '06', accent: 'mint' },
  { id: 7, name: 'Find Your Senior', short: 'Identify the senior and trace their Instagram clue.', mark: '07', accent: 'pink' },
  { id: 8, name: 'The Final Cipher', short: 'Make the last leap from clue to code.', mark: '08', accent: 'gold' },
];

export const getRole = (roleId) => roles.find((role) => role.id === Number(roleId));
