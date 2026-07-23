import type { SearchContext, SearchEntry } from '../data/searchEntries';
import { normalizeSearchValue } from '../data/searchEntries';
import type { Workspace } from '../types/app';

function getEntryScore(entry: SearchEntry, query: string, activeWorkspace: Workspace): number {
  const normalizedQuery = normalizeSearchValue(query);
  const normalizedTitle = normalizeSearchValue(entry.title);
  const normalizedAnswer = normalizeSearchValue(entry.answer);
  const normalizedNextStep = normalizeSearchValue(entry.nextStep);

  let score = 0;

  if (!normalizedQuery) {
    return score;
  }

  const queryTerms = normalizedQuery.split(' ').filter(Boolean);
  const keywordSet = entry.keywords.map((keyword) => normalizeSearchValue(keyword));

  keywordSet.forEach((keyword) => {
    if (keyword === normalizedQuery) score += 300;
    if (keyword.includes(normalizedQuery)) score += 120;
  });

  if (normalizedTitle.includes(normalizedQuery)) score += 180;
  if (normalizedAnswer.includes(normalizedQuery)) score += 110;
  if (normalizedNextStep.includes(normalizedQuery)) score += 90;

  queryTerms.forEach((term) => {
    if (normalizedTitle.includes(term)) score += 24;
    if (normalizedAnswer.includes(term)) score += 18;
    if (normalizedNextStep.includes(term)) score += 14;
    if (keywordSet.some((keyword) => keyword.includes(term))) score += 28;
  });

  return score > 0 && entry.workspace === activeWorkspace ? score + 25 : score;
}

export function getSearchResults(
  entries: SearchEntry[],
  query: string,
  activeFilter: 'all' | Workspace,
  activeContext: 'all' | SearchContext,
  workspace: Workspace
): SearchEntry[] {
  const normalizedQuery = normalizeSearchValue(query);

  return entries
    .filter((entry) => activeFilter === 'all' || entry.workspace === activeFilter)
    .filter((entry) => activeContext === 'all' || entry.context === activeContext)
    .map((entry) => ({ entry, score: getEntryScore(entry, normalizedQuery, workspace) }))
    .filter(({ score }) => {
      if (!normalizedQuery) {
        return false;
      }

      return score > 0;
    })
    .sort((left, right) => right.score - left.score)
    .map(({ entry }) => entry);
}
