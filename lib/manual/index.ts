import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';
import { workflowEngineeringChapters } from './workflow-engineering';
import { workflowEngineeringNodeLiteracyChapters } from './workflow-engineering-node-literacy';
import { workflowEngineeringGraphLiteracyChapters } from './workflow-engineering-graph-literacy';
import { workflowEngineeringBaseConfigChapters } from './workflow-engineering-base-config';
import { workflowEngineeringDataControlPlaneChapters } from './workflow-engineering-data-control-plane';
import { workflowEngineeringSwitchesRoutingChapters } from './workflow-engineering-switches-routing';
import { workflowEngineeringExecutionCacheChapters } from './workflow-engineering-execution-cache';
import { workflowEngineeringRoutingLabChapters } from './workflow-engineering-routing-lab';
import { workflowEngineeringModuleContractsChapters } from './workflow-engineering-module-contracts';
import { workflowEngineeringCoordinatesBatchChapters } from './workflow-engineering-coordinates-batch';
import { workflowEngineeringDebuggingChapters } from './workflow-engineering-debugging';
import { workflowEngineeringReproducibilityChapters } from './workflow-engineering-reproducibility';

export const additionalChapters = [
  ...workflowEngineeringChapters,
  ...workflowEngineeringNodeLiteracyChapters,
  ...workflowEngineeringGraphLiteracyChapters,
  ...workflowEngineeringBaseConfigChapters,
  ...workflowEngineeringDataControlPlaneChapters,
  ...workflowEngineeringSwitchesRoutingChapters,
  ...workflowEngineeringExecutionCacheChapters,
  ...workflowEngineeringRoutingLabChapters,
  ...workflowEngineeringModuleContractsChapters,
  ...workflowEngineeringCoordinatesBatchChapters,
  ...workflowEngineeringDebuggingChapters,
  ...workflowEngineeringReproducibilityChapters,
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
  workflowEngineeringSwitchesRoutingChapters,
  workflowEngineeringExecutionCacheChapters,
  workflowEngineeringRoutingLabChapters,
  workflowEngineeringModuleContractsChapters,
  workflowEngineeringCoordinatesBatchChapters,
  workflowEngineeringDebuggingChapters,
  workflowEngineeringReproducibilityChapters,
};
