interface Issue {
    id: number
    title: string
    description: string
}
  
interface IssueItemProps {
issue: Issue
onEdit: () => void
onDelete: () => void
}

export default function IssueItem({ issue, onEdit, onDelete }: IssueItemProps) {
return (
    <div className="border p-4 mb-4 rounded-lg">
    <h2 className="text-xl font-semibold">{issue.title}</h2>
    <p className="mt-2">{issue.description}</p>
    <div className="mt-4 space-x-2">
        <button
        onClick={onEdit}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
        Edit
        </button>
        <button
        onClick={onDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
        Delete
        </button>
    </div>
    </div>
)
}