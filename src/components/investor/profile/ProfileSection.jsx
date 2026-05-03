import { Card } from "../Shared";
import { Camera } from "lucide-react";
import Field from "./Field";

function ProfileSection() {
  return (
    <Card className="p-6" hover={false}>
      <h3 className="mb-1 font-display font-bold text-lg">
        Profile information
      </h3>
      <p className="mb-5 text-muted-foreground text-xs">
        Update your personal details and profile photo.
      </p>
      <div className="flex items-center gap-4 mb-6">
        <div className="avatar placeholder">
          <div className="rounded-full w-20 text-primary-content gradient-primary">
            <span className="font-bold text-xl">YS</span>
          </div>
        </div>
        <div>
          <button className="gap-2 btn-outline btn btn-sm">
            <Camera className="w-4 h-4" />
            Change photo
          </button>
          <p className="mt-1 text-[11px] text-muted-foreground">
            JPG or PNG, max 2MB
          </p>
        </div>
      </div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <Field label="Full name" defaultValue="Yodit Solomon" />
        <Field label="Email" type="email" defaultValue="yodit@agri.et" />
        <Field label="Phone" defaultValue="+251 911 234 567" />
        <Field label="Address" defaultValue="Bole, Addis Ababa" />
        <Field label="TIN (optional)" defaultValue="0012345678" />
      </div>
      <div className="flex justify-end mt-6">
        <button className="btn btn-primary btn-sm">Save changes</button>
      </div>
    </Card>
  );
}

export default ProfileSection;
