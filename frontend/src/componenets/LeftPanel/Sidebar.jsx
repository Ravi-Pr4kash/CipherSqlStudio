function Sidebar({ assignments, selectedAssignment, onSelect }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebarHeading">Assignments</h2>

      {assignments.map((assignment) => (
        <div
          key={assignment._id}
          onClick={() => onSelect(assignment)}
          className={`sidebarItem ${selectedAssignment?._id === assignment._id ? 'sidebarItem--active' : ''}`}
        >
          {assignment.title}

          <span className={`sidebarLevel sidebarLevel--${assignment.description.toLowerCase()}`}>
            {assignment.description}
          </span>

        </div>
      ))}
    </aside>
  )
}

export default Sidebar