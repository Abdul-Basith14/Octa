import { questions, publicQuestion } from '../_questions.js';

export default function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ message: 'Method not allowed' });
  const roleId = Number(request.query.roleId);
  const question = questions[roleId];
  if (!question) return response.status(404).json({ message: 'Question not found' });
  return response.status(200).json(publicQuestion(question));
}
