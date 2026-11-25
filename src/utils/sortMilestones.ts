import type { Milestone } from '../types/milestone'

export function sortMilestones(milestones: Milestone[]) {
  return [...milestones].sort((a, b) => a.year - b.year)
}
