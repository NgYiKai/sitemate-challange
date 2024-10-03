'use client'

import { useState, useEffect } from 'react'

interface Issue {
  id: number
  title: string
  description: string
}

interface IssueFormProps {
  onSubmit: (issue: Issue) => Promise<void>
  initialIssue?: Issue | null
}

export default function IssueForm({ onSubmit, initialIssue }: IssueFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialIssue) {
      setTitle(initialIssue.title)
      setDescription(initialIssue.description)
    }
  }, [initialIssue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(initialIssue ? { ...initialIssue, title, description } : { title, description } as Issue)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {initialIssue ? 'Update Issue' : 'Create Issue'}
      </button>
    </form>
  )
}