import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ImageIcon } from "lucide-react";
import { overlayVariants, modalVariants } from "../../../utils/motionVariants";

function CreateAssetModal({ isOpen, onClose, onSave }) {
  const [assetType, setAssetType] = useState("farmland");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="top-1/2 left-1/2 z-50 fixed bg-base-100 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"
          >
            {/* Modal Header */}
            <div className="top-0 sticky flex justify-between items-center bg-base-100 p-6 border-base-200 border-b">
              <h2 className="font-bold text-2xl">Create New Asset</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="gap-6 grid md:grid-cols-2">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Asset Type *
                      </span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="assetType"
                          value="farmland"
                          checked={assetType === "farmland"}
                          onChange={(e) => setAssetType(e.target.value)}
                          className="radio radio-primary radio-sm"
                        />
                        <span>Farmland</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="assetType"
                          value="livestock"
                          checked={assetType === "livestock"}
                          onChange={(e) => setAssetType(e.target.value)}
                          className="radio radio-primary radio-sm"
                        />
                        <span>Livestock</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Asset Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Teff Farm - Gozamin"
                      maxLength={100}
                      className="w-full input input-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Description *
                      </span>
                    </label>
                    <textarea
                      placeholder="Describe your asset (minimum 100 characters)"
                      rows={4}
                      className="w-full resize-none textarea textarea-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Location Details
                      </span>
                    </label>
                    <div className="space-y-3">
                      <select className="w-full select-bordered select">
                        <option value="">Select Region</option>
                        <option value="amhara">Amhara</option>
                        <option value="oromia">Oromia</option>
                        <option value="tigray">Tigray</option>
                        <option value="snnpr">SNNPR</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Zone"
                        className="w-full input input-bordered"
                      />
                      <input
                        type="text"
                        placeholder="Woreda"
                        className="w-full input input-bordered"
                      />
                      <input
                        type="text"
                        placeholder="Kebele"
                        className="w-full input input-bordered"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  {assetType === "farmland" ? (
                    <>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Size (hectares) *
                          </span>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 5.5"
                          className="w-full input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Soil Type
                          </span>
                        </label>
                        <select className="w-full select-bordered select">
                          <option value="">Select Soil Type</option>
                          <option value="clay">Clay</option>
                          <option value="loam">Loam</option>
                          <option value="sandy">Sandy</option>
                          <option value="volcanic">Volcanic</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Water Source
                          </span>
                        </label>
                        <select className="w-full select-bordered select">
                          <option value="">Select Water Source</option>
                          <option value="river">River</option>
                          <option value="well">Well</option>
                          <option value="irrigation">Irrigation</option>
                          <option value="rain-fed">Rain-fed</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Land Certificate Number
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Optional"
                          className="w-full input input-bordered"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Animal Type *
                          </span>
                        </label>
                        <select className="w-full select-bordered select">
                          <option value="">Select Animal Type</option>
                          <option value="cattle">Cattle</option>
                          <option value="goat">Goat</option>
                          <option value="sheep">Sheep</option>
                          <option value="poultry">Poultry</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">Breed</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Holstein"
                          className="w-full input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Head Count *
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 24"
                          className="w-full input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Average Age (months)
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 18"
                          className="w-full input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="font-medium label-text">
                            Health Certificate Number
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Optional"
                          className="w-full input input-bordered"
                        />
                      </div>
                    </>
                  )}

                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Ownership Documents
                      </span>
                    </label>
                    <div className="p-6 border-2 border-base-300 border-dashed rounded-lg text-center">
                      <input
                        type="file"
                        className="hidden"
                        id="documents"
                        multiple
                        accept=".pdf,.jpg,.png"
                      />
                      <label htmlFor="documents" className="cursor-pointer">
                        <FileText className="mx-auto mb-2 w-8 h-8 text-base-content/40" />
                        <p className="text-sm text-base-content/70">
                          Click to upload documents
                        </p>
                        <p className="mt-1 text-xs text-base-content/50">
                          PDF or Image, max 10MB each, up to 5 files
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-medium label-text">
                        Asset Images
                      </span>
                    </label>
                    <div className="p-6 border-2 border-base-300 border-dashed rounded-lg text-center">
                      <input
                        type="file"
                        className="hidden"
                        id="images"
                        multiple
                        accept=".jpg,.png"
                      />
                      <label htmlFor="images" className="cursor-pointer">
                        <ImageIcon className="mx-auto mb-2 w-8 h-8 text-base-content/40" />
                        <p className="text-sm text-base-content/70">
                          Click to upload images
                        </p>
                        <p className="mt-1 text-xs text-base-content/50">
                          JPG or PNG, max 5MB each, up to 10 images
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bottom-0 sticky flex justify-end gap-3 bg-base-200 p-6 border-base-300 border-t">
              <button onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={onSave} className="btn btn-primary">
                Save Asset
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CreateAssetModal;
