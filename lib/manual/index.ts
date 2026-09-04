import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';

export const additionalChapters = [
  ...foundationChapters,
  ...baseGenerationChapters,
  ...peoplePplAdditions,
  ...finalPipelineChapters,
];

export { baseGenerationChapters, finalPipelineChapters, foundationChapters, peoplePplAdditions };
