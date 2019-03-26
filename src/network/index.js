import { config as apiConfig, useInterceptors } from './api';
import { generateNet } from './net-generate';

export const netApi = generateNet(apiConfig, useInterceptors);

