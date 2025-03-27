/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { ModernTemplate } from './modern'
import type { OGImageParams } from '../types'

type TemplateFunction = (params: OGImageParams) => any

export function getTemplate(): TemplateFunction {
  return ModernTemplate
} 