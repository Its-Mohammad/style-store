const colorMap = {
  سفید: '#ffffff',
  مشکی: '#111111',
  قرمز: '#dc2626',
  آبی: '#2563eb',
  زرد: '#facc15',
  سبز: '#16a34a',
  طوسی: '#8a8a8a',
  خاکستری: '#737373',
  کرم: '#d8c3a5',
  قهوه‌ای: '#7c2d12',
  زیتونی: '#556b2f',
  نارنجی: '#f97316',
  صورتی: '#ec4899',
  بنفش: '#7c3aed',
}

export function getColorValue(colorName) {
  return colorMap[colorName] || '#d4d4d4'
}