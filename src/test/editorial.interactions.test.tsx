import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Gallery from '../showcase/Gallery'
import Quill from '../samples/quill-journal'
import Daily from '../samples/daily-wire'
import Frame from '../samples/pulse-stream'

afterEach(cleanup)

describe('editorial workflows', () => {
  it('filters gallery projects and restores the complete index', () => {
    const { container } = render(<MemoryRouter><Gallery /></MemoryRouter>)
    fireEvent.change(screen.getByRole('searchbox', { name: '샘플 검색' }), { target: { value: 'Quill' } })
    expect(container.querySelectorAll('a[href^="/sample/"]')).toHaveLength(1)
    fireEvent.change(screen.getByRole('searchbox', { name: '샘플 검색' }), { target: { value: 'no-such-project' } })
    expect(screen.getByText('일치하는 프로젝트가 없습니다.')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '전체 프로젝트 보기 →' }))
    expect(container.querySelectorAll('a[href^="/sample/"]')).toHaveLength(24)
  })

  it('reads and saves a Quill article, then finds it in the reading list', () => {
    render(<Quill />)
    fireEvent.click(screen.getAllByRole('button', { name: /도시를 읽는 다른 속도/ })[0])
    expect(screen.getByText(/지도 위에서 목적지는/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '이 글 보관하기' }))
    fireEvent.click(screen.getByRole('button', { name: /보관한 글/ }))
    expect(screen.getByRole('heading', { name: '도시를 읽는 다른 속도', level: 2 })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: /새로 쓴 이야기/ })).toBeNull()
    expect(screen.queryByRole('button', { name: /파도가 돌아오는 자리/ })).toBeNull()
  })

  it('filters Daily stories and preserves a saved article across views', () => {
    render(<Daily />)
    fireEvent.change(screen.getByRole('searchbox', { name: '기사 검색' }), { target: { value: '횡단보도' } })
    fireEvent.click(screen.getAllByRole('button', { name: /횡단보도 앞의 30초/ })[0])
    expect(screen.getByText(/신호가 바뀌기를 기다리는 동안/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '기사 보관' }))
    fireEvent.click(screen.getByRole('button', { name: '보관함 1' }))
    expect(screen.getByRole('heading', { name: '횡단보도 앞의 30초', level: 2 })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /걷는 길에서 다시 만난 서울/ })).toBeNull()
    expect(screen.queryByRole('button', { name: '이달의 글 읽기 →' })).toBeNull()
  })

  it('adds and removes a film from the watchlist without pretending to play video', () => {
    render(<Frame />)
    fireEvent.click(screen.getByRole('button', { name: '+ 보관하기' }))
    fireEvent.click(screen.getByRole('button', { name: '보관함 1' }))
    expect(screen.getByRole('heading', { name: '밤의 궤도', level: 3 })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: '능선 너머', level: 3 })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: '밤의 궤도 보관 취소' }))
    expect(screen.getByText('보관한 작품이 없습니다.')).toBeTruthy()
  })
})
