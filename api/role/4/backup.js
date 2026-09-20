import { questions } from '../../_questions.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ success: false });
  if (!questions[4]?.backupPuzzle) return response.status(404).json({ success: false });

  const teamId = request.body?.teamId || '';
  const teamQuery = teamId ? `&team=${encodeURIComponent(teamId)}` : '';
  return response.status(200).json({
    success: true,
    roleId: 4,
    puzzle: 'backup',
    redirectUrl: `/role/4?puzzle=backup${teamQuery}`,
  });
}
