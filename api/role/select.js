import { questions } from '../_questions.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ success: false });
  const { teamId, roleId } = request.body || {};
  const numericRoleId = Number(roleId);
  if (!teamId || !questions[numericRoleId]) return response.status(400).json({ success: false, message: 'Invalid role selection' });
  return response.status(200).json({ success: true, roleId: numericRoleId, redirectUrl: `/role/${numericRoleId}?team=${encodeURIComponent(teamId)}` });
}
