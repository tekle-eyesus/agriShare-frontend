import { Link } from "react-router";

function QuickAction({ icon: Icon, label, to, onClick }) {
  const content = (
    <div className="flex flex-col items-center gap-2 hover:bg-base-200 p-4 border border-base-200 rounded-lg transition-all duration-200">
      <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-sm text-center">{label}</span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="w-full">
      {content}
    </button>
  );
}

export default QuickAction;
