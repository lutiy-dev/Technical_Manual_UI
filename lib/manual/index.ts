import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';
import { workflowEngineeringChapters } from './workflow-engineering';
import { workflowEngineeringNodeLiteracyChapters } from './workflow-engineering-node-literacy';
import { workflowEngineeringGraphLiteracyChapters } from './workflow-engineering-graph-literacy';
import { workflowEngineeringBaseConfigChapters } from './workflow-engineering-base-config';
import { workflowEngineeringDataControlPlaneChapters } from './workflow-engineering-data-control-plane';
import { workflowEngineeringModuleContractsChapters } from './workflow-engineering-module-contracts';

export const additionalChapters = [
  ...workflowEngineeringChapters,
  ...workflowEngineeringNodeLiteracyChapters,
  ...workflowEngineeringGraphLiteracyChapters,
  ...workflowEngineeringBaseConfigChapters,
  ...workflowEngineeringDataControlPlaneChapters,
  ...workflowEngineeringModuleContractsChapters,
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
  workflowEngineeringBaseConfigChapters,
  workflowEngineeringDataControlPlaneChapters,
  workflowEngineeringModuleContractsChapters,
};
