import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './board-tasks.css'
import {
  initialColumns,
  members,
  projects,
  viewTabs,
  type Column,
  type Task,
  type Priority,
} from './mock'

// ── Inline SVG icons ──────────────────────────────────────────────────────

function IconKanban({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="4" height="14" rx="1" />
      <rect x="7" y="1" width="4" height="10" rx="1" />
      <rect x="13" y="1" width="0" height="0" />
      <rect x="12" y="1" width="3" height="7" rx="1" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" strokeLinecap="round" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  )
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 1v10M1 6h10" strokeLinecap="round" />
    </svg>
  )
}

function IconComment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1 1.5h10a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H3.5L1 10.5V2a.5.5 0 0 1 0-1v.5z" />
    </svg>
  )
}

function IconAttachment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M10.5 5.5L5 11a3 3 0 0 1-4.24-4.24l5.66-5.66a2 2 0 0 1 2.83 2.83L3.59 9.59a1 1 0 0 1-1.41-1.41L7.5 2.84" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFilter({ className }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1.5 2.5h10l-4 5v3.5l-2-1V7.5l-4-5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Priority label helpers ────────────────────────────────────────────────

function priorityLabel(p: Priority): string {
  const labels: Record<Priority, string> = {
    low: '낮음',
    medium: '보통',
    high: '높음',
    urgent: '긴급',
  }
  return labels[p]
}

// ── Checklist progress bar ────────────────────────────────────────────────

function ChecklistProgress({ done, total }: { done: number; total: number }) {
  const shouldReduceMotion = useReducedMotion()
  if (total === 0) return null
  const pct = Math.round((done / total) * 100)
  const complete = done === total
  return (
    <div className="bt-checklist-row">
      <div className="bt-checklist-track">
        <motion.div
          className={`bt-checklist-fill${complete ? ' complete' : ''}`}
          style={{ width: '100%', transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={shouldReduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }
          }
        />
      </div>
      <span className="bt-checklist-text">{done}/{total}</span>
    </div>
  )
}

// ── Task card ─────────────────────────────────────────────────────────────

interface TaskCardProps {
  task: Task
  index: number
  columnIndex: number
  onClick: (task: Task) => void
}

function TaskCard({ task, index, columnIndex, onClick }: TaskCardProps) {
  const doneCount = task.checklist.filter(c => c.done).length
  const totalCount = task.checklist.length
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="bt-card"
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: -4 }}
      transition={{ duration: 0.22, delay: (columnIndex * 0.06) + (index * 0.04), ease: 'easeOut' }}
      whileHover={shouldReduceMotion ? {} : { y: -3, rotate: 0.4, boxShadow: '0 8px 24px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.07)' }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      onClick={() => onClick(task)}
      layout
    >
      {/* Label + priority */}
      <div className="bt-card-top">
        <span className={`bt-card-label ${task.label.color}`}>{task.label.text}</span>
        <span className={`bt-priority-dot ${task.priority}`} title={priorityLabel(task.priority)} />
      </div>

      {/* Title */}
      <div className="bt-card-title">{task.title}</div>

      {/* Checklist progress */}
      {totalCount > 0 && <ChecklistProgress done={doneCount} total={totalCount} />}

      {/* Footer */}
      <div className="bt-card-footer">
        <div className="bt-card-meta">
          {task.comments > 0 && (
            <span className="bt-meta-item">
              <IconComment />
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="bt-meta-item">
              <IconAttachment />
              {task.attachments}
            </span>
          )}
          <span className="bt-due-date">{task.dueDate}</span>
        </div>
        <div
          className="bt-card-assignee"
          style={{ background: task.assignee.color }}
          title={task.assignee.name}
        >
          {task.assignee.initials}
        </div>
      </div>
    </motion.div>
  )
}

// ── Add task inline form ──────────────────────────────────────────────────

interface AddTaskFormProps {
  onAdd: (title: string) => void
  onCancel: () => void
}

