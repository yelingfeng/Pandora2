import { PdCharts } from '@pandora/components/PdCharts'
import { PdForm } from '@pandora/components/PdForm'
import { PdPageLayout } from '@pandora/components/PdPageLayout'
import { PdTable, ColorfulTable } from '@pandora/components/PdTable'
import type { Plugin } from 'vue'

export default [PdTable, ColorfulTable, PdForm, PdPageLayout, PdCharts] as Plugin[]
