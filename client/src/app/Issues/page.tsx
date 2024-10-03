'use client'

import { useState, useEffect } from 'react'
import IssueForm from '@/components/IssueForm'
import IssueItem from '@/components/IssueItem'
import { getIssues, createIssue, updateIssue, deleteIssue, Issue } from '@/lib/api'

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null)

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const fetchedIssues = await getIssues()
      setIssues(fetchedIssues)
    } catch (error) {
      console.error('Failed to fetch issues:', error)
    }
  }

  const handleCreateIssue = async (issue: Omit<Issue, 'id'>) => {
    try {
      const newIssue = await createIssue(issue)
      setIssues([...issues, newIssue])
    } catch (error) {
      console.error('Failed to create issue:', error)
    }
  }

  const handleUpdateIssue = async (updatedIssue: Issue) => {
    try {
      const updated = await updateIssue(updatedIssue)
      setIssues(issues.map(issue => issue.id === updated.id ? updated : issue))
      setEditingIssue(null)
    } catch (error) {
      console.error('Failed to update issue:', error)
    }
  }

  const handleDeleteIssue = async (id: number) => {
    try {
      await deleteIssue(id)
      setIssues(issues.filter(issue => issue.id !== id))
    } catch (error) {
      console.error('Failed to delete issue:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <IssueForm onSubmit={editingIssue ? handleUpdateIssue : handleCreateIssue} initialIssue={editingIssue} />
      <div className="mt-8">
        {issues.map(issue => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onEdit={() => setEditingIssue(issue)}
            onDelete={() => handleDeleteIssue(issue.id)}
          />
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchIssues}
      >
        Refresh Issues
      </button>
    </div>
  )
}