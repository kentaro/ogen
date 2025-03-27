/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { ModernTemplate } from './modern'
import { SimpleTemplate } from './simple'
import type { OGImageParams } from '../types'

type TemplateFunction = (params: OGImageParams) => any
type TemplateName = 'modern' | 'simple'

const templateRegistry: Record<TemplateName, TemplateFunction> = {
  modern: ModernTemplate,
  simple: SimpleTemplate,
}

export function getTemplate(name: TemplateName): TemplateFunction {
  return templateRegistry[name] || templateRegistry.modern
} 