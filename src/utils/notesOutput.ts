import type { NoteContext } from '../types/app';

export interface NoteFieldDefinition {
  name: string;
  label: string;
}

export function buildNoteParagraph(
  context: NoteContext,
  fields: NoteFieldDefinition[],
  formData: Record<string, string>,
  dateText: string
): string {
  let paragraph = `${dateText} - Context: ${context.toUpperCase().replace('_', ' ')}. `;

  fields.forEach((field) => {
    const value = formData[field.name];
    if (value) {
      paragraph += `${field.label}: ${value}. `;
    }
  });

  return paragraph.trim();
}
