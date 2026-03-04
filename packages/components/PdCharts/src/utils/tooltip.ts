export const getTooltip = (opt?: Record<string, any>, mode: 'light' | 'dark' = 'light') => {
  const dark = {
    trigger: 'axis',
    textStyle: { color: '#ffffff' },
    extraCssText:
      'background: linear-gradient(180deg, rgba(38, 64, 99, 0.9) 0%, rgba(15, 67, 84, 0.91) 100%);border: 1px solid rgba(53, 197, 255, 0.8);',
  }
  const light = {
    trigger: 'axis',
    textStyle: { color: '#1A1A1A' },
    extraCssText:
      'background: #ffffff;border: 1px solid rgba(0,0,0,0.06);box-shadow: 0 6px 16px rgba(0,0,0,0.08);',
  }
  const base = mode === 'dark' ? dark : light
  if (!opt) return base
  return { ...base, ...opt }
}
