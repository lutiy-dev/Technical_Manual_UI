import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';
import { workflowEngineeringChapters } from './workflow-engineering';

export const additionalChapters = [
  ...workflowEngineeringChapters,
  ...foundationChapters,
  ...baseGenerationChapters,
  ...peoplePplAdditions,
  ...finalPipelineChapters,
];

export {
  baseGenerationChapters,
  finalPipelineChapters,
  foundationChapters,
  peoplePplAdditions,
  workflowEngineeringChapters,
};
