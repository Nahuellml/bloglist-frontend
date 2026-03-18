import { afterEach } from 'vitest'
import { cleanUp } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanUp()
})
