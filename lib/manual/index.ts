import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';
import { workflowEngineeringChapters } from './workflow-engineering';
import { workflowEngineeringNodeLiteracyChapters } from './workflow-engineering-node-literacy';
import { workflowEngineeringGraphLiteracyChapters } from './workflow-engineering-graph-literacy';

export const additionalChapters = [
  ...workflowEngineeringChapters,
  ...workflowEngineeringNodeLiteracyChapters,
  ...workflowEngineeringGraphLiteracyChapters,
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
  workflowEngineeringNodeLiteracyChapters,
  workflowEngineeringGraphLiteracyChapters,
};
