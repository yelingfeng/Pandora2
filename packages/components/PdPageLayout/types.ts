import type { Component } from 'vue'

export interface PageLayoutButton {
  key: string
  label: string
  type?: string
  size?: string
  icon?: string | Component
  event?: string
}

export type PageLayoutMode = 'default' | 'tabs'