function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onAdd(value.trim())
    }
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div className="bt-add-task-form">
      <textarea
        ref={inputRef}
        className="bt-add-task-input"
        placeholder="작업 제목… (Enter로 저장)"
        value={value}
        rows={2}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="bt-add-task-actions">
        <button
          className="bt-add-confirm-btn"
          onClick={() => { if (value.trim()) onAdd(value.trim()) }}
        >
          추가
        </button>
        <button className="bt-add-cancel-btn" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  )
}

// ── Column component ──────────────────────────────────────────────────────

interface KanbanColumnProps {
  column: Column
  colIndex: number
  onCardClick: (task: Task) => void
  onAddTask: (colId: string, title: string) => void
}

function KanbanColumn({ column, colIndex, onCardClick, onAddTask }: KanbanColumnProps) {
  const [adding, setAdding] = useState(false)

  const handleAdd = (title: string) => {
    onAddTask(column.id, title)
    setAdding(false)
  }

  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="bt-column"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.32, delay: colIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Column header */}
      <div className="bt-column-header">
        <div className="bt-column-dot" style={{ background: column.color }} />
        <span className="bt-column-title">{column.title}</span>
        <span className="bt-column-count">{column.tasks.length}</span>
      </div>

      {/* Cards */}
      <div className="bt-column-cards">
        <AnimatePresence initial={false}>
          {column.tasks.map((task, i) => (
            <TaskCard
              key={task.id}
              task={task}
              index={i}
              columnIndex={colIndex}
              onClick={onCardClick}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add task */}
      <div className="bt-add-task-row">
        <AnimatePresence mode="wait" initial={false}>
          {adding ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.94, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            >
              <AddTaskForm onAdd={handleAdd} onCancel={() => setAdding(false)} />
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              className="bt-add-task-btn"
              onClick={() => setAdding(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              whileHover={{ scale: 1.01 }}
            >
              <IconPlus />
              + 작업 추가
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Task detail popover ───────────────────────────────────────────────────

interface TaskPopoverProps {
  task: Task
  onClose: () => void
}

function TaskPopover({ task, onClose }: TaskPopoverProps) {
  const doneCount = task.checklist.filter(c => c.done).length

  return (
    <motion.div
      className="bt-popover-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="bt-popover"
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bt-popover-header">
          <div className="bt-popover-title-group">
            <div className="bt-popover-title">{task.title}</div>
            <div className="bt-popover-tags">
              <span className={`bt-card-label ${task.label.color}`}>{task.label.text}</span>
              <span className={`bt-priority-badge ${task.priority}`}>
                <span className={`bt-priority-dot ${task.priority}`} />
                {priorityLabel(task.priority)}
              </span>
            </div>
          </div>
          <button className="bt-popover-close" onClick={onClose} aria-label="닫기">
            <IconX />
          </button>
        </div>

        {/* Body */}
        <div className="bt-popover-body">
          {/* Meta grid */}
          <div>
            <div className="bt-popover-section-title">상세 정보</div>
            <div className="bt-popover-meta-grid">
              <div className="bt-popover-meta-item">
                <span className="bt-popover-meta-key">담당자</span>
                <span className="bt-popover-meta-val">
                  <span
                    className="bt-popover-assignee-chip"
                    style={{ background: task.assignee.color }}
                  >
                    {task.assignee.initials}
                  </span>
                  {task.assignee.name}
                </span>
              </div>
              <div className="bt-popover-meta-item">
                <span className="bt-popover-meta-key">마감일</span>
                <span className="bt-popover-meta-val">{task.dueDate}</span>
              </div>
              <div className="bt-popover-meta-item">
                <span className="bt-popover-meta-key">댓글</span>
                <span className="bt-popover-meta-val">{task.comments}</span>
              </div>
              <div className="bt-popover-meta-item">
                <span className="bt-popover-meta-key">첨부 파일</span>
                <span className="bt-popover-meta-val">{task.attachments}</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          {task.checklist.length > 0 && (
            <div>
              <div className="bt-popover-section-title">
                체크리스트 — {doneCount}/{task.checklist.length}
              </div>
              <ChecklistProgress done={doneCount} total={task.checklist.length} />
              <div className="bt-checklist-list" style={{ marginTop: 10 }}>
                {task.checklist.map(item => (
                  <label
                    key={item.id}
                    className={`bt-checklist-item${item.done ? ' done-item' : ''}`}
                  >
                    <input type="checkbox" defaultChecked={item.done} readOnly />
                    {item.text}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function BoardTasks() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeProject, setActiveProject] = useState('p1')
  const [activeView, setActiveView] = useState('보드')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleCardClick = useCallback((task: Task) => {
    setSelectedTask(task)
  }, [])

  const handleClosePopover = useCallback(() => {
    setSelectedTask(null)
  }, [])

  const handleAddTask = useCallback((colId: string, title: string) => {
    const defaultLabel = { id: `new-${Date.now()}`, text: 'Feature', color: 'blue' as const }
    const priorities: Priority[] = ['low', 'medium', 'high']
    const newTask: Task = {
      id: `new-${Date.now()}`,
      title,
      label: defaultLabel,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: members[Math.floor(Math.random() * members.length)],
      dueDate: 'Jul 30',
      checklist: [],
      comments: 0,
      attachments: 0,
    }
    setColumns(prev =>
      prev.map(col =>
        col.id === colId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    )
  }, [])

  const activeProjectData = projects.find(p => p.id === activeProject) ?? projects[0]

  return (
    <div className="sample-board-tasks">
      {/* Mobile sidebar overlay */}
      <div
        className={`bt-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`bt-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="bt-sidebar-logo">
          <div className="bt-logo-mark">
            <IconKanban />
          </div>
          Taskr
        </div>

        <div className="bt-sidebar-section">
          <div className="bt-sidebar-label">프로젝트</div>
        </div>

        <div className="bt-project-list">
          {projects.map(project => (
            <button
              key={project.id}
              className={`bt-project-item${activeProject === project.id ? ' active' : ''}`}
              onClick={() => { setActiveProject(project.id); closeSidebar() }}
            >
              <span className="bt-project-emoji">{project.emoji}</span>
              <span className="bt-project-name">{project.name}</span>
              <span className="bt-project-count">{project.taskCount}</span>
            </button>
          ))}
        </div>

        <div className="bt-sidebar-footer">
          <div className="bt-user-row">
            <div className="bt-user-avatar">AJ</div>
            <div className="bt-user-info">
              <div className="bt-user-name">Alex Johnson</div>
              <div className="bt-user-role">프로덕트 매니저</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="bt-main">
        {/* Board header */}
        <header className="bt-board-header">
          <button className="bt-menu-btn" onClick={toggleSidebar} aria-label="사이드바 열기/닫기">
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>

          <span className="bt-board-title">{activeProjectData.name}</span>

          <div className="bt-view-tabs">
            {viewTabs.map(tab => (
              <button
                key={tab}
                className={`bt-view-tab${activeView === tab ? ' active' : ''}`}
                onClick={() => setActiveView(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bt-header-right">
            {/* Member avatars */}
            <div className="bt-member-avatars">
              {members.slice(0, 4).map(m => (
                <div
                  key={m.id}
                  className="bt-member-avatar"
                  style={{ background: m.color }}
                  title={m.name}
                >
                  {m.initials}
                </div>
              ))}
            </div>

            <button className="bt-filter-btn">
              <IconFilter />
              필터
            </button>

            <button className="bt-add-btn">
              <IconPlus />
              추가
            </button>
          </div>
        </header>

        {/* Board canvas */}
        <div className="bt-board-canvas">
          {columns.map((col, i) => (
            <KanbanColumn
              key={col.id}
              column={col}
              colIndex={i}
              onCardClick={handleCardClick}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </div>

      {/* Task detail popover */}
      <AnimatePresence>
        {selectedTask && (
          <TaskPopover task={selectedTask} onClose={handleClosePopover} />
        )}
      </AnimatePresence>
    </div>
  )
}
