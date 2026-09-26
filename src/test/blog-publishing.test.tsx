import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ComponentType } from 'react'
import InkwellBlog from '../samples/inkwell-blog'
import PrismBlog from '../samples/prism-blog'
import MonoDevlog from '../samples/mono-devlog'
import PressBrut from '../samples/press-brut'
import VelvetBlog from '../samples/velvet-blog'
import HaloNeon from '../samples/halo-neon'

const blogSamples: { id: string; Component: ComponentType }[] = [
  { id: 'inkwell-blog', Component: InkwellBlog },
  { id: 'prism-blog', Component: PrismBlog },
  { id: 'mono-devlog', Component: MonoDevlog },
  { id: 'press-brut', Component: PressBrut },
  { id: 'velvet-blog', Component: VelvetBlog },
  { id: 'halo-neon', Component: HaloNeon },
]

function closestClickable(element: HTMLElement) {
  return element.closest('button, [role="button"], article') as HTMLElement | null
}

describe('blog publishing flow', () => {
  for (const { id, Component } of blogSamples) {
    it(`${id} previews, publishes, and reads a composed post`, async () => {
      render(<Component />)

      fireEvent.click(screen.getByRole('button', { name: /새 글 쓰기|새 글 작성/ }))

      const title = `검증 ${id}`
      const body =
        `첫 단락은 ${id}의 미리보기와 발행 흐름을 확인합니다.\n\n` +
        '두 번째 단락은 읽기 화면에서 보여야 합니다.'

      fireEvent.change(await screen.findByLabelText(/제목/), { target: { value: title } })
      fireEvent.change(await screen.findByLabelText(/본문|에디터/), { target: { value: body } })

      expect((await screen.findAllByText(/첫 단락은/)).length).toBeGreaterThan(1)

      fireEvent.click(screen.getByRole('button', { name: /발행|발행하기/ }))

      await waitFor(() => {
        expect(screen.getByText(title)).toBeTruthy()
      })

      const publishedTitle = await waitFor(() => {
        const clickable =
          screen
            .getAllByText(title)
            .map((node) => closestClickable(node))
            .find((node): node is HTMLElement => Boolean(node)) ?? null
        if (!clickable) throw new Error(`Published post is not clickable: ${id}`)
        return clickable
      })
      fireEvent.click(publishedTitle)

      await waitFor(() => {
        expect(screen.getByText(/두 번째 단락은 읽기 화면에서 보여야 합니다/)).toBeTruthy()
      })
    })
  }
})
