import type { SelectedCategory } from '@/shared/CategoryDropdown'
import type { Category } from '@/types'

const EMPTY_SELECTION: SelectedCategory = {
  large: null,
  medium: null,
  small: null,
}

export function findSelectedCategory(
  categories: Category[],
  categoryId: number | null
): SelectedCategory {
  if (categoryId === null) {
    return EMPTY_SELECTION
  }

  for (const largeCategory of categories) {
    if (largeCategory.id === categoryId) {
      return {
        large: largeCategory,
        medium: null,
        small: null,
      }
    }

    for (const mediumCategory of largeCategory.children ?? []) {
      if (mediumCategory.id === categoryId) {
        return {
          large: largeCategory,
          medium: mediumCategory,
          small: null,
        }
      }

      for (const smallCategory of mediumCategory.children ?? []) {
        if (smallCategory.id === categoryId) {
          return {
            large: largeCategory,
            medium: mediumCategory,
            small: smallCategory,
          }
        }
      }
    }
  }

  return EMPTY_SELECTION
}
