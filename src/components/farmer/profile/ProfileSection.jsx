import { motion } from "framer-motion";
import { Save, CheckCircle } from "lucide-react";
import ProfilePicture from "./ProfilePicture";
import { slideIn } from "../../../utils/motionVariants";

function ProfileSection() {
  return (
    <motion.div
      key="profile"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Profile Information</h2>

      <ProfilePicture />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">First Name *</span>
          </label>
          <input
            type="text"
            defaultValue="Dawit"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Last Name *</span>
          </label>
          <input
            type="text"
            defaultValue="Tesfaye"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Email *</span>
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              defaultValue="dawit.t@email.com"
              className="flex-1 input input-bordered"
            />
            <div className="gap-1 badge badge-success">
              <CheckCircle className="w-3 h-3" />
              Verified
            </div>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            defaultValue="+251-91-234-5678"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Date of Birth</span>
          </label>
          <input type="date" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Gender</span>
          </label>
          <select className="select-bordered select">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-4 font-semibold">
          <Building className="w-4 h-4" />
          Farm/Business Details
        </h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Farm/Business Name</span>
            </label>
            <input
              type="text"
              defaultValue="Tesfaye Family Farm"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Business Registration Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Optional"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Years of Experience
              </span>
            </label>
            <input
              type="number"
              defaultValue="15"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Total Farm Size (hectares)
              </span>
            </label>
            <input
              type="number"
              step="0.1"
              defaultValue="17.5"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-4 font-semibold">
          <MapPin className="w-4 h-4" />
          Location
        </h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Region</span>
            </label>
            <select className="select-bordered select" defaultValue="amhara">
              <option value="amhara">Amhara</option>
              <option value="oromia">Oromia</option>
              <option value="tigray">Tigray</option>
              <option value="snnpr">SNNPR</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Zone</span>
            </label>
            <input
              type="text"
              defaultValue="East Gojjam"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Woreda</span>
            </label>
            <input
              type="text"
              defaultValue="Gozamin"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Kebele</span>
            </label>
            <input
              type="text"
              defaultValue="Kebele 03"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">
            Bio/Story (max 500 characters)
          </span>
        </label>
        <textarea
          rows={4}
          maxLength={500}
          defaultValue="I've been farming teff and coffee for over 15 years in the Gozamin district. My family has been working this land for three generations."
          className="resize-none textarea textarea-bordered"
        />
      </div>

      <button className="gap-2 btn btn-primary">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </motion.div>
  );
}

export default ProfileSection;
