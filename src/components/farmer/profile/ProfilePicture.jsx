import { Upload } from "lucide-react";

function ProfilePicture() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="avatar">
          <div className="flex justify-center items-center bg-primary/10 rounded-full w-24 h-24 text-primary">
            <span className="font-bold text-primary text-3xl">DT</span>
          </div>
        </div>
        <button className="right-0 bottom-0 absolute btn btn-primary btn-circle btn-sm">
          <Upload className="w-4 h-4" />
        </button>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Dawit Tesfaye</h3>
        <p className="text-sm text-base-content/60">Upload a profile picture</p>
      </div>
    </div>
  );
}

export default ProfilePicture;
